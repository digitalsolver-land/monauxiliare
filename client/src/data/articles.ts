export interface Article {
  id: string;
  title: string;
  category: string;
  summary: string;
  readTime: string;
  author: string;
  date: string;
  content: {
    introduction: string;
    sections: {
      title: string;
      content: string;
      tips?: string[];
      warning?: string;
    }[];
    conclusion: string;
  };
  tags: string[];
  relatedArticles?: string[];
}

export const articles: Record<string, Article> = {
  "checklist": {
    id: "checklist",
    title: "Check-list Complète pour un Déménagement Réussi",
    category: "Planification",
    summary: "Une liste exhaustive de toutes les tâches à accomplir avant, pendant et après votre déménagement.",
    readTime: "8 min",
    author: "Équipe Mon Auxiliaire",
    date: "15 Janvier 2024",
    content: {
      introduction: "Un déménagement réussi commence par une planification méticuleuse. Cette check-list complète vous accompagne étape par étape pour ne rien oublier et éviter le stress de dernière minute.",
      sections: [
        {
          title: "8 semaines avant le déménagement",
          content: "Commencez vos préparatifs dès que possible pour éviter la précipitation.",
          tips: [
            "Demandez plusieurs devis de déménagement",
            "Réservez votre entreprise de déménagement",
            "Commencez le tri de vos affaires",
            "Recherchez votre nouveau logement si nécessaire",
            "Informez votre propriétaire actuel (préavis de 3 mois pour un bail non meublé)"
          ]
        },
        {
          title: "6 semaines avant",
          content: "Intensifiez vos démarches administratives et organisationnelles.",
          tips: [
            "Confirmez votre réservation de déménagement",
            "Commandez vos cartons et matériel d'emballage",
            "Planifiez vos congés pour le jour J",
            "Contactez les écoles pour le transfert de dossiers",
            "Recherchez de nouveaux prestataires (médecin, dentiste, etc.)"
          ]
        },
        {
          title: "4 semaines avant",
          content: "Accélérez les démarches administratives critiques.",
          tips: [
            "Effectuez votre changement d'adresse à La Poste",
            "Prévenez votre banque et assurance",
            "Transférez vos contrats (électricité, gaz, internet)",
            "Mettez à jour votre carte grise",
            "Informez votre employeur de votre nouvelle adresse"
          ]
        },
        {
          title: "2 semaines avant",
          content: "Finalisez les derniers détails et commencez l'emballage intensif.",
          tips: [
            "Confirmez tous vos rendez-vous",
            "Commencez l'emballage des objets non essentiels",
            "Videz et dégivrez votre congélateur",
            "Organisez la garde de vos animaux de compagnie",
            "Préparez un sac de survie pour les premiers jours"
          ],
          warning: "N'oubliez pas de garder vos documents importants avec vous le jour J !"
        },
        {
          title: "La semaine du déménagement",
          content: "Derniers préparatifs et vérifications avant le grand jour.",
          tips: [
            "Finissez l'emballage",
            "Préparez votre trousse de première nécessité",
            "Confirmez l'heure d'arrivée des déménageurs",
            "Retirez vos effets personnels du coffre-fort",
            "Préparez les moyens de paiement pour les déménageurs"
          ]
        },
        {
          title: "Le jour J",
          content: "Guide pour une journée de déménagement sans stress.",
          tips: [
            "Levez-vous tôt et prenez un bon petit-déjeuner",
            "Préparez café, eau et snacks pour l'équipe",
            "Restez disponible pour les déménageurs",
            "Vérifiez l'inventaire avant le départ",
            "Faites un dernier tour de l'ancien logement"
          ]
        },
        {
          title: "Après le déménagement",
          content: "Ne négligez pas les tâches post-déménagement.",
          tips: [
            "Vérifiez l'état de vos biens à l'arrivée",
            "Défaites vos cartons prioritaires",
            "Mettez à jour votre nouvelle adresse partout",
            "Inscrivez-vous sur les listes électorales",
            "Trouvez vos nouveaux commerces de proximité"
          ]
        }
      ],
      conclusion: "Un déménagement bien planifié est un déménagement réussi. N'hésitez pas à adapter cette liste à votre situation particulière et à faire appel à des professionnels pour vous accompagner."
    },
    tags: ["planification", "organisation", "check-list", "déménagement"],
    relatedArticles: ["packing-tips", "budget", "admin"]
  },
  
  "packing-tips": {
    id: "packing-tips",
    title: "Techniques d'Emballage Professionnelles",
    category: "Conseils pratiques",
    summary: "Découvrez les secrets des professionnels pour emballer vos biens en toute sécurité.",
    readTime: "6 min",
    author: "Ahmed Benali, Expert Déménagement",
    date: "12 Janvier 2024",
    content: {
      introduction: "L'emballage est un art qui peut faire la différence entre un déménagement réussi et un cauchemar. Nos experts partagent leurs techniques éprouvées pour protéger vos biens les plus précieux.",
      sections: [
        {
          title: "Matériel indispensable",
          content: "Le choix du bon matériel est crucial pour la protection de vos biens.",
          tips: [
            "Cartons de différentes tailles (petits pour les livres, grands pour les vêtements)",
            "Papier bulle pour les objets fragiles",
            "Papier journal pour combler les vides",
            "Adhésif de qualité professionnelle",
            "Marqueurs permanents pour l'étiquetage",
            "Film plastique pour protéger les meubles"
          ]
        },
        {
          title: "La règle d'or : objets lourds = petits cartons",
          content: "Cette règle simple peut vous éviter bien des problèmes de dos et de cartons qui se déchirent.",
          tips: [
            "Livres : maximum 15 kg par carton",
            "Vaisselle : alternez assiettes et papier bulle",
            "Vêtements : peuvent aller dans de gros cartons",
            "Électroménager : toujours dans leur emballage d'origine si possible"
          ],
          warning: "Un carton ne doit jamais dépasser 20 kg pour être manipulé en sécurité."
        },
        {
          title: "Techniques spéciales par type d'objet",
          content: "Chaque type d'objet demande une technique d'emballage spécifique.",
          tips: [
            "Miroirs et tableaux : emballez dans du papier bulle puis dans des cartons spéciaux",
            "Électronique : photos avant démontage, emballage antistatique",
            "Vêtements : gardez-les sur cintres dans des housses spéciales",
            "Liquides : vérifiez les bouchons, emballez dans des sacs plastiques",
            "Plantes : préparez-les 48h avant avec un arrosage adapté"
          ]
        },
        {
          title: "Étiquetage intelligent",
          content: "Un bon étiquetage facilite grandement le déballage.",
          tips: [
            "Indiquez la pièce de destination",
            "Mentionnez 'FRAGILE' en gros et en couleur",
            "Numérotez vos cartons et tenez un inventaire",
            "Utilisez un code couleur par pièce",
            "Marquez 'DESSUS' et 'DESSOUS' sur les cartons fragiles"
          ]
        },
        {
          title: "Astuces de pro pour l'optimisation",
          content: "Maximisez l'espace et minimisez les risques avec ces techniques avancées.",
          tips: [
            "Utilisez vos vêtements comme matériel de protection",
            "Démontez les meubles et gardez la visserie dans des sachets étiquetés",
            "Photographiez vos installations électroniques avant démontage",
            "Préparez un carton 'première nécessité' pour le premier jour",
            "Gardez vos produits d'entretien dans leur emballage d'origine"
          ]
        }
      ],
      conclusion: "Un emballage professionnel demande du temps mais vous fait économiser beaucoup d'argent en évitant la casse. N'hésitez pas à investir dans du matériel de qualité."
    },
    tags: ["emballage", "protection", "matériel", "techniques"],
    relatedArticles: ["checklist", "storage", "budget"]
  },

  "budget": {
    id: "budget",
    title: "Calculer et Optimiser le Budget de votre Déménagement",
    category: "Finance",
    summary: "Guide complet pour estimer, planifier et réduire les coûts de votre déménagement au Maroc.",
    readTime: "7 min",
    author: "Fatima Alaoui, Conseillère Financière",
    date: "10 Janvier 2024",
    content: {
      introduction: "Le budget d'un déménagement peut rapidement s'envoler si l'on n'y prend garde. Ce guide vous aide à estimer précisément vos coûts et à identifier les postes d'économies possibles.",
      sections: [
        {
          title: "Les postes de dépenses principaux",
          content: "Identifiez tous les coûts pour éviter les mauvaises surprises.",
          tips: [
            "Prestation de déménagement : 2000-8000 DH selon la distance et le volume",
            "Matériel d'emballage : 300-800 DH",
            "Démarches administratives : 200-500 DH",
            "Frais de déplacement et hébergement : variable",
            "Assurance complémentaire : 100-300 DH",
            "Pourboires pour l'équipe : 200-500 DH"
          ]
        },
        {
          title: "Facteurs qui influencent le prix",
          content: "Comprenez ce qui fait varier le coût de votre déménagement.",
          tips: [
            "Distance : tarif au km ou forfait selon la zone",
            "Volume : cubage de vos affaires",
            "Accessibilité : étage, ascenseur, stationnement",
            "Saison : pics de prix en été et fins de mois",
            "Services additionnels : démontage, emballage, stockage",
            "Assurance : valeur des biens à protéger"
          ]
        },
        {
          title: "Stratégies d'économie intelligentes",
          content: "Réduisez vos coûts sans sacrifier la qualité.",
          tips: [
            "Déménagez en milieu de semaine et hors vacances scolaires",
            "Faites le tri avant : moins de volume = moins cher",
            "Emballez vous-même les objets non fragiles",
            "Comparez 3-4 devis détaillés",
            "Négociez un forfait global plutôt qu'un tarif horaire",
            "Groupez plusieurs services (emballage + transport + déballage)"
          ]
        },
        {
          title: "Les pièges à éviter",
          content: "Attention aux coûts cachés et aux arnaques.",
          tips: [
            "Devis anormalement bas : souvent des suppléments cachés",
            "Paiement intégral avant prestation : jamais plus de 30% d'acompte",
            "Pas de contrat écrit : exigez toujours un devis signé",
            "Assurance insuffisante : vérifiez les plafonds de remboursement",
            "Frais supplémentaires non prévus : portage, stationnement difficile"
          ],
          warning: "Méfiez-vous des devis trop alléchants : la qualité a un prix !"
        },
        {
          title: "Aide financière et déductions",
          content: "Explorez les possibilités de réduction de coûts.",
          tips: [
            "Participation employeur : négociez une aide au déménagement",
            "Déduction fiscale : gardez toutes vos factures",
            "Aides locales : renseignez-vous auprès de votre commune",
            "Crédit à la consommation : pour étaler les paiements",
            "Groupage : partagez un camion avec d'autres déménagements"
          ]
        }
      ],
      conclusion: "Un budget bien planifié vous évite les surprises et vous permet de choisir les bonnes options. N'hésitez pas à investir dans la qualité pour protéger vos biens les plus précieux."
    },
    tags: ["budget", "coûts", "économies", "prix"],
    relatedArticles: ["checklist", "admin", "storage"]
  },

  "storage": {
    id: "storage",
    title: "Solutions de Stockage Temporaire et Sécurisé",
    category: "Services",
    summary: "Guide complet des options de stockage pour vos biens pendant et après le déménagement.",
    readTime: "5 min",
    author: "Karim Benkirane, Responsable Logistique",
    date: "8 Janvier 2024",
    content: {
      introduction: "Besoin de stocker vos affaires temporairement ? Découvrez toutes les solutions disponibles au Maroc, leurs avantages et comment choisir la meilleure option selon vos besoins.",
      sections: [
        {
          title: "Quand avez-vous besoin de stockage ?",
          content: "Identifiez les situations qui nécessitent une solution de stockage.",
          tips: [
            "Décalage entre la sortie et l'entrée dans les logements",
            "Réduction de l'espace de vie (déménagement dans plus petit)",
            "Rénovations dans le nouveau logement",
            "Déménagement international avec délais",
            "Stockage saisonnier (meubles de jardin, décorations)",
            "Garde-meuble temporaire lors de séparations"
          ]
        },
        {
          title: "Types de solutions disponibles",
          content: "Chaque solution répond à des besoins spécifiques.",
          tips: [
            "Box de self-stockage : accès 24h/24, différentes tailles",
            "Garde-meuble traditionnel : moins cher, accès limité",
            "Stockage chez Mon Auxiliaire : solution complète avec assurance",
            "Container sur votre terrain : pour les gros volumes",
            "Stockage mobile : on vient chercher vos affaires",
            "Solutions temporaires : amis, famille, garage"
          ]
        },
        {
          title: "Critères de choix importants",
          content: "Évaluez ces aspects avant de choisir votre solution.",
          tips: [
            "Sécurité : alarme, surveillance, contrôle d'accès",
            "Accessibilité : horaires, facilité de chargement/déchargement",
            "Climat : protection contre l'humidité et les variations de température",
            "Assurance : couverture de vos biens stockés",
            "Prix : tarification transparente, pas de frais cachés",
            "Durée minimum : flexibilité des contrats"
          ]
        },
        {
          title: "Préparation de vos affaires pour le stockage",
          content: "Optimisez la protection et l'organisation de vos biens stockés.",
          tips: [
            "Nettoyez et séchez tous les objets avant stockage",
            "Démontez les meubles volumineux pour économiser l'espace",
            "Utilisez des housses plastiques pour les textiles",
            "Placez les objets lourds au fond, fragiles au-dessus",
            "Laissez des allées pour accéder à vos affaires",
            "Tenez un inventaire détaillé avec photos"
          ],
          warning: "Ne stockez jamais de produits périssables, inflammables ou dangereux !"
        },
        {
          title: "Tarification et économies",
          content: "Optimisez vos coûts de stockage.",
          tips: [
            "Tarifs dégressifs pour les longues durées",
            "Promotion premier mois gratuit souvent disponible",
            "Négociez si vous prenez plusieurs services",
            "Partagez un grand box avec quelqu'un de confiance",
            "Réévaluez régulièrement si vous avez encore besoin du stockage"
          ]
        }
      ],
      conclusion: "Le stockage temporaire peut grandement faciliter votre déménagement. Choisissez une solution sécurisée et adaptée à vos besoins réels pour optimiser vos coûts."
    },
    tags: ["stockage", "garde-meuble", "self-stockage", "sécurité"],
    relatedArticles: ["budget", "packing-tips", "admin"]
  },

  "admin": {
    id: "admin",
    title: "Démarches Administratives : Le Guide Complet",
    category: "Administration",
    summary: "Toutes les démarches administratives à effectuer lors de votre changement d'adresse au Maroc.",
    readTime: "9 min",
    author: "Aïcha Benali, Juriste",
    date: "5 Janvier 2024",
    content: {
      introduction: "Changer d'adresse implique de nombreuses démarches administratives. Ce guide détaillé vous accompagne pour ne rien oublier et respecter tous les délais légaux au Maroc.",
      sections: [
        {
          title: "Organismes prioritaires à prévenir",
          content: "Commencez par ces démarches essentielles dès que votre déménagement est confirmé.",
          tips: [
            "Préfecture : mise à jour de la carte d'identité nationale",
            "Poste Maroc : redirection du courrier (service payant)",
            "Banques : tous vos comptes et cartes",
            "Assurances : habitation, auto, santé",
            "Employeur : service RH pour mise à jour du dossier",
            "Sécurité sociale (CNSS) : mise à jour de votre dossier"
          ]
        },
        {
          title: "Services et abonnements",
          content: "N'oubliez pas de transférer ou résilier vos contrats de services.",
          tips: [
            "Électricité et gaz : transfert ou résiliation/réabonnement",
            "Internet et téléphone : négociez le transfert gratuit",
            "Eau : souvent inclus dans les charges ou géré par le syndic",
            "Télévision par satellite : déplacement de l'installation",
            "Services de ménage, gardiennage : prévenez à l'avance",
            "Abonnements divers : magazines, livraisons, etc."
          ]
        },
        {
          title: "Véhicules et transport",
          content: "Mise à jour obligatoire des documents de vos véhicules.",
          tips: [
            "Carte grise : changement d'adresse obligatoire dans les 30 jours",
            "Assurance auto : impact possible sur la prime",
            "Contrôle technique : à prévoir si changement de région",
            "Transports en commun : nouveaux abonnements si nécessaire",
            "Auto-école : transfert du dossier si permis en cours"
          ],
          warning: "Rouler avec une carte grise non mise à jour est une infraction !"
        },
        {
          title: "Santé et éducation",
          content: "Assurez la continuité des soins et de la scolarité.",
          tips: [
            "Médecin traitant : transfert du dossier médical",
            "Pharmacie : historique et ordonnances en cours",
            "Dentiste, spécialistes : récupérez vos dossiers",
            "École des enfants : inscription et transfert de dossier",
            "Crèche, garde d'enfants : résiliation et recherche de nouveaux services",
            "Assurance maladie complémentaire : vérification du réseau de soins"
          ]
        },
        {
          title: "Impôts et finances",
          content: "Respectez vos obligations fiscales lors du changement d'adresse.",
          tips: [
            "Direction des impôts : changement d'adresse fiscale",
            "Déclaration de revenus : nouvelle adresse pour l'année suivante",
            "Taxe d'habitation : résiliation/nouvel abonnement",
            "Banque en ligne : mise à jour de l'adresse de correspondance",
            "Crédit en cours : information obligatoire de la banque",
            "Assurance-vie : mise à jour des bénéficiaires si nécessaire"
          ]
        },
        {
          title: "Délais à respecter",
          content: "Planning des démarches selon leur urgence légale.",
          tips: [
            "Immédiat : banques, assurances, employeur",
            "Dans les 8 jours : Poste Maroc pour la redirection",
            "Dans les 15 jours : services publics (préfecture)",
            "Dans les 30 jours : carte grise véhicule",
            "Avant la fin du mois : nouveaux contrats énergie",
            "Dans les 3 mois : inscription sur les listes électorales"
          ]
        }
      ],
      conclusion: "Anticiper vos démarches administratives vous évite stress et pénalités. Utilisez cette liste comme aide-mémoire et adaptez-la à votre situation personnelle."
    },
    tags: ["administration", "démarches", "changement-adresse", "délais"],
    relatedArticles: ["checklist", "budget", "international"]
  },

  "international": {
    id: "international",
    title: "Déménagement International : Guide Spécialisé",
    category: "International",
    summary: "Tout ce qu'il faut savoir pour déménager depuis ou vers l'étranger en toute sérénité.",
    readTime: "12 min",
    author: "Omar Fassi, Expert International",
    date: "3 Janvier 2024",
    content: {
      introduction: "Un déménagement international nécessite une préparation minutieuse et une connaissance des réglementations. Ce guide vous accompagne dans toutes les étapes de votre projet.",
      sections: [
        {
          title: "Planification et timing",
          content: "Un déménagement international demande plus de temps de préparation.",
          tips: [
            "Commencez vos démarches 3-4 mois à l'avance",
            "Renseignez-vous sur les réglementations du pays de destination",
            "Vérifiez la validité de vos documents d'identité",
            "Planifiez les vaccinations obligatoires si nécessaire",
            "Négociez avec votre employeur les conditions de prise en charge",
            "Recherchez un logement temporaire pour les premiers jours"
          ]
        },
        {
          title: "Formalités douanières",
          content: "Préparez soigneusement votre dossier pour éviter les problèmes en douane.",
          tips: [
            "Inventaire détaillé et valorisé de tous vos biens",
            "Justificatifs de résidence et de changement de résidence",
            "Factures d'achat pour les biens de valeur",
            "Attestation d'emploi ou de mutation",
            "Assurance transport international obligatoire",
            "Déclaration en douane à remplir avec précision"
          ],
          warning: "Certains objets sont interdits ou soumis à restrictions selon le pays !"
        },
        {
          title: "Modes de transport",
          content: "Choisissez le mode de transport adapté à votre situation.",
          tips: [
            "Transport maritime : économique pour gros volumes (4-8 semaines)",
            "Transport aérien : rapide mais cher (1-2 semaines)",
            "Transport routier : pour l'Europe, bon compromis prix/délai",
            "Groupage : partage d'un container, plus économique",
            "Transport combiné : optimisation des coûts et délais",
            "Accompagnement personnel : pour les objets très précieux"
          ]
        },
        {
          title: "Assurance et protection",
          content: "Protégez vos biens contre tous les risques du transport international.",
          tips: [
            "Assurance tous risques recommandée pour l'international",
            "Couverture vol, dommages, perte totale ou partielle",
            "Attention aux exclusions (guerre, émeute, catastrophe naturelle)",
            "Conservation de tous les justificatifs de valeur",
            "Photos de vos biens avant emballage",
            "Déclaration de sinistre dans les 48h en cas de problème"
          ]
        },
        {
          title: "Aspects fiscaux et légaux",
          content: "Comprenez les implications fiscales de votre déménagement.",
          tips: [
            "Franchise douanière selon votre statut (étudiant, salarié, retraité)",
            "TVA et droits de douane selon les pays",
            "Déclaration de changement de résidence fiscale",
            "Impact sur vos obligations de déclaration de revenus",
            "Transfert de capitaux : réglementation à respecter",
            "Convention fiscale entre pays : éviter la double imposition"
          ]
        },
        {
          title: "Adaptation dans le nouveau pays",
          content: "Préparez votre intégration administrative et sociale.",
          tips: [
            "Ouverture de compte bancaire local dès l'arrivée",
            "Inscription consulaire pour les ressortissants à l'étranger",
            "Recherche de logement définitif et signature de bail",
            "Scolarisation des enfants : équivalences et inscriptions",
            "Couverture santé : sécurité sociale locale ou assurance privée",
            "Permis de conduire : échange ou passage des épreuves"
          ]
        }
      ],
      conclusion: "Un déménagement international est un projet complexe mais réalisable avec une bonne préparation. N'hésitez pas à faire appel à des spécialistes pour vous accompagner dans cette aventure."
    },
    tags: ["international", "douane", "formalités", "transport"],
    relatedArticles: ["admin", "budget", "storage"]
  }
};

export const getArticle = (id: string): Article | null => {
  return articles[id] || null;
};

export const getRelatedArticles = (articleId: string): Article[] => {
  const article = getArticle(articleId);
  if (!article || !article.relatedArticles) return [];
  
  return article.relatedArticles
    .map(id => getArticle(id))
    .filter((article): article is Article => article !== null);
};

export const getAllArticles = (): Article[] => {
  return Object.values(articles);
};

export const getArticlesByCategory = (category: string): Article[] => {
  return Object.values(articles).filter(article => article.category === category);
};