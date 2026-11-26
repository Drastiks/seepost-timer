import {
  checkStrictBeginnerSyntax,
  extractDeclaredVars,
  extractDeclaredFunctions,
  injectLoopGuard,
  instrumentFunctionCalls,
  instrumentTopLevelVars
} from './syntaxRules.js';
import { translateError } from './errorTranslator.js';

/**
 * Remplace la valeur initiale de la première déclaration `var <varName> = ...;`
 * par `var <varName> = __bugValue;` pour tester la condition sur les 5 colis du bug.
 */
function replaceFirstVarInitWithBugValue(code, varName) {
  const escaped = varName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const regex = new RegExp(`(\\bvar\\s+${escaped}\\s*=\\s*)([^;\\n]+)(;?)`);
  return code.replace(regex, `$1__bugValue$3`);
}

/**
 * Analyse silencieuse en temps réel pendant que l'élève tape dans l'éditeur.
 * Retourne { valid: false } si le code n'est pas encore exécutable (ex: `va colis = t;`).
 */
export function analyzeLiveCode(level, rawCode) {
  const code = typeof rawCode === 'string' ? rawCode : '';
  const trimmed = code.trim();

  if (!trimmed) {
    return {
      valid: true,
      empty: true,
      vars: {},
      events: [],
      leoCalls: [],
      hasIf: false,
      hasLeoCall: false
    };
  }

  const syntaxCheck = checkStrictBeginnerSyntax(code);
  if (!syntaxCheck.ok) {
    return { valid: false };
  }

  const cleanedCode = syntaxCheck.cleaned;
  const declaredVars = extractDeclaredVars(cleanedCode);

  try {
    // eslint-disable-next-line no-new-func
    new Function(code);
  } catch {
    return { valid: false };
  }

  if (level.mechanic === 'variables' || level.mechanic === 'conditions') {
    const events = [];
    const leoCalls = [];
    const guarded = injectLoopGuard(instrumentTopLevelVars(code), 120);
    const body = `
      var __loopSteps = 0;
      var __vars = {};
      ${guarded}
      ${buildVarCollectors(declaredVars)}
      return __vars;
    `;
    try {
      // eslint-disable-next-line no-new-func
      const runner = new Function('leo', 'conserver', 'supprimer', '__traceVar', '__traceLoop', body);
      const vars = runner(
        (val) => {
          leoCalls.push(val);
        },
        () => {},
        () => {},
        (name, value, kind) => {
          events.push({ name, value, kind });
        },
        () => {}
      );
      const leoArgNames = [];
      const leoArgRegex = /\bleo\s*\(\s*([A-Za-z_$][A-Za-z0-9_$]*)\s*\)/g;
      let m;
      while ((m = leoArgRegex.exec(cleanedCode)) !== null) {
        leoArgNames.push(m[1]);
      }
      return {
        valid: true,
        empty: false,
        cleanedCode,
        declaredVars,
        vars,
        events,
        leoCalls,
        leoArgNames,
        hasIf: /\bif\s*\(/.test(cleanedCode),
        hasLeoCall: /\bleo\s*\(/.test(cleanedCode)
      };
    } catch {
      return { valid: false };
    }
  }

  return { valid: true, empty: false, cleanedCode, declaredVars };
}

/**
 * Exécute le code de l'utilisateur dans un bloc try / catch totalement isolé.
 * Ne lève jamais d'exception non attrapée et retourne un résultat structuré.
 */
export function runLevelCode(level, rawCode, options = {}) {
  const code = typeof rawCode === 'string' ? rawCode : '';
  const trimmed = code.trim();

  if (!trimmed) {
    return {
      ok: false,
      error: 'La zone de code est vide ! Écris ton code JavaScript puis clique sur Exécuter.'
    };
  }

  // 1. Vérification stricte des règles pédagogiques (var, for, if/else, function)
  const syntaxCheck = checkStrictBeginnerSyntax(code);
  if (!syntaxCheck.ok) {
    return {
      ok: false,
      error: syntaxCheck.message,
      isPedagogicalRule: true
    };
  }

  const cleanedCode = syntaxCheck.cleaned;
  const declaredVars = extractDeclaredVars(cleanedCode);
  const declaredFunctions = extractDeclaredFunctions(cleanedCode);

  // Vérification syntaxique rapide avant exécution pour attraper les SyntaxError proprement
  try {
    // eslint-disable-next-line no-new-func
    new Function(code);
  } catch (err) {
    return {
      ok: false,
      error: translateError(err),
      rawError: err
    };
  }

  if (level.mechanic === 'variables') {
    return runVariablesLevel(level, code, cleanedCode, declaredVars);
  }
  if (level.mechanic === 'conditions') {
    return runConditionsLevel(level, code, cleanedCode, declaredVars);
  }
  if (level.mechanic === 'loops') {
    return runLoopsLevel(level, code, cleanedCode);
  }
  if (level.mechanic === 'functions') {
    return runFunctionsLevel(level, code, cleanedCode, declaredVars, declaredFunctions);
  }
  if (level.mechanic === 'dom') {
    return runDomLevel(level, code, cleanedCode, declaredVars, declaredFunctions, options.doc);
  }

  return { ok: false, error: 'Type d’exercice inconnu.' };
}

function buildVarCollectors(varNames) {
  return varNames
    .map(
      (name) =>
        `try { if (typeof ${name} !== "undefined") { __vars[${JSON.stringify(name)}] = ${name}; } } catch (_e) {}`
    )
    .join('\n');
}

function buildFuncCollectors(funcDefs) {
  return funcDefs
    .map(
      (fn) =>
        `try { if (typeof ${fn.name} === "function") { __funcs[${JSON.stringify(fn.name)}] = ${fn.name}; } } catch (_e) {}`
    )
    .join('\n');
}

function runVariablesLevel(level, code, cleanedCode, declaredVars) {
  const events = [];
  const leoCalls = [];
  const vars = {};
  const guarded = injectLoopGuard(instrumentTopLevelVars(code));

  const body = `
    var __loopSteps = 0;
    var __vars = {};
    ${guarded}
    ${buildVarCollectors(declaredVars)}
    return __vars;
  `;

  try {
    // eslint-disable-next-line no-new-func
    const runner = new Function('leo', '__traceVar', '__traceLoop', body);
    const collected = runner(
      (val) => {
        leoCalls.push(val);
      },
      (name, value, kind) => {
        events.push({ name, value, kind });
      },
      () => {}
    );
    Object.assign(vars, collected);
    return {
      ok: true,
      mechanic: 'variables',
      cleanedCode,
      declaredVars,
      vars,
      events,
      leoCalls
    };
  } catch (err) {
    return { ok: false, error: translateError(err), rawError: err };
  }
}

function runConditionsLevel(level, code, cleanedCode, declaredVars) {
  const studentVarName = declaredVars[0] || null;
  const hasStudentVar = Boolean(studentVarName);
  const testCode = hasStudentVar ? replaceFirstVarInitWithBugValue(code, studentVarName) : code;
  const guarded = injectLoopGuard(testCode);
  const decisions = [];

  for (const parcel of level.parcels) {
    let keepCount = 0;
    let deleteCount = 0;
    let deliveredVal = parcel.value;

    const body = `
      var __loopSteps = 0;
      ${guarded}
    `;

    try {
      // eslint-disable-next-line no-new-func
      const runner = new Function(
        '__bugValue',
        level.inputVar,
        'leo',
        'conserver',
        'supprimer',
        '__traceLoop',
        body
      );
      runner(
        parcel.value,
        parcel.value,
        (val) => {
          keepCount++;
          deliveredVal = typeof val !== 'undefined' ? val : parcel.value;
        },
        () => {
          keepCount++;
        },
        () => {
          deleteCount++;
        },
        () => {}
      );
    } catch (err) {
      return { ok: false, error: translateError(err), rawError: err };
    }

    let action = 'none';
    if (keepCount > 0 && deleteCount > 0) action = 'both';
    else if (keepCount > 0) action = 'keep';
    else if (deleteCount > 0) action = 'delete';

    decisions.push({
      value: parcel.value,
      deliveredValue: deliveredVal,
      expectedAction: parcel.expectedAction,
      actualAction: action
    });
  }

  return {
    ok: true,
    mechanic: 'conditions',
    cleanedCode,
    declaredVars,
    studentVarName: studentVarName || level.inputVar,
    hasStudentVar,
    decisions
  };
}

function runLoopsLevel(level, code, cleanedCode) {
  const generated = [];
  let loopIterations = 0;
  const guarded = injectLoopGuard(code, 250);

  const body = `
    var __loopSteps = 0;
    ${guarded}
  `;

  try {
    // eslint-disable-next-line no-new-func
    const runner = new Function('generer', '__traceLoop', body);
    runner(
      (value) => {
        generated.push({ value, step: loopIterations || generated.length + 1 });
      },
      () => {
        loopIterations++;
      }
    );

    return {
      ok: true,
      mechanic: 'loops',
      cleanedCode,
      generated,
      loopIterations
    };
  } catch (err) {
    return { ok: false, error: translateError(err), rawError: err };
  }
}

function runFunctionsLevel(level, code, cleanedCode, declaredVars, declaredFunctions) {
  const generated = [];
  const callCounts = {};
  const varEvents = [];
  const leoCalls = [];
  let loopIterations = 0;

  let transformed = instrumentFunctionCalls(code);
  if (level.mode === 'return') {
    transformed = instrumentTopLevelVars(transformed);
  }
  const guarded = injectLoopGuard(transformed, 250);

  const body = `
    var __loopSteps = 0;
    var __vars = {};
    var __funcs = {};
    ${guarded}
    ${buildVarCollectors(declaredVars)}
    ${buildFuncCollectors(declaredFunctions)}
    return { vars: __vars, funcs: __funcs };
  `;

  try {
    // eslint-disable-next-line no-new-func
    const runner = new Function('generer', 'leo', '__traceCall', '__traceVar', '__traceLoop', body);
    const res = runner(
      (value) => {
        generated.push({ value, step: generated.length + 1 });
      },
      (val) => {
        leoCalls.push(val);
      },
      (fnName) => {
        callCounts[fnName] = (callCounts[fnName] || 0) + 1;
      },
      (name, value, kind) => {
        varEvents.push({ name, value, kind });
      },
      () => {
        loopIterations++;
      }
    );

    return {
      ok: true,
      mechanic: 'functions',
      cleanedCode,
      declaredVars,
      declaredFunctions,
      vars: res.vars,
      funcs: res.funcs,
      callCounts,
      generated,
      leoCalls,
      varEvents,
      loopIterations
    };
  } catch (err) {
    return { ok: false, error: translateError(err), rawError: err };
  }
}

function runDomLevel(level, code, cleanedCode, declaredVars, declaredFunctions, customDoc) {
  const targetDoc = customDoc || (typeof document !== 'undefined' ? document : null);
  if (!targetDoc) {
    return { ok: false, error: 'Aucun document DOM disponible pour exécuter cet exercice.' };
  }

  const callCounts = {};
  let loopIterations = 0;
  let getByIdCount = 0;
  let appendChildCount = 0;

  // Proxy léger autour de document.getElementById pour tracer les accès tout en retournant de vrais nœuds DOM
  const wrappedDoc = new Proxy(targetDoc, {
    get(target, prop) {
      if (prop === 'getElementById') {
        return (id) => {
          getByIdCount++;
          const el = target.getElementById(id);
          return el;
        };
      }
      const val = target[prop];
      return typeof val === 'function' ? val.bind(target) : val;
    }
  });

  if (/\.appendChild\s*\(/.test(cleanedCode)) {
    appendChildCount++;
  }

  const transformed = injectLoopGuard(instrumentFunctionCalls(code), 250);

  const body = `
    var __loopSteps = 0;
    ${transformed}
  `;

  try {
    // eslint-disable-next-line no-new-func
    const runner = new Function('document', '__traceCall', '__traceLoop', body);
    runner(
      wrappedDoc,
      (fnName) => {
        callCounts[fnName] = (callCounts[fnName] || 0) + 1;
      },
      () => {
        loopIterations++;
      }
    );

    return {
      ok: true,
      mechanic: 'dom',
      cleanedCode,
      declaredVars,
      declaredFunctions,
      callCounts,
      loopIterations,
      getByIdCount,
      appendChildCount,
      doc: targetDoc
    };
  } catch (err) {
    return { ok: false, error: translateError(err), rawError: err };
  }
}
