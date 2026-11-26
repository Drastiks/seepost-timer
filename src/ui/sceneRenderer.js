import { renderLeoSvg, renderPlayerSvg, renderLeoPostItSvg, renderClientSvg } from './svgAssets.js';

/**
 * Gère le rendu de toute la zone de jeu (Atelier + Comptoir vertical + Espace client)
 * en créant de vrais éléments DOM avec des id clairs et inspectables (F12).
 */
export class SceneRenderer {
  constructor() {
    this.elZoneJeu = document.getElementById('zone-de-jeu');
    this.elCalqueAnim = document.getElementById('calque-animation');
    this.elAtelier = document.getElementById('atelier');
    this.elTapis = document.getElementById('tapis-roulant');
    this.elBandeauAlerte = document.getElementById('tapis-bandeau-alerte');
    this.elZoneColisTapis = document.getElementById('zone-colis-tapis');
    this.elGenerateur = document.getElementById('generateur');
    this.elGenerateurCompteur = document.getElementById('generateur-compteur');
    this.elZoneColisGenerateur = document.getElementById('zone-colis-generateur');
    this.elCentreTri = document.getElementById('centre-de-tri');
    this.elZoneColisTri = document.getElementById('zone-colis-tri');
    this.elTriTrappeCompteur = document.getElementById('tri-trappe-compteur');
    this.elVoyantVert = document.getElementById('tri-voyant-vert');
    this.elVoyantRouge = document.getElementById('tri-voyant-rouge');

    this.elLeo = document.getElementById('leo');
    this.elJoueur = document.getElementById('joueur');
    this.elBulleLeo = document.getElementById('bulle-leo');
    this.elBulleLeoAuteur = document.getElementById('bulle-leo-auteur');
    this.elBulleLeoEtape = document.getElementById('bulle-leo-etape');
    this.elBulleLeoTexte = document.getElementById('bulle-leo-texte');
    this.elBtnLeoPrec = document.getElementById('btn-leo-precedent');
    this.elBtnLeoSuiv = document.getElementById('btn-leo-suivant');
    this.elBtnLeoIndice = document.getElementById('btn-leo-indice');

    this.elComptoir = document.getElementById('comptoir');
    this.elZoneClients = document.getElementById('zone-clients');
    this.elZoneLivraison = document.getElementById('zone-livraison-conteneur');

    this.currentLevel = null;
    this.leoMsgIndex = 0;
    this.hintIndex = 0;

    this.elBtnLeoPrec.addEventListener('click', () => this.stepLeoMessage(-1));
    this.elBtnLeoSuiv.addEventListener('click', () => this.stepLeoMessage(1));
    this.elBtnLeoIndice.addEventListener('click', () => this.showNextHint());
  }

  clearAnimationLayer() {
    if (this.elCalqueAnim) {
      this.elCalqueAnim.innerHTML = '';
    }
    if (this.elLeo) this.elLeo.classList.remove('acteur-en-deplacement');
    if (this.elJoueur) this.elJoueur.classList.remove('acteur-en-deplacement');
  }

  renderLevel(level) {
    this.currentLevel = level;
    this.leoMsgIndex = 0;
    this.hintIndex = 0;

    this.clearAnimationLayer();

    // Nettoyer les postes
    this.elZoneColisTapis.innerHTML = '';
    this.elZoneColisGenerateur.innerHTML = '';
    this.elZoneColisTri.innerHTML = '';
    this.elGenerateurCompteur.textContent = 'Prêt';
    this.elTriTrappeCompteur.textContent = '0';
    this.setSortingLights(false, false);
    this.elTapis.classList.remove('tapis-bug', 'tapis-actif', 'poste-actif');
    if (this.elBandeauAlerte) this.elBandeauAlerte.hidden = true;
    this.elGenerateur.classList.remove('poste-actif', 'generateur-actif');
    this.elCentreTri.classList.remove('poste-actif');
    this.elComptoir.classList.remove('comptoir-dom-actif');

    // Mettre en valeur le poste actif
    if (level.station === 'tapis') {
      this.elTapis.classList.add('poste-actif');
    } else if (level.station === 'dom') {
      this.elTapis.classList.add('poste-actif');
      this.elComptoir.classList.add('comptoir-dom-actif');
    } else if (level.station === 'generateur') {
      this.elGenerateur.classList.add('poste-actif');
    } else if (level.station === 'tri') {
      this.elTapis.classList.add('poste-actif');
      this.elCentreTri.classList.add('poste-actif');
    }

    // Rendu de Léo + notre PNJ Joueur ("TOI")
    this.renderCharacters(level, 'normal');
    this.updateLeoBubble();

    // Rendu du comptoir vertical et des clients
    this.renderClientsAndZones(level);

    if (level.mechanic === 'dom') {
      this.renderDomParcels(level);
    }
  }

