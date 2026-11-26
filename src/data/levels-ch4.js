export const LEVELS_CH4 = [
  {
    id: 28,
    chapter: 4,
    title: 'Ta première fonction',
    mechanic: 'functions',
    station: 'generateur',
    objective: 'Crée la fonction preparerCafe() qui appelle generer("cafe"), puis appelle-la 2 fois.',
    client: {
      name: 'Théo',
      avatar: 'theo',
      orderText: 'Deux cafés bien chauds pour bien démarrer la journée, s’il vous plaît !',
      dropZoneId: 'comptoir-client',
      dropZoneLabel: 'Comptoir de Théo'
    },
    leo: {
      present: true,
      messages: [
        'Bienvenue au Chapitre 4 ! Quand on répète souvent une action, on peut l’enregistrer dans une fonction : c’est une recette de l’atelier.',
        'On la crée avec function preparerCafe() { generer("cafe"); } — attention, la créer ne la lance pas encore !',
        'Il faut ensuite l’appeler en écrivant preparerCafe(); deux fois de suite pour servir les 2 cafés.'
      ],
      hints: [
        'Écris d’abord la définition de function preparerCafe() { ... }, puis deux appels preparerCafe(); en dessous.',
        'function preparerCafe() {\n  generer("cafe");\n}\n\npreparerCafe();\npreparerCafe();'
      ],
      success: 'Deux cafés fumants servis grâce à ta toute première fonction !'
    },
    starterCode: '// 1. Déclare la fonction preparerCafe()\n// 2. Appelle-la deux fois\n',
    solution: 'function preparerCafe() {\n  generer("cafe");\n}\n\npreparerCafe();\npreparerCafe();',
    mode: 'generate',
    expectedFunction: { name: 'preparerCafe', minParams: 0, minCalls: 2 },
    expectedGenerated: ['cafe', 'cafe']
  },
  {
    id: 29,
    chapter: 4,
    title: 'Fonction avec un paramètre',
    mechanic: 'functions',
    station: 'generateur',
    objective: 'Crée emballer(objet) qui appelle generer(objet), puis appelle-la pour "pomme", "poire" et "banane".',
    client: {
      name: 'Lina',
      avatar: 'lina',
      orderText: 'Je prends un panier de fruits : "pomme", "poire" et "banane" !',
      dropZoneId: 'comptoir-client',
      dropZoneLabel: 'Comptoir de Lina'
    },
    leo: {
      present: true,
      messages: [
        'Pour qu’une fonction s’adapte à plusieurs commandes, on lui donne un paramètre entre ses parenthèses : function emballer(objet) { generer(objet); }.',
        'Ensuite, appelle emballer("pomme"); puis emballer("poire"); puis emballer("banane"); !'
      ],
      hints: [
        'Le paramètre objet fonctionne comme une variable à l’intérieur de la fonction.',
        'function emballer(objet) {\n  generer(objet);\n}\n\nemballer("pomme");\nemballer("poire");\nemballer("banane");'
      ],
      success: 'Une seule fonction pour emballer n’importe quel fruit ! Super efficace !'
    },
    starterCode: '// Déclare emballer(objet) puis appelle-la 3 fois\n',
    solution: 'function emballer(objet) {\n  generer(objet);\n}\n\nemballer("pomme");\nemballer("poire");\nemballer("banane");',
    mode: 'generate',
    expectedFunction: { name: 'emballer', minParams: 1, minCalls: 3 },
    expectedGenerated: ['pomme', 'poire', 'banane']
  },
  {
    id: 30,
    chapter: 4,
    title: 'Fonction avec deux paramètres',
    mechanic: 'functions',
    station: 'generateur',
    objective: 'Crée etiqueter(nom, quantite) qui génère nom + " x" + quantite, pour ("stylo", 3) et ("cahier", 2).',
    client: {
      name: 'Camille',
      avatar: 'camille',
      orderText: 'Pour la rentrée : "stylo x3" et "cahier x2", s’il vous plaît !',
      dropZoneId: 'comptoir-client',
      dropZoneLabel: 'Comptoir de Camille'
    },
    leo: {
      present: true,
      messages: [
        'Une fonction peut recevoir plusieurs paramètres séparés par une virgule : function etiqueter(nom, quantite).',
        'À l’intérieur, appelle generer(nom + " x" + quantite); puis appelle etiqueter("stylo", 3); et etiqueter("cahier", 2);.'
      ],
      hints: [
        'N’oublie pas l’espace avant le x dans " x" !',
        'function etiqueter(nom, quantite) {\n  generer(nom + " x" + quantite);\n}\n\netiqueter("stylo", 3);\netiqueter("cahier", 2);'
      ],
      success: 'Fournitures parfaitement étiquetées ! Camille est prête pour la rentrée.'
    },
    starterCode: '// Crée function etiqueter(nom, quantite) et appelle-la deux fois\n',
    solution: 'function etiqueter(nom, quantite) {\n  generer(nom + " x" + quantite);\n}\n\netiqueter("stylo", 3);\netiqueter("cahier", 2);',
    mode: 'generate',
    expectedFunction: { name: 'etiqueter', minParams: 2, minCalls: 2 },
    expectedGenerated: ['stylo x3', 'cahier x2']
  },
  {
    id: 31,
    chapter: 4,
    title: 'Renvoyer un résultat (return)',
    mechanic: 'functions',
    station: 'tapis',
    objective: 'Crée doubler(nombre) qui retourne nombre * 2, puis stocke doubler(7) dans une variable.',
    client: {
      name: 'Malo',
      avatar: 'malo',
      orderText: 'J’ai commandé 7 pièces, finalement doublez ma commande !',
      dropZoneId: 'comptoir-client',
      dropZoneLabel: 'Comptoir de Malo'
    },
    leo: {
      present: true,
      messages: [
        'Une fonction peut aussi calculer une valeur et la RENVOYER grâce au mot-clé return !',
        'Écris function doubler(nombre) { return nombre * 2; } puis range le résultat dans une variable (par exemple var resultat = doubler(7);).'
      ],
      hints: [
        'Le mot-clé return renvoie le résultat du calcul à l’endroit où la fonction a été appelée.',
        'function doubler(nombre) {\n  return nombre * 2;\n}\n\nvar resultat = doubler(7);'
      ],
      success: 'doubler(7) a renvoyé 14 directement dans ton colis ! C’est la magie du return !'
    },
    starterCode: '// Crée la fonction doubler(nombre) avec return\n// Puis stocke doubler(7) dans une variable\n',
    solution: 'function doubler(nombre) {\n  return nombre * 2;\n}\n\nvar resultat = doubler(7);',
    mode: 'return',
    expectedFunction: { name: 'doubler', minParams: 1, minCalls: 1 },
    expectedValues: [14],
    extraTests: [
      { args: [5], expected: 10 },
      { args: [12], expected: 24 }
    ]
  },
  {
    id: 32,
    chapter: 4,
    title: 'Fonction avec une condition',
    mechanic: 'functions',
    station: 'tapis',
    objective: 'Crée verifierPoids(poids) retournant "Lourd" si poids >= 10 sinon "Leger", puis stocke verifierPoids(14) dans une variable.',
    client: {
      name: 'Hugo',
      avatar: 'hugo',
      orderText: 'Mon colis pèse 14 kg : collez-moi l’étiquette "Lourd" ou "Leger" !',
      dropZoneId: 'comptoir-client',
      dropZoneLabel: 'Comptoir de Hugo'
    },
    leo: {
      present: true,
      messages: [
        'Mettons un if / else à l’intérieur d’une fonction !',
        'Crée function verifierPoids(poids) : si poids >= 10, renvoie "Lourd", sinon renvoie "Leger" (sans accent).',
        'Ensuite, range le résultat de verifierPoids(14) dans une variable (par exemple var etiquette = verifierPoids(14);).'
      ],
      hints: [
        'Mets un return "Lourd"; dans le if et un return "Leger"; dans le else.',
        'function verifierPoids(poids) {\n  if (poids >= 10) {\n    return "Lourd";\n  } else {\n    return "Leger";\n  }\n}\n\nvar etiquette = verifierPoids(14);'
      ],
      success: 'Bravo ! Ta fonction classe automatiquement n’importe quel poids !'
    },
    starterCode: '// Déclare verifierPoids(poids) puis appelle-la pour 14\n',
    solution: 'function verifierPoids(poids) {\n  if (poids >= 10) {\n    return "Lourd";\n  } else {\n    return "Leger";\n  }\n}\n\nvar etiquette = verifierPoids(14);',
    mode: 'return',
    expectedFunction: { name: 'verifierPoids', minParams: 1, minCalls: 1 },
    expectedValues: ['Lourd'],
    extraTests: [
      { args: [4], expected: 'Leger' },
      { args: [10], expected: 'Lourd' },
      { args: [25], expected: 'Lourd' }
    ]
  },
  {
    id: 33,
    chapter: 4,
    title: 'Bilan : Fonction avec une boucle',
    mechanic: 'functions',
    station: 'generateur',
    objective: 'Crée produireLot(objet, nombre) avec une boucle for, puis appelle produireLot("lampe", 4);.',
    client: {
      name: 'Nora',
      avatar: 'nora',
      orderText: 'J’ouvre une boutique : il me faut un lot de 4 colis "lampe" !',
      dropZoneId: 'comptoir-client',
      dropZoneLabel: 'Comptoir de Nora'
    },
    leo: {
      present: true,
      messages: [
        'Bilan du Chapitre 4 : mets une boucle for dans une fonction !',
        'Crée function produireLot(objet, nombre) qui fait for (var i = 1; i <= nombre; i++) { generer(objet); }.',
        'Appelle ensuite produireLot("lampe", 4);.'
      ],
      hints: [
        'La boucle utilise le paramètre nombre comme limite : i <= nombre.',
        'function produireLot(objet, nombre) {\n  for (var i = 1; i <= nombre; i++) {\n    generer(objet);\n  }\n}\n\nproduireLot("lampe", 4);'
      ],
      success: 'Chapitre 4 validé ! Tu sais maintenant fabriquer de vraies fonctions réutilisables !'
    },
    starterCode: '// Crée produireLot(objet, nombre) avec une boucle for, puis appelle produireLot("lampe", 4)\n',
    solution: 'function produireLot(objet, nombre) {\n  for (var i = 1; i <= nombre; i++) {\n    generer(objet);\n  }\n}\n\nproduireLot("lampe", 4);',
    mode: 'generate',
    expectedFunction: { name: 'produireLot', minParams: 2, minCalls: 1 },
    expectedGenerated: ['lampe', 'lampe', 'lampe', 'lampe'],
    requireForLoop: true
  }
];
