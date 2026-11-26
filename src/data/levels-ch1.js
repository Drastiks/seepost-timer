export const LEVELS_CH1 = [
  {
    id: 1,
    chapter: 1,
    title: 'Premier colis (nombre)',
    mechanic: 'variables',
    station: 'tapis',
    objective: 'Crée une variable contenant le nombre 1, puis appelle leo(taVariable); pour livrer.',
    client: {
      name: 'Camille',
      avatar: 'camille',
      orderText: 'Bonjour ! Je voudrais un colis contenant le nombre 1, s’il vous plaît.',
      dropZoneId: 'comptoir-client',
      dropZoneLabel: 'Comptoir de Camille'
    },
    leo: {
      present: true,
      messages: [
        'Bienvenue à l’Atelier & Comptoir ! Je m’appelle Léo, je vais t’accompagner pour tes débuts en JavaScript.',
        'Dès que tu crées une variable avec var (par exemple : var colis = 1;), le colis apparaît aussitôt sur le tapis roulant !',
        'Pour que je l’apporte au comptoir, ajoute ensuite la ligne : leo(colis); !'
      ],
      hints: [
        'Ligne 1 : crée ta variable (nom libre), par exemple var colis = 1;',
        'Ligne 2 : appelle leo(colis); pour que je porte ton colis au comptoir !'
      ],
      success: 'Bravo ! Ton tout premier colis est apparu sur le tapis et je l’ai livré à Camille !'
    },
    starterCode: '// 1. Crée une variable qui vaut 1 (nom libre)\n// 2. Appelle leo(nomDeTaVariable); pour livrer\n',
    solution: 'var colis = 1;\nleo(colis);',
    expectedValues: [1]
  },
  {
    id: 2,
    chapter: 1,
    title: 'Un autre numéro',
    mechanic: 'variables',
    station: 'tapis',
    objective: 'Crée une variable contenant le nombre 7, puis appelle leo(...) pour la livrer.',
    client: {
      name: 'Théo',
      avatar: 'theo',
      orderText: 'Salut ! Il me faudrait un colis avec le nombre 7.',
      dropZoneId: 'comptoir-client',
      dropZoneLabel: 'Comptoir de Théo'
    },
    leo: {
      present: true,
      messages: [
        'Super départ ! Le nom de ta variable est libre : il sert juste d’étiquette sur le colis.',
        'Crée une variable contenant 7 (par exemple var numero = 7;), puis appelle leo(numero); pour que je le livre à Théo.'
      ],
      hints: [
        'Crée d’abord ta variable : var numero = 7;',
        'Puis appelle : leo(numero);'
      ],
      success: 'Parfait ! Peu importe l’étiquette choisie, le colis contient bien 7 pour Théo.'
    },
    starterCode: '// Crée une variable avec le nombre 7 puis livre-la avec leo(...)\n',
    solution: 'var numero = 7;\nleo(numero);',
    expectedValues: [7]
  },
  {
    id: 3,
    chapter: 1,
    title: 'Un colis avec du texte',
    mechanic: 'variables',
    station: 'tapis',
    objective: 'Crée une variable contenant le texte "livre", puis appelle leo(...).',
    client: {
      name: 'Inès',
      avatar: 'ines',
      orderText: 'Bonjour ! J’ai commandé un colis contenant le texte "livre".',
      dropZoneId: 'comptoir-client',
      dropZoneLabel: 'Comptoir d’Inès'
    },
    leo: {
      present: true,
      messages: [
        'Jusqu’ici on a rangé des nombres dans nos colis. On peut aussi ranger du texte !',
        'En JavaScript, un texte doit TOUJOURS être entouré de guillemets, comme "livre".',
        'Crée une variable contenant "livre" puis appelle leo(...) avec son nom !'
      ],
      hints: [
        'N’oublie pas les guillemets autour du mot : "livre".',
        'Exemple :\nvar produit = "livre";\nleo(produit);'
      ],
      success: 'Génial ! Sans guillemets, JavaScript aurait cru que livre était une autre variable. Bien retenu !'
    },
    starterCode: '// Crée une variable contenant "livre" puis appelle leo(...)\n',
    solution: 'var produit = "livre";\nleo(produit);',
    expectedValues: ['livre']
  },
  {
    id: 4,
    chapter: 1,
    title: 'Préparer un cadeau',
    mechanic: 'variables',
    station: 'tapis',
    objective: 'Crée une variable contenant le texte "tasse", puis appelle leo(...).',
    client: {
      name: 'Sami',
      avatar: 'sami',
      orderText: 'C’est pour un anniversaire : je voudrais le colis "tasse" !',
      dropZoneId: 'comptoir-client',
      dropZoneLabel: 'Comptoir de Sami'
    },
    leo: {
      present: true,
      messages: [
        'À toi de jouer tout seul sur un texte !',
        'Sami veut un colis contenant le mot "tasse" (en minuscules). Crée la variable et appelle leo(...) !'
      ],
      hints: [
        'Pense bien aux guillemets autour de "tasse".',
        'Exemple :\nvar cadeau = "tasse";\nleo(cadeau);'
      ],
      success: 'Emballé et livré ! Sami va faire un heureux.'
    },
    starterCode: '// Crée une variable avec la valeur "tasse" et appelle leo(...)\n',
    solution: 'var cadeau = "tasse";\nleo(cadeau);',
    expectedValues: ['tasse']
  },
  {
    id: 5,
    chapter: 1,
    title: 'Deux colis sur le tapis',
    mechanic: 'variables',
    station: 'tapis',
    objective: 'Crée deux variables ("the" et "tarte") puis livre les deux avec leo(...).',
    client: {
      name: 'Nora',
      avatar: 'nora',
      orderText: 'Pour le goûter : un colis "the" et un colis "tarte" !',
      dropZoneId: 'comptoir-client',
      dropZoneLabel: 'Comptoir de Nora'
    },
    leo: {
      present: true,
      messages: [
        'Un programme contient souvent plusieurs lignes, exécutées l’une après l’autre de haut en bas.',
        'Crée deux variables ("the" et "tarte"), puis appelle leo(...) pour chacune des deux !'
      ],
      hints: [
        'Tu peux appeler leo(...) deux fois, une fois par variable.',
        'Exemple :\nvar boisson = "the";\nvar gateau = "tarte";\nleo(boisson);\nleo(gateau);'
      ],
      success: 'Deux colis impeccables ! Je les ai portés tous les deux à Nora.'
    },
    starterCode: '// Crée deux variables ("the" et "tarte") puis appelle leo(...) pour les deux\n',
    solution: 'var boisson = "the";\nvar gateau = "tarte";\nleo(boisson);\nleo(gateau);',
    expectedValues: ['the', 'tarte']
  },
  {
    id: 6,
    chapter: 1,
    title: 'Modifier le contenu d’un colis',
    mechanic: 'variables',
    station: 'tapis',
    objective: 'Modifie la variable (sans réécrire var) pour qu’elle vaille 12, puis appelle leo(...).',
    client: {
      name: 'Lucas',
      avatar: 'lucas',
      orderText: 'Oups, le tarif a changé ! Le colis doit finalement valoir 12.',
      dropZoneId: 'comptoir-client',
      dropZoneLabel: 'Comptoir de Lucas'
    },
    leo: {
      present: true,
      messages: [
        'Une variable peut changer de valeur ! On dit qu’on la réassigne.',
        'La première fois, on la crée avec var prix = 5;. Ensuite, pour changer sa valeur, on n’écrit PLUS var : on écrit simplement prix = 12;.',
        'Modifie prix à 12 puis appelle leo(prix); !'
      ],
      hints: [
        'Garde var prix = 5;, ajoute prix = 12; en dessous, puis leo(prix);.',
        'var prix = 5;\nprix = 12;\nleo(prix);'
      ],
      success: 'Tu as vu le colis se mettre à jour en direct sur le tapis roulant ? Très propre !'
    },
    starterCode: 'var prix = 5;\n// Modifie cette variable pour qu\'elle vaille 12, puis appelle leo(prix);\n',
    solution: 'var prix = 5;\nprix = 12;\nleo(prix);',
    expectedValues: [12],
    requireReassign: true
  },
  {
    id: 7,
    chapter: 1,
    title: 'Additionner deux colis',
    mechanic: 'variables',
    station: 'tapis',
    objective: 'Crée une variable égale à a + b, puis appelle leo(...) avec cette variable.',
    client: {
      name: 'Maya',
      avatar: 'maya',
      orderText: 'J’ai 4 pommes et 6 poires : donnez-moi le colis avec le total !',
      dropZoneId: 'comptoir-client',
      dropZoneLabel: 'Comptoir de Maya'
    },
    leo: {
      present: true,
      messages: [
        'JavaScript est aussi une excellente calculatrice ! On peut utiliser les noms des variables dans un calcul.',
        'Les variables a et b sont déjà prêtes. Crée une variable égale à a + b, puis appelle leo(...) pour me la confier !'
      ],
      hints: [
        'Écris var total = a + b; puis leo(total);.',
        'Exemple :\nvar a = 4;\nvar b = 6;\nvar total = a + b;\nleo(total);'
      ],
      success: '4 + 6 = 10 ! Utiliser a + b permet au calcul de s’adapter si les nombres changent.'
    },
    starterCode: 'var a = 4;\nvar b = 6;\n// Crée une variable égale à a + b puis livre-la avec leo(...)\n',
    solution: 'var a = 4;\nvar b = 6;\nvar total = a + b;\nleo(total);',
    expectedValues: [10],
    requireOperator: '+'
  },
  {
    id: 8,
    chapter: 1,
    title: 'Calculer le stock restant',
    mechanic: 'variables',
    station: 'tapis',
    objective: 'Crée une variable égale à stock - vendus, puis appelle leo(...).',
    client: {
      name: 'Hugo',
      avatar: 'hugo',
      orderText: 'Il y avait 10 boîtes en stock et 3 vendues. Combien reste-t-il ?',
      dropZoneId: 'comptoir-client',
      dropZoneLabel: 'Comptoir de Hugo'
    },
    leo: {
      present: true,
      messages: [
        'Après l’addition +, essayons la soustraction - !',
        'Utilise stock et vendus pour créer une variable égale à stock - vendus, puis livre-la avec leo(...).'
      ],
      hints: [
        'Utilise le signe - entre stock et vendus.',
        'Exemple :\nvar reste = stock - vendus;\nleo(reste);'
      ],
      success: 'Exact ! 10 - 3 = 7 boîtes restantes. Hugo note ça dans son inventaire.'
    },
    starterCode: 'var stock = 10;\nvar vendus = 3;\n// Crée une variable égale à stock - vendus puis appelle leo(...)\n',
    solution: 'var stock = 10;\nvar vendus = 3;\nvar reste = stock - vendus;\nleo(reste);',
    expectedValues: [7],
    requireOperator: '-'
  },
  {
    id: 9,
    chapter: 1,
    title: 'Coller deux textes ensemble',
    mechanic: 'variables',
    station: 'tapis',
    objective: 'Crée une variable contenant "Bonjour " + prenom, puis appelle leo(...).',
    client: {
      name: 'Lina',
      avatar: 'lina',
      orderText: 'J’aimerais une carte personnalisée avec le texte "Bonjour Lina" !',
      dropZoneId: 'comptoir-client',
      dropZoneLabel: 'Comptoir de Lina'
    },
    leo: {
      present: true,
      messages: [
        'Astuce super utile : avec du texte, le signe + sert à coller des mots bout à bout ! On appelle ça la concaténation.',
        'Fais attention à l’espace après "Bonjour " ! Crée une variable égale à "Bonjour " + prenom puis appelle leo(...).'
      ],
      hints: [
        'Vérifie qu’il y a bien un espace à la fin de "Bonjour " avant le guillemet fermant.',
        'Exemple :\nvar message = "Bonjour " + prenom;\nleo(message);'
      ],
      success: 'Quel accueil chaleureux ! "Bonjour Lina" est prêt et livré.'
    },
    starterCode: 'var prenom = "Lina";\n// Crée une variable en collant "Bonjour " et prenom, puis appelle leo(...)\n',
    solution: 'var prenom = "Lina";\nvar message = "Bonjour " + prenom;\nleo(message);',
    expectedValues: ['Bonjour Lina'],
    requireOperator: '+'
  },
  {
    id: 10,
    chapter: 1,
    title: 'Bilan : Commande complète',
    mechanic: 'variables',
    station: 'tapis',
    objective: 'Crée une variable "Malo" et une variable calculant 3 * 4 (= 12), puis livre-les avec leo(...).',
    client: {
      name: 'Malo',
      avatar: 'malo',
      orderText: 'Je prends 3 carnets à 4€ pièce. Préparez mon nom "Malo" et le total !',
      dropZoneId: 'comptoir-client',
      dropZoneLabel: 'Comptoir de Malo'
    },
    leo: {
      present: true,
      messages: [
        'Dernier exercice du Chapitre 1 ! Pour multiplier deux nombres en JavaScript, on utilise l’étoile *.',
        'Prépare une variable avec "Malo", calcule le total de 3 * 4 avec *, puis appelle leo(...) pour livrer les deux !'
      ],
      hints: [
        'Crée les variables que tu veux pour "Malo" et 3 * 4, puis appelle leo(...) pour chacun des deux colis attendus.',
        'Exemple :\nvar client = "Malo";\nvar quantite = 3;\nvar prix = 4;\nvar total = quantite * prix;\nleo(client);\nleo(total);'
      ],
      success: 'Chapitre 1 terminé avec brio ! Tu maîtrises les variables var sur le tapis roulant !'
    },
    starterCode: '// Prépare "Malo" et le total (3 * 4), puis livre-les avec leo(...)\n',
    solution: 'var client = "Malo";\nvar quantite = 3;\nvar prix = 4;\nvar total = quantite * prix;\nleo(client);\nleo(total);',
    expectedValues: ['Malo', 12],
    requireOperator: '*'
  }
];