  setBugAlert(active) {
    this.elTapis.classList.toggle('tapis-bug', Boolean(active));
    if (this.elBandeauAlerte) {
      this.elBandeauAlerte.hidden = !active;
    }
    if (active) {
      this.elCentreTri.classList.add('poste-actif');
    }
  }

  /**
   * Synchronise en temps réel les colis sur le tapis roulant selon les variables var du code.
   * Si une variable est supprimée du code, son colis se retire immédiatement du tapis.
   */
  syncLiveVariables(varsObj, { maskAsMystery = false } = {}) {
    const entries = Object.entries(varsObj || {});
    const activeIds = new Set();

    for (const [name, value] of entries) {
      const id = `colis-var-${name}`;
      activeIds.add(id);
      const existing = this.elZoneColisTapis.querySelector(`[data-var-name="${name}"]`);
      const displayText = maskAsMystery ? '?' : typeof value === 'string' ? `"${value}"` : String(value);

      if (existing) {
        const valSpan = existing.querySelector('.colis-valeur');
        if (valSpan && valSpan.textContent !== displayText) {
          valSpan.textContent = displayText;
          existing.classList.remove('colis-maj');
          void existing.offsetWidth;
          existing.classList.add('colis-maj');
        }
        existing.classList.toggle('colis-mystere', maskAsMystery);
      } else {
        const parcel = this.createParcelElement({
          id,
          tag: name,
          value: maskAsMystery ? '?' : value,
          extraClass: maskAsMystery ? 'colis-mystere colis-entree-tapis' : 'colis-entree-tapis',
          rawValue: maskAsMystery
        });
        parcel.dataset.varName = name;
        this.elZoneColisTapis.appendChild(parcel);
      }
    }

    // Supprimer du tapis tout colis dont la variable a été effacée du code
    const currentParcels = [...this.elZoneColisTapis.querySelectorAll('.colis[data-var-name]')];
    for (const p of currentParcels) {
      if (!activeIds.has(p.id)) {
        p.remove();
      }
    }
  }

  renderCharacters(level, mood = 'normal') {
    if (level.leo.present) {
      this.elLeo.innerHTML = renderLeoSvg(mood);
      this.elLeo.classList.remove('leo-absent');
      this.elBulleLeo.classList.remove('bulle-postit');
      this.elBulleLeoAuteur.textContent = 'Léo';
    } else {
      this.elLeo.innerHTML = renderLeoPostItSvg();
      this.elLeo.classList.add('leo-absent');
      this.elBulleLeo.classList.add('bulle-postit');
      this.elBulleLeoAuteur.textContent = 'Note de Léo';
    }

    // Notre PNJ joueur est toujours présent dans l'atelier (et prend le relais dès le Chapitre 5 DOM)
    this.elJoueur.innerHTML = renderPlayerSvg(mood);
    this.elJoueur.classList.toggle('joueur-actif-dom', level.mechanic === 'dom');
  }

  updateLeoBubble() {
    if (!this.currentLevel) return;
    const msgs = this.currentLevel.leo.messages;
    const total = msgs.length;
    this.elBulleLeoTexte.textContent = msgs[this.leoMsgIndex] || '';
    this.elBulleLeo.classList.remove('bulle-succes', 'bulle-erreur', 'bulle-indice');

    if (total > 1) {
      this.elBulleLeoEtape.textContent = `${this.leoMsgIndex + 1} / ${total}`;
      this.elBtnLeoPrec.hidden = this.leoMsgIndex === 0;
      this.elBtnLeoSuiv.hidden = this.leoMsgIndex >= total - 1;
    } else {
      this.elBulleLeoEtape.textContent = '';
      this.elBtnLeoPrec.hidden = true;
      this.elBtnLeoSuiv.hidden = true;
    }
  }

