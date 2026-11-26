/**
 * Colorateur syntaxique JavaScript léger (100% Vanilla JS)
 * calibré pour la syntaxe pédagogique d'Atelier & Comptoir.
 */

const KEYWORDS = new Set([
  'var',
  'if',
  'else',
  'for',
  'function',
  'return',
  'true',
  'false',
  'null'
]);

const ATELIER_APIS = new Set([
  'leo',
  'conserver',
  'supprimer',
  'generer',
  'document',
  'getElementById',
  'appendChild',
  'textContent'
]);

function escapeHtml(text) {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

export function highlightJavaScript(code) {
  if (!code) return '';

  let html = '';
  let i = 0;
  const len = code.length;

  while (i < len) {
    const ch = code[i];
    const next = code[i + 1];

    // Commentaire ligne //
    if (ch === '/' && next === '/') {
      const start = i;
      i += 2;
      while (i < len && code[i] !== '\n') i++;
      html += `<span class="tok-comment">${escapeHtml(code.slice(start, i))}</span>`;
      continue;
    }

    // Commentaire bloc /* ... */
    if (ch === '/' && next === '*') {
      const start = i;
      i += 2;
      while (i < len && !(code[i] === '*' && code[i + 1] === '/')) i++;
      if (i < len) i += 2;
      html += `<span class="tok-comment">${escapeHtml(code.slice(start, i))}</span>`;
      continue;
    }

    // Chaîne de caractères "...", '...', `...`
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
        if (code[i] === '\n' && quote !== '`') break;
        i++;
      }
      html += `<span class="tok-string">${escapeHtml(code.slice(start, i))}</span>`;
      continue;
    }

    // Nombre
    if (/[0-9]/.test(ch)) {
      const start = i;
      while (i < len && /[0-9.]/.test(code[i])) i++;
      html += `<span class="tok-number">${escapeHtml(code.slice(start, i))}</span>`;
      continue;
    }

    // Identifiant / mot-clé / API
    if (/[A-Za-z_$]/.test(ch)) {
      const start = i;
      while (i < len && /[A-Za-z0-9_$]/.test(code[i])) i++;
      const word = code.slice(start, i);

      // Regarder si suivi de '(' pour reconnaître un appel de fonction
      let j = i;
      while (j < len && code[j] === ' ') j++;
      const isCall = code[j] === '(';

      if (KEYWORDS.has(word)) {
        html += `<span class="tok-keyword">${escapeHtml(word)}</span>`;
      } else if (ATELIER_APIS.has(word)) {
        html += `<span class="tok-api">${escapeHtml(word)}</span>`;
      } else if (isCall) {
        html += `<span class="tok-func">${escapeHtml(word)}</span>`;
      } else {
        html += `<span class="tok-ident">${escapeHtml(word)}</span>`;
      }
      continue;
    }

    // Opérateurs composés (===, !==, >=, <=, ++, --, ==, !=)
    const three = code.slice(i, i + 3);
    if (three === '===' || three === '!==') {
      html += `<span class="tok-operator">${escapeHtml(three)}</span>`;
      i += 3;
      continue;
    }
    const two = code.slice(i, i + 2);
    if (two === '>=' || two === '<=' || two === '++' || two === '--' || two === '==' || two === '!=') {
      html += `<span class="tok-operator">${escapeHtml(two)}</span>`;
      i += 2;
      continue;
    }
    if ('=+-*/><!'.includes(ch)) {
      html += `<span class="tok-operator">${escapeHtml(ch)}</span>`;
      i++;
      continue;
    }

    // Ponctuation
    if ('(){}[];,.'.includes(ch)) {
      html += `<span class="tok-punct">${escapeHtml(ch)}</span>`;
      i++;
      continue;
    }

    // Espaces / sauts de ligne / autres
    html += escapeHtml(ch);
    i++;
  }

  // Conserver l'alignement si le code se termine par un saut de ligne
  if (code.endsWith('\n')) {
    html += ' ';
  }

  return html;
}
