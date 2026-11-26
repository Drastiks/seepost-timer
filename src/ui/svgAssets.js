/**
 * Personnages SVG expressifs pour Léo, notre PNJ joueur ("TOI") et les clients du comptoir,
 * avec jambes articulables en CSS pendant les déplacements.
 */

const CLIENT_PALETTES = {
  camille: { hair: '#5a3825', skin: '#f5cba7', shirt: '#e07a5f', pants: '#334155', hairStyle: 'bob' },
  theo: { hair: '#2f292b', skin: '#f0c29e', shirt: '#3b82f6', pants: '#1e293b', hairStyle: 'short' },
  ines: { hair: '#1f2937', skin: '#d89b72', shirt: '#10b981', pants: '#374151', hairStyle: 'bun' },
  sami: { hair: '#1c1917', skin: '#c9885e', shirt: '#f59e0b', pants: '#292524', hairStyle: 'curly' },
  nora: { hair: '#7c2d12', skin: '#f6d1b3', shirt: '#8b5cf6', pants: '#334155', hairStyle: 'long' },
  lucas: { hair: '#92400e', skin: '#f3c6a5', shirt: '#0ea5e9', pants: '#1e293b', hairStyle: 'spiky' },
  maya: { hair: '#27272a', skin: '#b97a56', shirt: '#ec4899', pants: '#374151', hairStyle: 'bob' },
  hugo: { hair: '#b45309', skin: '#f4c7a4', shirt: '#14b8a6', pants: '#1f2937', hairStyle: 'short' },
  lina: { hair: '#3b2417', skin: '#e8b48e', shirt: '#f97316', pants: '#334155', hairStyle: 'bun' },
  malo: { hair: '#374151', skin: '#f2c6a0', shirt: '#6366f1', pants: '#1e293b', hairStyle: 'curly' }
};

export function renderLeoSvg(mood = 'normal') {
  const mouth =
    mood === 'happy'
      ? '<path d="M32 37 Q40 45 48 37" fill="none" stroke="#3b2618" stroke-width="2.5" stroke-linecap="round"/>'
      : mood === 'oops'
        ? '<circle cx="40" cy="39" r="3" fill="#3b2618"/>'
        : '<path d="M34 38 Q40 42 46 38" fill="none" stroke="#3b2618" stroke-width="2.2" stroke-linecap="round"/>';

  return `
    <svg class="avatar-svg leo-svg" viewBox="0 0 80 106" aria-hidden="true">
      <!-- Jambes animées pendant la marche -->
      <g class="perso-jambe perso-jambe-g">
        <rect x="27" y="76" width="10" height="17" rx="4" fill="#1e3a5f"/>
        <rect x="25" y="90" width="14" height="6" rx="3" fill="#451a03"/>
      </g>
      <g class="perso-jambe perso-jambe-d">
        <rect x="43" y="76" width="10" height="17" rx="4" fill="#1e3a5f"/>
        <rect x="41" y="90" width="14" height="6" rx="3" fill="#451a03"/>
      </g>
      <!-- Corps / chemise -->
      <rect x="20" y="48" width="40" height="33" rx="11" fill="#2563eb"/>
      <!-- Tablier d'atelier brun -->
      <path d="M26 52 H54 L57 81 H23 Z" fill="#b57b4a" stroke="#6b4222" stroke-width="2"/>
      <rect x="32" y="62" width="16" height="10" rx="3" fill="#8c5830"/>
      <rect x="42" y="58" width="3" height="8" rx="1" fill="#fbbf24"/>
      <!-- Cou -->
      <rect x="35" y="42" width="10" height="9" rx="3" fill="#f3c49d"/>
      <!-- Tête -->
      <circle cx="40" cy="29" r="17" fill="#f5cba7" stroke="#d49e75" stroke-width="1.5"/>
      <!-- Casquette d'atelier orange -->
      <path d="M22 23 C23 10 57 10 58 23 Z" fill="#d97706"/>
      <rect x="20" y="20" width="44" height="5" rx="2.5" fill="#b45309"/>
      <circle cx="40" cy="16" r="3.6" fill="#fef3c7"/>
      <!-- Yeux -->
      <circle cx="33" cy="30" r="2.2" fill="#1e293b"/>
      <circle cx="47" cy="30" r="2.2" fill="#1e293b"/>
      <!-- Joues -->
      <circle cx="28" cy="34" r="2.4" fill="#f59e9e" opacity="0.5"/>
      <circle cx="52" cy="34" r="2.4" fill="#f59e9e" opacity="0.5"/>
      ${mouth}
      <!-- Étiquette prénom -->
      <rect x="24" y="96" width="32" height="9" rx="4" fill="#1e293b"/>
      <text x="40" y="102.8" text-anchor="middle" font-size="6.8" font-weight="800" fill="#fef3c7" font-family="sans-serif">LÉO</text>
    </svg>
  `;
}

