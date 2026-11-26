/**
 * Traduit les erreurs JavaScript natives en messages clairs et bienveillants en français.
 */
export function translateError(error) {
  if (!error) {
    return 'Une erreur inattendue est survenue pendant l’exécution de ton code.';
  }

  const rawMsg = String(error.message || error);
  const name = error.name || '';

  if (rawMsg === '__LOOP_LIMIT__') {
    return 'Boucle infinie détectée ! Ta boucle for tourne sans jamais s’arrêter. Vérifie la condition (ex: i <= 10) et l’incrément (i++ ou i--).';
  }

  if (name === 'SyntaxError') {
    if (/Unexpected end of input/i.test(rawMsg)) {
      return 'Erreur de syntaxe : ton code semble incomplet. Vérifie qu’il ne manque pas une accolade fermante }, une parenthèse ) ou un guillemet ".';
    }
    if (/Invalid or unexpected token|Unterminated string/i.test(rawMsg)) {
      return 'Erreur de syntaxe : un texte est mal fermé ou contient un caractère invalide. Vérifie tes guillemets "...".';
    }
    if (/Unexpected identifier/i.test(rawMsg)) {
      return 'Erreur de syntaxe : un mot inattendu a été trouvé. Vérifie qu’il ne manque pas un signe =, un +, une parenthèse ou un point-virgule ;.';
    }
    if (/Unexpected token/i.test(rawMsg)) {
      return 'Erreur de syntaxe : vérifie les parenthèses ( ), les accolades { }, les guillemets "..." et les points-virgules ;.';
    }
    return `Erreur de syntaxe dans ton code (${rawMsg}). Vérifie les parenthèses, accolades et guillemets.`;
  }

  if (name === 'ReferenceError') {
    const match = /([A-Za-z0-9_$]+)\s+is not defined/i.exec(rawMsg);
    if (match) {
      const symbol = match[1];
      return `Le nom « ${symbol} » n’existe pas ! Vérifie l’orthographe (majuscules/minuscules), ou ajoute des guillemets "${symbol}" si c’est du texte.`;
    }
    return `Variable ou fonction inconnue (${rawMsg}). Vérifie l’orthographe exacte.`;
  }

  if (name === 'TypeError') {
    if (/appendChild/i.test(rawMsg) && /null|undefined/i.test(rawMsg)) {
      return 'Impossible d’utiliser appendChild : l’élément de destination est introuvable (null). Vérifie l’id relevé dans l’inspecteur F12 !';
    }
    if (/Failed to execute 'appendChild'|parameter 1 is not of type 'Node'|Cannot read.*appendChild/i.test(rawMsg)) {
      return 'Le colis passé dans appendChild(...) est introuvable (null). Vérifie l’id du colis dans l’inspecteur F12 !';
    }
    if (/textContent/i.test(rawMsg) && /null|undefined/i.test(rawMsg)) {
      return 'Impossible de lire textContent sur un élément introuvable (null). Vérifie l’id passé à document.getElementById(...).';
    }
    if (/is not a function/i.test(rawMsg)) {
      const m = /([A-Za-z0-9_$.]+)\s+is not a function/i.exec(rawMsg);
      const fn = m ? m[1] : 'cet élément';
      return `« ${fn} » n’est pas une fonction. Vérifie le nom de ta fonction et les parenthèses.`;
    }
    return `Erreur d’exécution (${rawMsg}). Vérifie les noms de tes variables et les id utilisés.`;
  }

  return `Erreur d’exécution : ${rawMsg}`;
}
