/**
 * Valide le résultat d'exécution d'un niveau et retourne un retour pédagogique clair en français.
 */

export function validateLevelResult(level, result) {
  if (!result.ok) {
    return { passed: false, feedback: result.error };
  }

  if (level.mechanic === 'variables') {
    return validateVariables(level, result);
  }
  if (level.mechanic === 'conditions') {
    return validateConditions(level, result);
  }
  if (level.mechanic === 'loops') {
    return validateLoops(level, result);
  }
  if (level.mechanic === 'functions') {
    return validateFunctions(level, result);
  }
  if (level.mechanic === 'dom') {
    return validateDom(level, result);
  }

  return { passed: false, feedback: 'Mécanique de niveau non reconnue.' };
}

function formatVal(v) {
  return typeof v === 'string' ? `"${v}"` : String(v);
}

function validateVariables(level, result) {
  const { expectedValues, requireReassign, requireOperator } = level;
  const entries = Object.entries(result.vars || {});

  if (entries.length === 0) {
    return {
      passed: false,
      feedback: 'Aucune variable var n’a été créée ! Crée une variable avec : var monColis = ...;'
    };
  }

  // Associer chaque valeur attendue à une variable distincte (peu importe son nom !)
  const usedNames = new Set();
  for (const expectedVal of expectedValues || []) {
    const exactMatch = entries.find(([name, val]) => !usedNames.has(name) && val === expectedVal);
    if (exactMatch) {
      usedNames.add(exactMatch[0]);
      continue;
    }

    // Détecter une erreur fréquente de type (nombre entre guillemets ou texte sans guillemets)
    const typeMismatch = entries.find(
      ([name, val]) => !usedNames.has(name) && String(val) === String(expectedVal)
    );
    if (typeMismatch) {
      const [varName, actual] = typeMismatch;
      if (typeof expectedVal === 'number' && typeof actual === 'string') {
        return {
          passed: false,
          feedback: `Ta variable « ${varName} » contient du texte (${formatVal(actual)}) au lieu du nombre ${expectedVal}. Retire les guillemets !`
        };
      }
      if (typeof expectedVal === 'string' && typeof actual === 'number') {
        return {
          passed: false,
          feedback: `Ta variable « ${varName} » contient un nombre au lieu du texte ${formatVal(expectedVal)}. Mets des guillemets !`
        };
      }
    }

    const summary = entries.map(([k, v]) => `${k} = ${formatVal(v)}`).join(', ');
    return {
      passed: false,
      feedback: `Le client attend un colis contenant ${formatVal(expectedVal)}, mais tes variables valent actuellement : ${summary}.`
    };
  }

  if (requireReassign) {
    const events = result.events || [];
    const reassignedTarget = entries.some(([name, val]) => {
      if (!(expectedValues || []).includes(val)) return false;
      const hasCreate = events.some((e) => e.name === name && e.kind === 'create');
      const hasUpdate = events.some((e) => e.name === name && e.kind === 'update');
      return hasCreate && hasUpdate;
    });

    if (!reassignedTarget) {
      return {
        passed: false,
        feedback:
          'Crée d’abord ta variable avec var (ex: var prix = 5;), puis modifie-la sur une deuxième ligne sans réécrire var (ex: prix = 12;).'
      };
    }
  }

  if (requireOperator) {
    if (!result.cleanedCode.includes(requireOperator)) {
      return {
        passed: false,
        feedback: `Utilise bien l’opérateur « ${requireOperator} » dans ton code pour faire le calcul automatiquement !`
      };
    }
  }

  // Vérifier que l'élève a bien demandé à Léo de livrer les colis attendus avec leo(...)
  const leoCalls = result.leoCalls || [];
  if (leoCalls.length === 0) {
    const firstMatchedName = [...usedNames][0] || entries[0][0];
    return {
      passed: false,
      feedback: `Ton colis est prêt sur le tapis ! Appelle maintenant leo(${firstMatchedName}); pour que je l’apporte au comptoir.`
    };
  }

  const remainingCalls = [...leoCalls];
  for (const expectedVal of expectedValues || []) {
    const idx = remainingCalls.findIndex((v) => v === expectedVal);
    if (idx === -1) {
      return {
        passed: false,
        feedback: `Tu dois aussi me confier le colis contenant ${formatVal(expectedVal)} avec leo(nomDeTaVariable); !`
      };
    }
    remainingCalls.splice(idx, 1);
  }

  // Rigueur : aucun colis en trop ne doit être livré au client !
  if (remainingCalls.length > 0) {
    const extras = remainingCalls.map(formatVal).join(', ');
    return {
      passed: false,
      feedback: `Tu as envoyé un colis en trop au client (${extras}) ! N’appelle leo(...) que pour les colis demandés.`
    };
  }

  return { passed: true, feedback: level.leo.success };
}