export function renderPlayerSvg(mood = 'normal') {
  const mouth =
    mood === 'happy'
      ? '<path d="M32 37 Q40 45 48 37" fill="none" stroke="#3b2618" stroke-width="2.5" stroke-linecap="round"/>'
      : mood === 'oops'
        ? '<path d="M35 40 Q40 37 45 40" fill="none" stroke="#3b2618" stroke-width="2.2" stroke-linecap="round"/>'
        : '<path d="M34 38 Q40 42 46 38" fill="none" stroke="#3b2618" stroke-width="2.2" stroke-linecap="round"/>';

  return `
    <svg class="avatar-svg joueur-svg" viewBox="0 0 80 106" aria-hidden="true">
      <!-- Jambes animées pendant la marche -->
      <g class="perso-jambe perso-jambe-g">
        <rect x="27" y="76" width="10" height="17" rx="4" fill="#334155"/>
        <rect x="25" y="90" width="14" height="6" rx="3" fill="#0f172a"/>
      </g>
      <g class="perso-jambe perso-jambe-d">
        <rect x="43" y="76" width="10" height="17" rx="4" fill="#334155"/>
        <rect x="41" y="90" width="14" height="6" rx="3" fill="#0f172a"/>
      </g>
      <!-- Corps / sweat clair -->
      <rect x="20" y="48" width="40" height="33" rx="11" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1.5"/>
      <!-- Gilet d'apprenti vert émeraude -->
      <path d="M25 50 H55 L57 81 H23 Z" fill="#059669" stroke="#065f46" stroke-width="2"/>
      <!-- Bande réfléchissante jaune de centre de poste -->
      <rect x="24" y="66" width="32" height="5" fill="#fde047" opacity="0.9"/>
      <!-- Petit badge étoile -->
      <circle cx="48" cy="58" r="3.5" fill="#fef08a"/>
      <!-- Cou -->
      <rect x="35" y="42" width="10" height="9" rx="3" fill="#f2c49b"/>
      <!-- Tête -->
      <circle cx="40" cy="29" r="17" fill="#f4caa4" stroke="#d49e75" stroke-width="1.5"/>
      <!-- Cheveux + visière verte -->
      <path d="M22 25 C23 10 57 10 58 25 C50 19 30 19 22 25 Z" fill="#292524"/>
      <path d="M23 22 C24 12 56 12 57 22 Z" fill="#10b981"/>
      <rect x="21" y="19" width="42" height="4.5" rx="2" fill="#047857"/>
      <!-- Yeux -->
      <circle cx="33" cy="30" r="2.2" fill="#1e293b"/>
      <circle cx="47" cy="30" r="2.2" fill="#1e293b"/>
      <!-- Joues -->
      <circle cx="28" cy="34" r="2.4" fill="#f59e9e" opacity="0.45"/>
      <circle cx="52" cy="34" r="2.4" fill="#f59e9e" opacity="0.45"/>
      ${mouth}
      <!-- Étiquette TOI -->
      <rect x="24" y="96" width="32" height="9" rx="4" fill="#065f46"/>
      <text x="40" y="102.8" text-anchor="middle" font-size="6.8" font-weight="800" fill="#ecfdf5" font-family="sans-serif">TOI</text>
    </svg>
  `;
}

