import test from 'node:test';
import assert from 'node:assert/strict';

import { LEVELS } from '../src/data/levels.js';
import { CHAPTERS } from '../src/data/chapters.js';
import { runLevelCode, analyzeLiveCode } from '../src/engine/runner.js';
import { validateLevelResult } from '../src/engine/validator.js';
import { checkStrictBeginnerSyntax } from '../src/engine/syntaxRules.js';

/**
 * Mini DOM en mémoire pour tester les exercices DOM (Chapitre 5) dans Node.
 */
function createMockDomForLevel(level) {
  const byId = new Map();

  class MockNode {
    constructor(id, textContent = '') {
      this.id = id;
      this.textContent = textContent;
      this.parentNode = null;
      this.children = [];
    }
    appendChild(child) {
      if (!child || !(child instanceof MockNode)) {
        throw new TypeError("Failed to execute 'appendChild' on 'Node': parameter 1 is not of type 'Node'.");
      }
      if (child.parentNode) {
        child.parentNode.children = child.parentNode.children.filter((c) => c !== child);
      }
      child.parentNode = this;
      this.children.push(child);
      return child;
    }
    contains(node) {
      if (node === this) return true;
      return this.children.some((c) => c.contains(node));
    }
  }

  const tapis = new MockNode('zone-colis-tapis');
  byId.set(tapis.id, tapis);

  for (const p of level.domParcels || []) {
    const node = new MockNode(p.id, p.simpleText || `${p.label} ${p.value}`);
    tapis.appendChild(node);
    byId.set(node.id, node);
  }

  for (const t of level.domTargets || []) {
    const node = new MockNode(t.id, '');
    byId.set(node.id, node);
  }

  return {
    getElementById(id) {
      return byId.get(id) || null;
    }
  };
}

test('Structure du Mode Histoire : 5 chapitres et 40 exercices complets', () => {
  assert.equal(CHAPTERS.length, 5);
  assert.equal(LEVELS.length, 40);

  LEVELS.forEach((lvl, idx) => {
    assert.equal(lvl.id, idx + 1, `ID attendu ${idx + 1}`);
    assert.ok(lvl.title && lvl.title.length > 0);
    assert.ok(lvl.solution && lvl.solution.length > 0, `Corrigé manquant pour niveau ${lvl.id}`);
    assert.ok(lvl.leo && Array.isArray(lvl.leo.messages) && lvl.leo.messages.length > 0);
    assert.ok(lvl.leo && Array.isArray(lvl.leo.hints) && lvl.leo.hints.length > 0);
    assert.ok(lvl.leo && typeof lvl.leo.success === 'string' && lvl.leo.success.length > 0);

    // Chaque corrigé doit respecter la syntaxe débutant stricte (var, for, if/else, function)
    const syntax = checkStrictBeginnerSyntax(lvl.solution);
    assert.equal(syntax.ok, true, `Corrigé niveau ${lvl.id} enfreint les règles : ${syntax.message}`);
  });
});

test('Les 40 corrigés officiels réussissent tous la validation', () => {
  for (const level of LEVELS) {
    const doc = level.mechanic === 'dom' ? createMockDomForLevel(level) : undefined;
    const result = runLevelCode(level, level.solution, { doc });
    assert.equal(result.ok, true, `Niveau ${level.id} (${level.title}) a échoué à l'exécution : ${result.error}`);

    const validation = validateLevelResult(level, result);
    assert.equal(
      validation.passed,
      true,
      `Niveau ${level.id} (${level.title}) a échoué à la validation : ${validation.feedback}`
    );
  }
});

test('Aucun starterCode ne valide un niveau par accident', () => {
  for (const level of LEVELS) {
    const doc = level.mechanic === 'dom' ? createMockDomForLevel(level) : undefined;
    const result = runLevelCode(level, level.starterCode, { doc });
    if (result.ok) {
      const validation = validateLevelResult(level, result);
      assert.equal(
        validation.passed,
        false,
        `Le starterCode du niveau ${level.id} ne devrait pas valider l'exercice !`
      );
    }
  }
});