function validateConditions(level, result) {
  const cleaned = result.cleanedCode;

  if (!result.hasStudentVar) {
    return {
      passed: false,
      feedback: `Commence par créer ta variable avec var (par exemple : var ${level.inputVar} = ...;).`
    };
  }

  // Vérifier si leo(...) a laissé passer un colis parasite (sans if, hors des accolades du if, ou mauvaise condition)
  const keptParasites = result.decisions.filter(
    (d) => d.expectedAction === 'delete' && d.actualAction === 'keep'
  );
  if (keptParasites.length > 0) {
    const sample = keptParasites[Math.floor(Math.random() * keptParasites.length)];
    const hasIf = /\bif\s*\(/.test(cleaned);
    const feedback = hasIf
      ? `Aïe ! Le colis parasite ${formatVal(sample.value)} a été livré au client ! Vérifie que leo(${result.studentVarName}); est bien À L’INTÉRIEUR des accolades { } du if et que ta condition est correcte.`
      : `Aïe ! Sans condition if, le bug du tapis a envoyé un colis parasite (${formatVal(sample.value)}) ! Mets leo(${result.studentVarName}); à l’intérieur d’un if.`;
    return {
      passed: false,
      parasiteDelivered: sample.value,
      feedback
    };
  }

  if (level.requireSyntax) {
    for (const token of level.requireSyntax) {
      if (token === 'else if') {
        if (!/\belse\s+if\b/.test(cleaned)) {
          return {
            passed: false,
            feedback: 'Utilise bien un bloc « else if (...) » dans ta condition !'
          };
        }
      } else if (token === 'if') {
        if (!/\bif\s*\(/.test(cleaned)) {
          return {
            passed: false,
            feedback: `Utilise une condition « if (...) { leo(${result.studentVarName}); } » pour trier le colis au Centre de tri.`
          };
        }
      } else if (token === 'else') {
        if (!/\belse\b/.test(cleaned)) {
          return {
            passed: false,
            feedback: 'Ajoute un bloc « else { supprimer(); } » pour gérer le cas où la condition est fausse.'
          };
        }
      } else if (!cleaned.includes(token)) {
        return {
          passed: false,
          feedback: `Utilise l’opérateur de comparaison « ${token} » demandé dans la consigne.`
        };
      }
    }
  }

  for (const dec of result.decisions) {
    // Ex 11 : allowImplicitDelete autorise un simple if (...) { leo(colis); } sans else
    if (dec.actualAction === 'none') {
      if (level.allowImplicitDelete && dec.expectedAction === 'delete') {
        continue;
      }
      return {
        passed: false,
        feedback: `Pour le colis ${formatVal(dec.value)}, ton code n’a rien fait. Pense à appeler leo(${result.studentVarName}); dans le if (et supprimer(); dans le else) !`
      };
    }
    if (dec.actualAction === 'both') {
      return {
        passed: false,
        feedback: `Pour le colis ${formatVal(dec.value)}, ton code a appelé à la fois leo(...) et supprimer() !`
      };
    }
    if (dec.actualAction !== dec.expectedAction) {
      if (dec.actualAction === 'keep' && dec.expectedAction === 'delete') {
        return {
          passed: false,
          parasiteDelivered: dec.value,
          feedback: `Oups ! À cause de ta condition, le colis parasite ${formatVal(dec.value)} a été livré au client ! Vérifie ton if.`
        };
      }
      return {
        passed: false,
        feedback: `Erreur de tri sur le colis ${formatVal(dec.value)} : il devait être livré avec leo(${result.studentVarName}); !`
      };
    }
  }

  return { passed: true, feedback: level.leo.success };
}

function validateLoops(level, result) {
  if (level.requireForLoop && !/\bfor\s*\(/.test(result.cleanedCode)) {
    return {
      passed: false,
      feedback: 'Utilise bien une boucle « for (var i = ...; ...; ...) » pour activer le Générateur !'
    };
  }

  if (level.requireIf && !/\bif\s*\(/.test(result.cleanedCode)) {
    return {
      passed: false,
      feedback: 'Ajoute une condition « if (...) » à l’intérieur de ta boucle for !'
    };
  }

  const actualValues = result.generated.map((g) => g.value);
  const expected = level.expectedGenerated;

  if (actualValues.length === 0) {
    return {
      passed: false,
      feedback: 'Aucun colis n’a été produit ! Appelle generer(...) à l’intérieur de ta boucle for.'
    };
  }

  if (actualValues.length !== expected.length) {
    return {
      passed: false,
      feedback: `Le Générateur a produit ${actualValues.length} colis (${actualValues.map(formatVal).join(', ')}), mais le client en attend ${expected.length} (${expected.map(formatVal).join(', ')}).`
    };
  }

  for (let i = 0; i < expected.length; i++) {
    if (actualValues[i] !== expected[i]) {
      return {
        passed: false,
        feedback: `Colis n°${i + 1} incorrect : obtenu ${formatVal(actualValues[i])}, attendu ${formatVal(expected[i])}.`
      };
    }
  }

  return { passed: true, feedback: level.leo.success };
}

function validateFunctions(level, result) {
  const { expectedFunction } = level;

  if (expectedFunction) {
    const def = result.declaredFunctions.find((f) => f.name === expectedFunction.name);
    if (!def || typeof result.funcs[expectedFunction.name] !== 'function') {
      return {
        passed: false,
        feedback: `Déclare la fonction « function ${expectedFunction.name}(...) { ... } » demandée par Léo.`
      };
    }

    if (def.params.length < (expectedFunction.minParams || 0)) {
      return {
        passed: false,
        feedback: `Ta fonction « ${expectedFunction.name} » doit recevoir au moins ${expectedFunction.minParams} paramètre(s) entre ses parenthèses.`
      };
    }

    const calls = result.callCounts[expectedFunction.name] || 0;
    const minCalls = expectedFunction.minCalls || 1;
    if (calls < minCalls) {
      return {
        passed: false,
        feedback: `Tu as créé « ${expectedFunction.name} », mais tu dois l’appeler au moins ${minCalls} fois (actuellement : ${calls}).`
      };
    }
  }

  if (level.requireForLoop && !/\bfor\s*\(/.test(result.cleanedCode)) {
    return {
      passed: false,
      feedback: 'Utilise une boucle « for » à l’intérieur de ta fonction !'
    };
  }

  if (level.mode === 'generate') {
    const actualValues = result.generated.map((g) => g.value);
    const expected = level.expectedGenerated;

    if (actualValues.length !== expected.length) {
      return {
        passed: false,
        feedback: `Nombre de colis générés incorrect : obtenu ${actualValues.length} (${actualValues.map(formatVal).join(', ')}), attendu ${expected.length} (${expected.map(formatVal).join(', ')}).`
      };
    }

    for (let i = 0; i < expected.length; i++) {
      if (actualValues[i] !== expected[i]) {
        return {
          passed: false,
          feedback: `Colis n°${i + 1} incorrect : obtenu ${formatVal(actualValues[i])}, attendu ${formatVal(expected[i])}.`
        };
      }
    }
  }

  if (level.mode === 'return') {
    const entries = Object.entries(result.vars || {});
    for (const expectedVal of level.expectedValues || []) {
      const found = entries.some(([, v]) => v === expectedVal);
      if (!found) {
        return {
          passed: false,
          feedback: `Stocke le résultat renvoyé par ${expectedFunction.name}(...) dans une variable (valeur attendue : ${formatVal(expectedVal)}).`
        };
      }
    }

    // Tests supplémentaires sur la fonction pour vérifier qu'elle est bien réutilisable
    if (level.extraTests && expectedFunction) {
      const userFn = result.funcs[expectedFunction.name];
      for (const testCase of level.extraTests) {
        let out;
        try {
          out = userFn(...testCase.args);
        } catch {
          return {
            passed: false,
            feedback: `Ta fonction « ${expectedFunction.name} » provoque une erreur quand on la teste avec (${testCase.args.join(', ')}).`
          };
        }
        if (out !== testCase.expected) {
          return {
            passed: false,
            feedback: `Ta fonction doit fonctionner pour d’autres valeurs ! Avec ${expectedFunction.name}(${testCase.args.join(', ')}), elle renvoie ${formatVal(out)} au lieu de ${formatVal(testCase.expected)}.`
          };
        }
      }
    }
  }

  return { passed: true, feedback: level.leo.success };
}

function validateDom(level, result) {
  const { doc, cleanedCode } = result;

  if (result.declaredVars.length === 0) {
    return {
      passed: false,
      feedback: 'Stocke les éléments trouvés dans des variables avec var (ex: var colis = document.getElementById("...");).'
    };
  }

  if (result.getByIdCount === 0) {
    return {
      passed: false,
      feedback: 'Utilise document.getElementById("...") avec les id découverts dans l’inspecteur F12 !'
    };
  }

  if (result.appendChildCount === 0) {
    return {
      passed: false,
      feedback: 'Utilise zone.appendChild(colis); pour déplacer le colis dans la zone client !'
    };
  }

  if (level.requireForLoop && !/\bfor\s*\(/.test(cleanedCode)) {
    return {
      passed: false,
      feedback: 'Utilise une boucle « for » pour parcourir et déplacer les colis !'
    };
  }

  if (level.requireIf && !/\bif\s*\(/.test(cleanedCode)) {
    return {
      passed: false,
      feedback: 'Utilise une condition « if (...) » pour vérifier colis.textContent === "OK" !'
    };
  }

  if (level.requireFunction) {
    const def = result.declaredFunctions.find((f) => f.name === level.requireFunction.name);
    if (!def) {
      return {
        passed: false,
        feedback: `Crée la fonction « function ${level.requireFunction.name}(idColis, idZone) { ... } » demandée !`
      };
    }
    if (def.params.length < (level.requireFunction.minParams || 0)) {
      return {
        passed: false,
        feedback: `Ta fonction « ${level.requireFunction.name} » doit accepter ${level.requireFunction.minParams} paramètres (idColis, idZone).`
      };
    }
    if ((result.callCounts[level.requireFunction.name] || 0) < level.expectedPlacements.length) {
      return {
        passed: false,
        feedback: `Appelle ta fonction « ${level.requireFunction.name}(...) » pour livrer les ${level.expectedPlacements.length} colis !`
      };
    }
  }

  const expectedByParcel = new Map(level.expectedPlacements.map((p) => [p.parcelId, p.targetId]));

  // Vérifier que chaque colis attendu est bien dans la bonne zone DOM
  for (const placement of level.expectedPlacements) {
    const parcelEl = doc.getElementById(placement.parcelId);
    const targetEl = doc.getElementById(placement.targetId);

    if (!parcelEl || !targetEl) {
      return {
        passed: false,
        feedback: 'Un élément DOM attendu est introuvable. Clique sur Réinitialiser et réessaie.'
      };
    }

    if (!targetEl.contains(parcelEl)) {
      return {
        passed: false,
        feedback: `Le colis « ${placement.parcelId} » n’a pas encore été déplacé dans la bonne zone client ! Inspecte bien les id avec F12.`
      };
    }
  }

  // Vérifier qu'aucun colis parasite n'a été livré par erreur dans une zone client
  for (const parcel of level.domParcels) {
    if (!expectedByParcel.has(parcel.id)) {
      const parcelEl = doc.getElementById(parcel.id);
      for (const target of level.domTargets) {
        const targetEl = doc.getElementById(target.id);
        if (parcelEl && targetEl && targetEl.contains(parcelEl)) {
          return {
            passed: false,
            feedback: `Oups ! Le colis « ${parcel.id} » ne devait pas être livré au client !`
          };
        }
      }
    }
  }

  return { passed: true, feedback: level.leo.success };
}