  stepLeoMessage(delta) {
    if (!this.currentLevel) return;
    const max = this.currentLevel.leo.messages.length - 1;
    this.leoMsgIndex = Math.max(0, Math.min(max, this.leoMsgIndex + delta));
    this.updateLeoBubble();
  }

  showNextHint() {
    if (!this.currentLevel) return;
    const hints = this.currentLevel.leo.hints || [];
    if (hints.length === 0) return;
    const idx = Math.min(this.hintIndex, hints.length - 1);
    this.elBulleLeoTexte.textContent = `Indice ${idx + 1}/${hints.length} : ${hints[idx]}`;
    this.elBulleLeo.classList.remove('bulle-succes', 'bulle-erreur');
    this.elBulleLeo.classList.add('bulle-indice');
    this.hintIndex = (this.hintIndex + 1) % hints.length;
  }

  setLeoReaction(message, type = 'normal') {
    this.elBulleLeoTexte.textContent = message;
    this.elBulleLeo.classList.remove('bulle-succes', 'bulle-erreur', 'bulle-indice');
    if (type === 'success') {
      this.elBulleLeo.classList.add('bulle-succes');
      this.renderCharacters(this.currentLevel, 'happy');
    } else if (type === 'error') {
      this.elBulleLeo.classList.add('bulle-erreur');
      this.renderCharacters(this.currentLevel, 'oops');
    } else {
      this.renderCharacters(this.currentLevel, 'normal');
    }
  }

  renderClientsAndZones(level) {
    this.elZoneClients.innerHTML = '';
    this.elZoneLivraison.innerHTML = '';

    if (level.mechanic === 'dom') {
      const targets = level.domTargets || [];
      this.elZoneClients.classList.toggle('clients-multi', targets.length > 1);
      this.elZoneLivraison.classList.toggle('livraison-multi', targets.length > 1);

      for (const target of targets) {
        const clientCard = document.createElement('div');
        clientCard.className = 'client-carte client-entree';
        clientCard.dataset.targetId = target.id;
        clientCard.dataset.avatar = target.avatar;
        clientCard.innerHTML = `
          <div class="bulle bulle-client">${escapeHtml(target.orderText)}</div>
          <div class="client-avatar-wrap">${renderClientSvg(target.avatar, 'waiting')}</div>
          <div class="client-nom">${escapeHtml(target.clientName)}</div>
        `;
        this.elZoneClients.appendChild(clientCard);

        // Vraie zone de dépôt DOM directement sur le comptoir vertical !
        const dropWrap = document.createElement('div');
        dropWrap.className = 'depot-wrapper';

        const dropTitle = document.createElement('div');
        dropTitle.className = 'depot-titre';
        dropTitle.textContent = target.label;

        const dropZone = document.createElement('div');
        dropZone.id = target.id;
        dropZone.className = 'zone-client-depot zone-dom-inspectable';
        dropZone.setAttribute('data-client', target.clientName);

        dropWrap.appendChild(dropTitle);
        dropWrap.appendChild(dropZone);
        this.elZoneLivraison.appendChild(dropWrap);
      }
      return;
    }

    // Chapitres 1 à 4 : un client principal face au comptoir vertical
    const client = level.client;
    const dropZoneId = client.dropZoneId || 'comptoir-client';
    this.elZoneClients.classList.remove('clients-multi');
    this.elZoneLivraison.classList.remove('livraison-multi');

    const clientCard = document.createElement('div');
    clientCard.className = 'client-carte client-entree';
    clientCard.dataset.targetId = dropZoneId;
    clientCard.dataset.avatar = client.avatar;
    clientCard.innerHTML = `
      <div class="bulle bulle-client">${escapeHtml(client.orderText)}</div>
      <div class="client-avatar-wrap">${renderClientSvg(client.avatar, 'waiting')}</div>
      <div class="client-nom">${escapeHtml(client.name)}</div>
    `;
    this.elZoneClients.appendChild(clientCard);

    const dropWrap = document.createElement('div');
    dropWrap.className = 'depot-wrapper';

    const dropTitle = document.createElement('div');
    dropTitle.className = 'depot-titre';
    dropTitle.textContent = client.dropZoneLabel || 'Comptoir client';

    const dropZone = document.createElement('div');
    dropZone.id = dropZoneId;
    dropZone.className = 'zone-client-depot';

    dropWrap.appendChild(dropTitle);
    dropWrap.appendChild(dropZone);
    this.elZoneLivraison.appendChild(dropWrap);
  }