export function renderLeoPostItSvg() {
  return `
    <svg class="avatar-svg postit-svg" viewBox="0 0 80 96" aria-hidden="true">
      <rect x="13" y="18" width="54" height="56" rx="4" fill="#fef08a" stroke="#ca8a04" stroke-width="2" transform="rotate(-3 40 46)"/>
      <rect x="32" y="12" width="16" height="9" rx="2" fill="#ef4444" opacity="0.85"/>
      <text x="40" y="38" text-anchor="middle" font-size="8.5" font-weight="800" fill="#854d0e" font-family="sans-serif">LÉO EN</text>
      <text x="40" y="49" text-anchor="middle" font-size="8.5" font-weight="800" fill="#854d0e" font-family="sans-serif">CONGÉ !</text>
      <text x="40" y="63" text-anchor="middle" font-size="7" fill="#a16207" font-family="sans-serif">À toi de jouer</text>
    </svg>
  `;
}

export function renderClientSvg(avatarKey = 'camille', mood = 'waiting') {
  const p = CLIENT_PALETTES[avatarKey] || CLIENT_PALETTES.camille;

  let hairBack = '';
  let hairTop = '';
  if (p.hairStyle === 'long') {
    hairBack = `<rect x="20" y="18" width="40" height="36" rx="14" fill="${p.hair}"/>`;
    hairTop = `<path d="M21 26 C21 9 59 9 59 26 C51 19 29 19 21 26 Z" fill="${p.hair}"/>`;
  } else if (p.hairStyle === 'bob') {
    hairBack = `<rect x="20" y="16" width="40" height="28" rx="14" fill="${p.hair}"/>`;
    hairTop = `<path d="M21 25 C22 9 58 9 59 25 C50 18 30 18 21 25 Z" fill="${p.hair}"/>`;
  } else if (p.hairStyle === 'bun') {
    hairTop = `
      <circle cx="40" cy="9" r="7.5" fill="${p.hair}"/>
      <path d="M22 25 C22 10 58 10 58 25 C49 18 31 18 22 25 Z" fill="${p.hair}"/>
    `;
  } else if (p.hairStyle === 'curly') {
    hairTop = `
      <circle cx="27" cy="16" r="7" fill="${p.hair}"/>
      <circle cx="36" cy="12" r="7" fill="${p.hair}"/>
      <circle cx="45" cy="12" r="7" fill="${p.hair}"/>
      <circle cx="53" cy="16" r="7" fill="${p.hair}"/>
    `;
  } else {
    hairTop = `<path d="M22 24 C22 9 58 9 58 24 C49 16 31 16 22 24 Z" fill="${p.hair}"/>`;
  }

  const mouth =
    mood === 'happy'
      ? '<path d="M32 37 Q40 46 48 37" fill="none" stroke="#3b2618" stroke-width="2.6" stroke-linecap="round"/>'
      : mood === 'confused'
        ? '<path d="M34 40 Q40 36 46 40" fill="none" stroke="#3b2618" stroke-width="2.2" stroke-linecap="round"/>'
        : '<path d="M35 38 Q40 41 45 38" fill="none" stroke="#3b2618" stroke-width="2" stroke-linecap="round"/>';

  return `
    <svg class="avatar-svg client-svg" viewBox="0 0 80 100" aria-hidden="true">
      <!-- Jambes animées pendant la marche -->
      <g class="perso-jambe perso-jambe-g">
        <rect x="27" y="75" width="10" height="16" rx="4" fill="${p.pants}"/>
        <rect x="25" y="88" width="14" height="6" rx="3" fill="#1f2937"/>
      </g>
      <g class="perso-jambe perso-jambe-d">
        <rect x="43" y="75" width="10" height="16" rx="4" fill="${p.pants}"/>
        <rect x="41" y="88" width="14" height="6" rx="3" fill="#1f2937"/>
      </g>
      ${hairBack}
      <rect x="20" y="48" width="40" height="31" rx="12" fill="${p.shirt}"/>
      <path d="M32 48 L40 56 L48 48" fill="#ffffff" opacity="0.45"/>
      <rect x="35" y="42" width="10" height="9" rx="3" fill="${p.skin}"/>
      <circle cx="40" cy="29" r="16.5" fill="${p.skin}" stroke="rgba(0,0,0,0.08)" stroke-width="1.5"/>
      ${hairTop}
      <circle cx="33" cy="30" r="2.2" fill="#1e293b"/>
      <circle cx="47" cy="30" r="2.2" fill="#1e293b"/>
      <circle cx="28" cy="34" r="2.4" fill="#f59e9e" opacity="0.45"/>
      <circle cx="52" cy="34" r="2.4" fill="#f59e9e" opacity="0.45"/>
      ${mouth}
    </svg>
  `;
}