test('Chapitre 1 : les noms de variables sont totalement libres avec leo(...)', () => {
  const cases = [
    { levelId: 1, code: 'var monTruc = 1;\nleo(monTruc);' },
    { levelId: 2, code: 'var x = 7;\nleo(x);' },
    { levelId: 3, code: 'var maBoite = "livre";\nleo(maBoite);' },
    { levelId: 5, code: 'var truc1 = "the";\nvar truc2 = "tarte";\nleo(truc1);\nleo(truc2);' },
    { levelId: 6, code: 'var montant = 5;\nmontant = 12;\nleo(montant);' },
    { levelId: 7, code: 'var a = 4;\nvar b = 6;\nvar somme = a + b;\nleo(somme);' },
    { levelId: 10, code: 'var nom = "Malo";\nvar nb = 3;\nvar p = 4;\nvar res = nb * p;\nleo(nom);\nleo(res);' }
  ];

  for (const tc of cases) {
    const lvl = LEVELS.find((l) => l.id === tc.levelId);
    const res = runLevelCode(lvl, tc.code);
    assert.equal(res.ok, true, `Ex ${tc.levelId} devrait exécuter sans erreur : ${res.error}`);
    const val = validateLevelResult(lvl, res);
    assert.equal(val.passed, true, `Ex ${tc.levelId} devrait accepter un nom libre : ${val.feedback}`);
  }

  // Sans appel à leo(...), le colis est sur le tapis mais la livraison n'est pas encore validée
  const lvl1 = LEVELS[0];
  const noLeo = validateLevelResult(lvl1, runLevelCode(lvl1, 'var colis = 1;'));
  assert.equal(noLeo.passed, false);

  // Rigueur : envoyer un colis en trop au client doit être refusé
  const lvl9 = LEVELS.find((l) => l.id === 9);
  const withExtra = validateLevelResult(
    lvl9,
    runLevelCode(lvl9, 'var prenom = "Lina";\nvar colis = "Bonjour " + prenom;\nleo(prenom);\nleo(colis);')
  );
  assert.equal(withExtra.passed, false);
});

test('Analyse temps réel (live coding) et scénario progressif de l’exercice 11', () => {
  const lvl1 = LEVELS[0];
  assert.equal(analyzeLiveCode(lvl1, 'va colis = t;').valid, false);
  const liveVar = analyzeLiveCode(lvl1, 'var colis = 5;');
  assert.equal(liveVar.valid, true);
  assert.equal(liveVar.vars.colis, 5);
  assert.equal(liveVar.hasLeoCall, false);

  const lvl11 = LEVELS.find((l) => l.id === 11);
  // Étape 2 : création de variable -> détectée
  const step2 = analyzeLiveCode(lvl11, 'var colis = "livre";');
  assert.equal(step2.valid, true);
  assert.equal(step2.hasIf, false);

  // Étape 3 : ajout du if -> détecté pour déplacer le colis au Centre de tri
  const step3 = analyzeLiveCode(lvl11, 'var colis = "livre";\nif (colis === "livre") {}');
  assert.equal(step3.valid, true);
  assert.equal(step3.hasIf, true);
  assert.equal(step3.hasLeoCall, false);

  // Étape 4a : leo(colis) HORS du if (avec ou sans bloc if vide avant) -> UNE valeur parasite livrée !
  const withoutIf = validateLevelResult(lvl11, runLevelCode(lvl11, 'var colis = "livre";\nleo(colis);'));
  assert.equal(withoutIf.passed, false);
  assert.ok(withoutIf.parasiteDelivered !== undefined);

  const outsideEmptyIf = validateLevelResult(
    lvl11,
    runLevelCode(lvl11, 'var colis = "livre";\nif (colis == "livre") {\n}\nleo(colis);')
  );
  assert.equal(outsideEmptyIf.passed, false);
  assert.ok(outsideEmptyIf.parasiteDelivered !== undefined);

  // Étape 4b : leo(monPaquet) DANS le if (même avec un nom libre !) -> réussi !
  const withIf = validateLevelResult(
    lvl11,
    runLevelCode(lvl11, 'var monPaquet = "livre";\nif (monPaquet === "livre") { leo(monPaquet); }')
  );
  assert.equal(withIf.passed, true);
});

test('Règles pédagogiques strictes : refus de let, const, while, map, =>', () => {
  const lvl1 = LEVELS[0];
  assert.equal(runLevelCode(lvl1, 'let colis = 1;').ok, false);
  assert.equal(runLevelCode(lvl1, 'const colis = 1;').ok, false);
  assert.equal(runLevelCode(lvl1, 'while (false) {}').ok, false);
  assert.equal(runLevelCode(lvl1, 'var f = () => 1;').ok, false);
  assert.equal(runLevelCode(lvl1, 'var a = [1].map(function(x){ return x; });').ok, false);
});

test('Résilience : erreurs syntaxiques, ReferenceError, boucle infinie et null DOM capturés en français', () => {
  const lvl1 = LEVELS[0];
  const syn = runLevelCode(lvl1, 'var colis = ;');
  assert.equal(syn.ok, false);
  assert.match(syn.error, /syntaxe/i);

  const ref = runLevelCode(lvl1, 'var colis = inconnu;');
  assert.equal(ref.ok, false);
  assert.match(ref.error, /inconnu/);

  const lvlLoop = LEVELS[19];
  const inf = runLevelCode(lvlLoop, 'for (var i = 1; i <= 5; i--) { generer(i); }');
  assert.equal(inf.ok, false);
  assert.match(inf.error, /Boucle infinie/i);

  const lvlDom = LEVELS[33];
  const doc = createMockDomForLevel(lvlDom);
  const badDom = runLevelCode(
    lvlDom,
    'var c = document.getElementById("mauvais-id"); var z = document.getElementById("boite-client"); z.appendChild(c);',
    { doc }
  );
  assert.equal(badDom.ok, false);
  assert.match(badDom.error, /F12|introuvable/i);
});