  renderDomParcels(level) {
    this.elZoneColisTapis.innerHTML = '';
    for (const p of level.domParcels) {
      const el = document.createElement('div');
      el.id = p.id;
      el.className = p.simpleText ? 'colis colis-dom colis-simple-text' : 'colis colis-dom';
      if (p.color) {
        el.style.setProperty('--colis-accent', p.color);
      }
      if (p.simpleText) {
        el.textContent = p.simpleText;
      } else {
        el.innerHTML = `
          <span class="colis-etiquette">${escapeHtml(p.label)}</span>
          <span class="colis-valeur">${escapeHtml(String(p.value))}</span>
        `;
      }
      this.elZoneColisTapis.appendChild(el);
    }
  }

  renderConditionPreviewParcels(level) {
    this.elZoneColisTapis.innerHTML = '';
    const mystery = this.createParcelElement({
      id: 'colis-mystere',
      tag: level.inputVar,
      value: '?',
      extraClass: 'colis-mystere',
      rawValue: true
    });
    this.elZoneColisTapis.appendChild(mystery);
  }

  createParcelElement({ id, tag, value, extraClass = '', rawValue = false }) {
    const el = document.createElement('div');
    if (id) el.id = id;
    el.className = `colis ${extraClass}`.trim();
    const formatted = rawValue ? String(value) : typeof value === 'string' ? `"${value}"` : String(value);
    el.innerHTML = `
      <span class="colis-etiquette">${escapeHtml(String(tag))}</span>
      <span class="colis-valeur">${escapeHtml(formatted)}</span>
    `;
    return el;
  }

  setClientsMood(mood) {
    const cards = this.elZoneClients.querySelectorAll('.client-carte');
    cards.forEach((card) => {
      const avatarKey = card.dataset.avatar || 'camille';
      const wrap = card.querySelector('.client-avatar-wrap');
      if (wrap) {
        wrap.innerHTML = renderClientSvg(avatarKey, mood);
      }
    });
  }

  setClientThankYou(targetId, thankYouText) {
    const card = this.elZoneClients.querySelector(`.client-carte[data-target-id="${targetId}"]`);
    if (!card) return;
    const bubble = card.querySelector('.bulle-client');
    if (bubble) {
      bubble.textContent = thankYouText;
      bubble.classList.add('bulle-merci');
    }
    const avatarKey = card.dataset.avatar || 'camille';
    const wrap = card.querySelector('.client-avatar-wrap');
    if (wrap) {
      wrap.innerHTML = renderClientSvg(avatarKey, 'happy');
    }
  }

  setSortingLights(greenOn, redOn) {
    this.elVoyantVert.classList.toggle('allume', greenOn);
    this.elVoyantRouge.classList.toggle('allume', redOn);
  }

  captureDomParcelRects() {
    const map = new Map();
    if (!this.currentLevel || this.currentLevel.mechanic !== 'dom') return map;
    const baseEl = this.elZoneJeu || document.getElementById('zone-de-jeu');
    if (!baseEl) return map;
    const baseRect = baseEl.getBoundingClientRect();
    for (const p of this.currentLevel.domParcels || []) {
      const el = document.getElementById(p.id);
      if (el) {
        const r = el.getBoundingClientRect();
        map.set(p.id, {
          x: r.left - baseRect.left + r.width / 2,
          y: r.top - baseRect.top + r.height / 2
        });
      }
    }
    return map;
  }

  resetDomBeforeRun() {
    if (!this.currentLevel || this.currentLevel.mechanic !== 'dom') return;
    this.clearAnimationLayer();
    this.renderClientsAndZones(this.currentLevel);
    this.renderDomParcels(this.currentLevel);
  }
}

function escapeHtml(text) {
  return String(text)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}
