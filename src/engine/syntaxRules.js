/**
 * Outils d'analyse syntaxique stricte pour grands débutants (var, for, if/else, function)
 * + protection contre les boucles infinies et instrumentation légère.
 */

export function stripCommentsAndStrings(code) {
  let out = '';
  let i = 0;
  const len = code.length;

  while (i < len) {
    const ch = code[i];
    const next = code[i + 1];

    // Commentaire ligne //
    if (ch === '/' && next === '/') {
      i += 2;
      while (i < len && code[i] !== '\n') i++;
      continue;
    }

    // Commentaire bloc /* ... */
    if (ch === '/' && next === '*') {
      i += 2;
      while (i < len && !(code[i] === '*' && code[i + 1] === '/')) i++;
      i += 2;
      out += ' ';
      continue;
    }

    // Chaîne entre guillemets simples, doubles ou backticks
    if (ch === '"' || ch === "'" || ch === '`') {
      const quote = ch;
      out += quote;
      i++;
      while (i < len) {
        if (code[i] === '\\') {
          i += 2;
          continue;
        }
        if (code[i] === quote) {
          out += quote;
          i++;
          break;
        }
        i++;
      }
      continue;
    }

    out += ch;
    i++;
  }

  return out;
}

export function checkStrictBeginnerSyntax(code) {
  const cleaned = stripCommentsAndStrings(code);

  if (/\blet\b/.test(cleaned)) {
    return {
      ok: false,
      message:
        'Dans cet atelier, on utilise uniquement var pour créer une variable (remplace let par var).'
    };
  }

  if (/\bconst\b/.test(cleaned)) {
    return {
      ok: false,
      message:
        'Dans cet atelier, on utilise uniquement var pour créer une variable (remplace const par var).'
    };
  }

  if (/\bwhile\s*\(/.test(cleaned)) {
    return {
      ok: false,
      message:
        'Dans cet atelier, on utilise uniquement la boucle for classique (pas while).'
    };
  }

  if (/\bdo\s*\{/.test(cleaned)) {
    return {
      ok: false,
      message:
        'Dans cet atelier, on utilise uniquement la boucle for classique (pas do ... while).'
    };
  }

  if (/\bfor\s*\([^)]*\b(of|in)\b/.test(cleaned)) {
    return {
      ok: false,
      message:
        'Utilise une boucle for classique avec un compteur : for (var i = 1; i <= ...; i++).'
    };
  }

  if (/\.(map|filter|reduce|forEach)\s*\(/.test(cleaned)) {
    return {
      ok: false,
      message:
        'Pas besoin de .map(), .filter(), .reduce() ou .forEach() ici : utilise une boucle for classique !'
    };
  }

  if (/=>/.test(cleaned)) {
    return {
      ok: false,
      message:
        'Utilise la syntaxe classique function nomFonction(...) { ... } plutôt qu’une fonction fléchée (=>).'
    };
  }

  return { ok: true, cleaned };
}

export function extractDeclaredVars(cleanedCode) {
  const names = new Set();
  const regex = /\bvar\s+([A-Za-z_$][A-Za-z0-9_$]*)/g;
  let match;
  while ((match = regex.exec(cleanedCode)) !== null) {
    names.add(match[1]);
  }
  return [...names];
}

export function extractDeclaredFunctions(cleanedCode) {
  const funcs = [];
  const regex = /\bfunction\s+([A-Za-z_$][A-Za-z0-9_$]*)\s*\(([^)]*)\)/g;
  let match;
  while ((match = regex.exec(cleanedCode)) !== null) {
    const params = match[2]
      .split(',')
      .map((p) => p.trim())
      .filter(Boolean);
    funcs.push({ name: match[1], params });
  }
  return funcs;
}

/**
 * Injecte un garde-fou dans toutes les boucles for (...) pour éviter tout gel du navigateur.
 */
export function injectLoopGuard(code, maxIterations = 250) {
  let out = '';
  let i = 0;
  const len = code.length;

  while (i < len) {
    const ch = code[i];
    const next = code[i + 1];

    // Préserver commentaires //
    if (ch === '/' && next === '/') {
      const start = i;
      i += 2;
      while (i < len && code[i] !== '\n') i++;
      out += code.slice(start, i);
      continue;
    }

    // Préserver commentaires /* */
    if (ch === '/' && next === '*') {
      const start = i;
      i += 2;
      while (i < len && !(code[i] === '*' && code[i + 1] === '/')) i++;
      i += 2;
      out += code.slice(start, i);
      continue;
    }

    // Préserver chaînes
    if (ch === '"' || ch === "'" || ch === '`') {
      const quote = ch;
      const start = i;
      i++;
      while (i < len) {
        if (code[i] === '\\') {
          i += 2;
          continue;
        }
        if (code[i] === quote) {
          i++;
          break;
        }
        i++;
      }
      out += code.slice(start, i);
      continue;
    }

    // Détecter mot-clé for
    if (
      code.slice(i, i + 3) === 'for' &&
      (i === 0 || !/[A-Za-z0-9_$]/.test(code[i - 1])) &&
      !/[A-Za-z0-9_$]/.test(code[i + 3] || '')
    ) {
      let j = i + 3;
      while (j < len && /\s/.test(code[j])) j++;
      if (code[j] === '(') {
        // Trouver parenthèse fermante équilibrée
        let depth = 0;
        let k = j;
        while (k < len) {
          const c = code[k];
          if (c === '"' || c === "'" || c === '`') {
            const q = c;
            k++;
            while (k < len) {
              if (code[k] === '\\') {
                k += 2;
                continue;
              }
              if (code[k] === q) {
                k++;
                break;
              }
              k++;
            }
            continue;
          }
          if (c === '(') depth++;
          else if (c === ')') {
            depth--;
            if (depth === 0) {
              k++;
              break;
            }
          }
          k++;
        }

        // Chercher accolade ouvrante '{' après ')'
        let m = k;
        while (m < len && /\s/.test(code[m])) m++;
        if (code[m] === '{') {
          out += code.slice(i, m + 1);
          out += ` if (++__loopSteps > ${maxIterations}) { throw new Error("__LOOP_LIMIT__"); } __traceLoop(); `;
          i = m + 1;
          continue;
        }
      }
    }

    out += ch;
    i++;
  }

  return out;
}

/**
 * Injecte __traceCall("nom") au début du corps de chaque fonction déclarée.
 */
export function instrumentFunctionCalls(code) {
  let out = '';
  let i = 0;
  const len = code.length;

  while (i < len) {
    const ch = code[i];
    const next = code[i + 1];

    if (ch === '/' && next === '/') {
      const start = i;
      i += 2;
      while (i < len && code[i] !== '\n') i++;
      out += code.slice(start, i);
      continue;
    }

    if (ch === '/' && next === '*') {
      const start = i;
      i += 2;
      while (i < len && !(code[i] === '*' && code[i + 1] === '/')) i++;
      i += 2;
      out += code.slice(start, i);
      continue;
    }

    if (ch === '"' || ch === "'" || ch === '`') {
      const quote = ch;
      const start = i;
      i++;
      while (i < len) {
        if (code[i] === '\\') {
          i += 2;
          continue;
        }
        if (code[i] === quote) {
          i++;
          break;
        }
        i++;
      }
      out += code.slice(start, i);
      continue;
    }

    if (
      code.slice(i, i + 8) === 'function' &&
      (i === 0 || !/[A-Za-z0-9_$]/.test(code[i - 1])) &&
      /\s/.test(code[i + 8] || '')
    ) {
      const rest = code.slice(i);
      const match = /^function\s+([A-Za-z_$][A-Za-z0-9_$]*)\s*\([^)]*\)\s*\{/.exec(rest);
      if (match) {
        out += match[0] + ` __traceCall(${JSON.stringify(match[1])}); `;
        i += match[0].length;
        continue;
      }
    }

    out += ch;
    i++;
  }

  return out;
}

/**
 * Instrumente les déclarations var et réassignations simples de premier niveau
 * afin de tracer l'apparition et la mise à jour des colis sur le tapis roulant.
 */
export function instrumentTopLevelVars(code) {
  const lines = code.split('\n');
  let braceDepth = 0;
  let parenDepth = 0;
  const result = [];

  for (const rawLine of lines) {
    const cleanedLine = stripCommentsAndStrings(rawLine).trim();
    const startsAtTopLevel = braceDepth === 0 && parenDepth === 0;

    // Compter l'évolution de profondeur sur cette ligne
    for (const c of cleanedLine) {
      if (c === '{') braceDepth++;
      else if (c === '}') braceDepth = Math.max(0, braceDepth - 1);
      else if (c === '(') parenDepth++;
      else if (c === ')') parenDepth = Math.max(0, parenDepth - 1);
    }

    const endsAtTopLevel = braceDepth === 0 && parenDepth === 0;
    let instrumented = rawLine;

    if (startsAtTopLevel && endsAtTopLevel && cleanedLine && !/[+\-*/=(,]$/.test(cleanedLine)) {
      const varMatch = /^var\s+([A-Za-z_$][A-Za-z0-9_$]*)\s*=/.exec(cleanedLine);
      const assignMatch = /^([A-Za-z_$][A-Za-z0-9_$]*)\s*=(?!=)/.exec(cleanedLine);

      if (varMatch) {
        const name = varMatch[1];
        instrumented = `${rawLine}; __traceVar(${JSON.stringify(name)}, ${name}, "create");`;
      } else if (assignMatch && !['if', 'else', 'for', 'function', 'return', 'var'].includes(assignMatch[1])) {
        const name = assignMatch[1];
        instrumented = `${rawLine}; __traceVar(${JSON.stringify(name)}, ${name}, "update");`;
      }
    }

    result.push(instrumented);
  }

  return result.join('\n');
}
