export const LEVELS_CH3 = [
  {
    id: 20,
    chapter: 3,
    title: 'Allumer le Générateur (1 à 5)',
    mechanic: 'loops',
    station: 'generateur',
    objective: 'Utilise une boucle for pour générer les colis de 1 à 5 avec generer(i).',
    client: {
      name: 'Malo',
      avatar: 'malo',
      orderText: 'Il me faut une série de 5 colis numérotés de 1 à 5 !',
      dropZoneId: 'comptoir-client',
      dropZoneLabel: 'Comptoir de Malo'
    },
    leo: {
      present: true,
      messages: [
        'Le tapis est réparé, et les clients commandent maintenant des séries entières ! Regarde en haut : on allume le Générateur.',
        'Une boucle for répète une action automatiquement : for (var i = 1; i <= 5; i++) { generer(i); }.',
        'var i = 1 est le départ, i <= 5 la condition pour continuer, et i++ ajoute 1 à chaque tour. Complète et exécute !'
      ],
      hints: [
        'À l’intérieur des accolades { }, appelle generer(i);',
        'for (var i = 1; i <= 5; i++) {\n  generer(i);\n}'
      ],
      success: 'Regarde le Générateur tourner ! 5 colis produits en un clin d’œil et livrés à Malo !'
    },
    starterCode: '// Complète la boucle pour générer 1, 2, 3, 4, 5\nfor (var i = 1; i <= 5; i++) {\n  \n}',
    solution: 'for (var i = 1; i <= 5; i++) {\n  generer(i);\n}',
    expectedGenerated: [1, 2, 3, 4, 5],
    requireForLoop: true
  },
  {
    id: 21,
    chapter: 3,
    title: 'La grande série (1 à 10)',
    mechanic: 'loops',
    station: 'generateur',
    objective: 'Écris une boucle for qui génère les colis numérotés de 1 à 10.',
    client: {
      name: 'Camille',
      avatar: 'camille',
      orderText: 'J’ai besoin de tous les numéros de 1 jusqu’à 10 !',
      dropZoneId: 'comptoir-client',
      dropZoneLabel: 'Comptoir de Camille'
    },
    leo: {
      present: true,
      messages: [
        'Imagine écrire 10 lignes à la main... Heureusement la boucle for fait ça en 3 lignes !',
        'Écris ta boucle for en démarrant à var i = 1 jusqu’à i <= 10, et appelle generer(i); à chaque tour.'
      ],
      hints: [
        'C’est la même structure qu’avant, mais jusqu’à 10 : i <= 10.',
        'for (var i = 1; i <= 10; i++) {\n  generer(i);\n}'
      ],
      success: '1, 2, 3... jusqu’à 10 ! Le Générateur ronronne comme un chat !'
    },
    starterCode: '// Écris une boucle for de 1 à 10 et appelle generer(i)\n',
    solution: 'for (var i = 1; i <= 10; i++) {\n  generer(i);\n}',
    expectedGenerated: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    requireForLoop: true
  },
  {
    id: 22,
    chapter: 3,
    title: 'Dupliquer le même colis',
    mechanic: 'loops',
    station: 'generateur',
    objective: 'Génère 6 fois le colis "brique" avec une boucle for.',
    client: {
      name: 'Hugo',
      avatar: 'hugo',
      orderText: 'Je construis un muret : préparez-moi 6 colis "brique" identiques !',
      dropZoneId: 'comptoir-client',
      dropZoneLabel: 'Comptoir de Hugo'
    },
    leo: {
      present: true,
      messages: [
        'On n’est pas obligé d’envoyer i dans generer() : la variable i peut simplement servir à compter le nombre de tours !',
        'Fais une boucle de 1 à 6 qui appelle generer("brique"); à chaque tour.'
      ],
      hints: [
        'La boucle tourne 6 fois : for (var i = 1; i <= 6; i++).',
        'for (var i = 1; i <= 6; i++) {\n  generer("brique");\n}'
      ],
      success: '6 briques toutes fraîches ! La boucle for est parfaite pour dupliquer un objet.'
    },
    starterCode: '// Génère 6 colis contenant le texte "brique"\n',
    solution: 'for (var i = 1; i <= 6; i++) {\n  generer("brique");\n}',
    expectedGenerated: ['brique', 'brique', 'brique', 'brique', 'brique', 'brique'],
    requireForLoop: true
  },
  {
    id: 23,
    chapter: 3,
    title: 'Démarrer à un autre numéro',
    mechanic: 'loops',
    station: 'generateur',
    objective: 'Génère les colis numérotés de 5 à 9.',
    client: {
      name: 'Inès',
      avatar: 'ines',
      orderText: 'Il me manque uniquement les tomes 5, 6, 7, 8 et 9 !',
      dropZoneId: 'comptoir-client',
      dropZoneLabel: 'Comptoir d’Inès'
    },
    leo: {
      present: true,
      messages: [
        'Une boucle for n’est pas obligée de commencer à 1 !',
        'Change la valeur de départ à var i = 5 et la fin à i <= 9 pour générer 5, 6, 7, 8, 9.'
      ],
      hints: [
        'Départ : var i = 5 — Condition : i <= 9.',
        'for (var i = 5; i <= 9; i++) {\n  generer(i);\n}'
      ],
      success: 'Exactement les 5 tomes manquants ! La collection d’Inès est complète.'
    },
    starterCode: '// Génère les numéros de 5 à 9\n',
    solution: 'for (var i = 5; i <= 9; i++) {\n  generer(i);\n}',
    expectedGenerated: [5, 6, 7, 8, 9],
    requireForLoop: true
  },
  {
    id: 24,
    chapter: 3,
    title: 'Compte à rebours (i--)',
    mechanic: 'loops',
    station: 'generateur',
    objective: 'Génère 5, 4, 3, 2, 1 avec une boucle for décroissante.',
    client: {
      name: 'Sami',
      avatar: 'sami',
      orderText: 'Pour ma fusée miniature, envoyez les colis dans l’ordre : 5, 4, 3, 2, 1 !',
      dropZoneId: 'comptoir-client',
      dropZoneLabel: 'Comptoir de Sami'
    },
    leo: {
      present: true,
      messages: [
        'Pour compter à l’envers, on part de 5 (var i = 5), on continue tant que i >= 1, et on enlève 1 à chaque tour avec i-- !',
        'À toi de lancer le compte à rebours !'
      ],
      hints: [
        'Attention au sens du comparateur : i >= 1 (et non <= !).',
        'for (var i = 5; i >= 1; i--) {\n  generer(i);\n}'
      ],
      success: '5, 4, 3, 2, 1... Décollage réussi pour Sami !'
    },
    starterCode: '// Compte à rebours de 5 jusqu\'à 1 avec i--\n',
    solution: 'for (var i = 5; i >= 1; i--) {\n  generer(i);\n}',
    expectedGenerated: [5, 4, 3, 2, 1],
    requireForLoop: true
  },
  {
    id: 25,
    chapter: 3,
    title: 'Compter de 2 en 2',
    mechanic: 'loops',
    station: 'generateur',
    objective: 'Génère les nombres pairs 2, 4, 6, 8, 10.',
    client: {
      name: 'Nora',
      avatar: 'nora',
      orderText: 'Je distribue le côté pair de la rue : donnez-moi 2, 4, 6, 8 et 10.',
      dropZoneId: 'comptoir-client',
      dropZoneLabel: 'Comptoir de Nora'
    },
    leo: {
      present: true,
      messages: [
        'À la fin des parenthèses du for, on n’est pas obligé d’écrire i++ : on peut avancer de 2 en 2 avec i = i + 2 !',
        'Pars de var i = 2, continue tant que i <= 10, et avance avec i = i + 2.'
      ],
      hints: [
        'En-tête de la boucle : for (var i = 2; i <= 10; i = i + 2)',
        'for (var i = 2; i <= 10; i = i + 2) {\n  generer(i);\n}'
      ],
      success: '2, 4, 6, 8, 10 ! Tu sais maintenant choisir le pas de tes boucles !'
    },
    starterCode: '// Génère 2, 4, 6, 8, 10 en avançant de 2 en 2\n',
    solution: 'for (var i = 2; i <= 10; i = i + 2) {\n  generer(i);\n}',
    expectedGenerated: [2, 4, 6, 8, 10],
    requireForLoop: true
  },
  {
    id: 26,
    chapter: 3,
    title: 'Étiquettes numérotées',
    mechanic: 'loops',
    station: 'generateur',
    objective: 'Génère "Colis 1", "Colis 2", "Colis 3", "Colis 4".',
    client: {
      name: 'Maya',
      avatar: 'maya',
      orderText: 'Je voudrais 4 paquets étiquetés "Colis 1" jusqu’à "Colis 4" !',
      dropZoneId: 'comptoir-client',
      dropZoneLabel: 'Comptoir de Maya'
    },
    leo: {
      present: true,
      messages: [
        'Souviens-toi de la concaténation avec + ! On peut combiner un texte fixe et le compteur i.',
        'Dans une boucle de 1 à 4, appelle generer("Colis " + i); (n’oublie pas l’espace après Colis).'
      ],
      hints: [
        'Vérifie la majuscule à "Colis " et l’espace avant le guillemet fermant.',
        'for (var i = 1; i <= 4; i++) {\n  generer("Colis " + i);\n}'
      ],
      success: 'Magnifiques étiquettes ! "Colis 1", "Colis 2", "Colis 3", "Colis 4" prêts à partir !'
    },
    starterCode: '// Génère "Colis 1", "Colis 2", "Colis 3", "Colis 4"\n',
    solution: 'for (var i = 1; i <= 4; i++) {\n  generer("Colis " + i);\n}',
    expectedGenerated: ['Colis 1', 'Colis 2', 'Colis 3', 'Colis 4'],
    requireForLoop: true
  },
  {
    id: 27,
    chapter: 3,
    title: 'Bilan : Une condition dans une boucle',
    mechanic: 'loops',
    station: 'generateur',
    objective: 'Fais une boucle de 1 à 8 et ne génère i que si i >= 5.',
    client: {
      name: 'Lucas',
      avatar: 'lucas',
      orderText: 'Parcourez la liste 1 à 8, mais ne m’envoyez que les numéros à partir de 5 !',
      dropZoneId: 'comptoir-client',
      dropZoneLabel: 'Comptoir de Lucas'
    },
    leo: {
      present: true,
      messages: [
        'Grand bilan du Chapitre 3 : on combine une boucle for ET une condition if à l’intérieur !',
        'Écris une boucle for (var i = 1; i <= 8; i++). Dedans, ajoute if (i >= 5) { generer(i); }.'
      ],
      hints: [
        'Le if doit être placé À L’INTÉRIEUR des accolades de la boucle for.',
        'for (var i = 1; i <= 8; i++) {\n  if (i >= 5) {\n    generer(i);\n  }\n}'
      ],
      success: 'Chapitre 3 terminé ! Tu sais maintenant combiner boucles for et conditions if !'
    },
    starterCode: '// Boucle de 1 à 8, avec un if à l\'intérieur pour ne générer que i >= 5\n',
    solution: 'for (var i = 1; i <= 8; i++) {\n  if (i >= 5) {\n    generer(i);\n  }\n}',
    expectedGenerated: [5, 6, 7, 8],
    requireForLoop: true,
    requireIf: true
  }
];
