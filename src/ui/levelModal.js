import { CHAPTERS } from '../data/chapters.js';
import { LEVELS } from '../data/levels.js';

/**
 * Gère la modale de sélection de niveaux, le mémento JavaScript débutant
 * et la modale de victoire d'exercice / fin du Mode Histoire.
 */
export class ModalManager {
  constructor({ onSelectLevel, onNextLevel }) {
    this.onSelectLevel = onSelectLevel;
    this.onNextLevel = onNextLevel;

    // Modale niveaux
    this.modaleNiveaux = document.getElementById('modale-niveaux');
    this.listeNiveaux = document.getElementById('liste-niveaux');
    document.getElementById('btn-fermer-niveaux').addEventListener('click', () => this.closeLevels());
    this.modaleNiveaux.addEventListener('click', (e) => {
      if (e.target === this.modaleNiveaux) this.closeLevels();
    });

    // Modale mémento
    this.modaleMemento = document.getElementById('modale-memento');
    this.contenuMemento = document.getElementById('contenu-memento');
    document.getElementById('btn-fermer-memento').addEventListener('click', () => this.closeMemento());
    this.modaleMemento.addEventListener('click', (e) => {
      if (e.target === this.modaleMemento) this.closeMemento();
    });

    // Modale victoire
    this.modaleVictoire = document.getElementById('modale-victoire');
    this.victoireTitre = document.getElementById('modale-victoire-titre');
    this.victoireMsg = document.getElementById('modale-victoire-message');
    this.btnContinuer = document.getElementById('btn-continuer-suivant');
    document.getElementById('btn-rejouer-niveau').addEventListener('click', () => this.closeVictory());
    this.btnContinuer.addEventListener('click', () => {
      this.closeVictory();
      if (this.onNextLevel) this.onNextLevel();
    });

    // Fermer les modales avec Échap
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        this.closeLevels();
        this.closeMemento();
        this.closeVictory();
      }
    });

    this.renderMementoContent();
  }

  openLevels(progress) {
    this.listeNiveaux.innerHTML = '';

    for (const chapter of CHAPTERS) {
      const chLevels = LEVELS.filter((l) => l.chapter === chapter.id);
      const doneInCh = chLevels.filter((l) => progress.completedIds.includes(l.id)).length;

      const section = document.createElement('div');
      section.className = 'chapitre-bloc';
      section.style.setProperty('--chap-color', chapter.color);

      section.innerHTML = `
        <div class="chapitre-entete">
          <div>
            <h3>${chapter.title}</h3>
            <p class="chapitre-desc">${chapter.description}</p>
          </div>
          <div class="chapitre-meta">
            <span class="chapitre-duree">${chapter.duration}</span>
            <span class="chapitre-score">${doneInCh} / ${chLevels.length}</span>
          </div>
        </div>
      `;

      const grid = document.createElement('div');
      grid.className = 'niveaux-grille';

      for (const lvl of chLevels) {
        const isDone = progress.completedIds.includes(lvl.id);
        const isCurrent = progress.currentLevelId === lvl.id;
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = `niveau-carte ${isDone ? 'niveau-termine' : ''} ${isCurrent ? 'niveau-actuel' : ''}`.trim();
        btn.innerHTML = `
          <span class="niveau-num">${isDone ? '&#10003;' : lvl.id}</span>
          <span class="niveau-nom">${lvl.title}</span>
        `;
        btn.addEventListener('click', () => {
          this.closeLevels();
          if (this.onSelectLevel) this.onSelectLevel(lvl.id);
        });
        grid.appendChild(btn);
      }

      section.appendChild(grid);
      this.listeNiveaux.appendChild(section);
    }

    this.modaleNiveaux.hidden = false;
  }

  closeLevels() {
    this.modaleNiveaux.hidden = true;
  }

  openMemento() {
    this.modaleMemento.hidden = false;
  }

  closeMemento() {
    this.modaleMemento.hidden = true;
  }

  openVictory(level, isLastLevel) {
    this.victoireTitre.textContent = isLastLevel
      ? 'Mode Histoire terminé !'
      : `Exercice ${level.id} réussi !`;
    this.victoireMsg.textContent = level.leo.success;
    this.btnContinuer.textContent = isLastLevel ? 'Voir tous les niveaux' : 'Exercice suivant →';
    this.modaleVictoire.hidden = false;
    this.btnContinuer.focus();
  }

  closeVictory() {
    this.modaleVictoire.hidden = true;
  }

  renderMementoContent() {
    this.contenuMemento.innerHTML = `
      <div class="memento-section">
        <h3>1. Variables (<code>var</code>) &amp; Livraison (<code>leo</code>) — Tapis roulant</h3>
        <pre><code>var numero = 7;          // un nombre (nom de variable libre !)
var produit = "livre";   // un texte (avec guillemets)
numero = 12;             // modifier sans réécrire var
leo(numero);             // demander à Léo de livrer le colis</code></pre>
      </div>

      <div class="memento-section">
        <h3>2. Conditions (<code>if / else if / else</code>) — Centre de tri</h3>
        <pre><code>var colis = "livre";
if (colis === "livre") {
  leo(colis);
} else {
  supprimer();
}</code></pre>
        <p class="memento-note">Comparateurs : <code>===</code> (égal), <code>!==</code> (différent), <code>&gt;</code>, <code>&lt;</code>, <code>&gt;=</code>, <code>&lt;=</code>.</p>
      </div>

      <div class="memento-section">
        <h3>3. Boucles (<code>for</code>) — Générateur</h3>
        <pre><code>for (var i = 1; i &lt;= 10; i++) {
  generer(i);
}
// Compte à rebours : for (var i = 5; i &gt;= 1; i--)
// De 2 en 2       : for (var i = 2; i &lt;= 10; i = i + 2)</code></pre>
      </div>

      <div class="memento-section">
        <h3>4. Fonctions (<code>function</code>) — Recettes de l'atelier</h3>
        <pre><code>function doubler(nombre) {
  return nombre * 2;
}
var resultat = doubler(7);</code></pre>
      </div>

      <div class="memento-section">
        <h3>5. DOM (<code>F12</code>, <code>getElementById</code>, <code>appendChild</code>)</h3>
        <pre><code>var colis = document.getElementById("id-du-colis");
var zone = document.getElementById("id-de-la-zone");
zone.appendChild(colis);</code></pre>
        <p class="memento-note">Appuie sur <strong>F12</strong> (ou clic droit → <em>Inspecter</em>) puis clique sur l’icône de sélection d’élément pour lire les vrais <code>id</code> dans la page.</p>
      </div>
    `;
  }
}
