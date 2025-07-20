
# D3Drone - Application de Déménagement

Application web complète pour les services de déménagement au Maroc, développée avec React, TypeScript, Express et PostgreSQL.

## 🚀 Fonctionnalités

- **Devis interactif** : Système de devis personnalisé avec interface en nid d'abeille
- **Hub d'articles** : Centre de ressources avec conseils et guides de déménagement
- **Support multilingue** : Interface en français et arabe
- **Interface responsive** : Optimisée pour desktop et mobile
- **Chatbot intégré** : Assistance automatisée pour les utilisateurs
- **Système de contact** : Formulaires de contact avec validation
- **Analytics** : Intégration Google Analytics pour le suivi

## 🛠️ Stack Technique

### Frontend
- **React 18** avec TypeScript
- **Vite** pour le bundling et le développement
- **Tailwind CSS** pour le styling
- **Radix UI** pour les composants accessibles
- **Framer Motion** pour les animations
- **Wouter** pour le routing
- **React Query** pour la gestion d'état

### Backend
- **Express.js** avec TypeScript
- **Drizzle ORM** pour la base de données
- **PostgreSQL** comme base de données
- **Zod** pour la validation des données
- **Session management** avec connect-pg-simple

### Outils de développement
- **ESBuild** pour la production
- **TypeScript** pour la sécurité de types
- **Replit** pour l'hébergement et le déploiement

## 📋 Prérequis pour Windows

Avant de commencer, assurez-vous d'avoir installé :

1. **Node.js** (version 20 ou supérieure)
   - Téléchargez depuis [nodejs.org](https://nodejs.org/)
   - Vérifiez l'installation : `node --version` et `npm --version`

2. **Git** pour cloner le repository
   - Téléchargez depuis [git-scm.com](https://git-scm.com/)
   - Vérifiez l'installation : `git --version`

3. **PostgreSQL** (version 16 recommandée)
   - Téléchargez depuis [postgresql.org](https://www.postgresql.org/download/windows/)
   - Notez le mot de passe du superutilisateur durant l'installation

## 🚀 Installation et Configuration

### 1. Cloner le repository

```bash
git clone <URL_DU_REPOSITORY>
cd d3drone-app
```

### 2. Installer les dépendances

```bash
npm install
```

### 3. Configuration de la base de données

#### Créer une base de données PostgreSQL

1. Ouvrez **pgAdmin** ou utilisez la ligne de commande
2. Créez une nouvelle base de données :

```sql
CREATE DATABASE d3drone_dev;
```

#### Configurer les variables d'environnement

Créez un fichier `.env` à la racine du projet :

```env
# Base de données
DATABASE_URL=postgresql://username:password@localhost:5432/d3drone_dev

# Port de l'application
PORT=5000

# Environnement
NODE_ENV=development

# Google Analytics (optionnel)
VITE_GA_MEASUREMENT_ID=votre_measurement_id

# Session secret
SESSION_SECRET=votre_secret_session_super_securise
```

**Remplacez :**
- `username` : votre nom d'utilisateur PostgreSQL (souvent `postgres`)
- `password` : le mot de passe défini lors de l'installation
- `votre_secret_session_super_securise` : une chaîne aléatoire sécurisée

### 4. Initialiser la base de données

```bash
npm run db:push
```

Cette commande va créer les tables nécessaires dans votre base de données.

### 5. Démarrer l'application en mode développement

```bash
npm run dev
```

L'application sera accessible à l'adresse : **http://localhost:5000**

## 📁 Structure du projet

```
d3drone-app/
├── client/                 # Application React frontend
│   ├── src/
│   │   ├── components/     # Composants réutilisables
│   │   ├── pages/         # Pages de l'application
│   │   ├── hooks/         # Hooks React personnalisés
│   │   ├── lib/           # Utilitaires et configuration
│   │   └── data/          # Données statiques et articles
├── server/                # Backend Express.js
│   ├── index.ts          # Point d'entrée du serveur
│   ├── routes.ts         # Définition des routes API
│   └── storage.ts        # Configuration base de données
├── shared/               # Types et schémas partagés
└── attached_assets/      # Assets et images
```

## 🛠️ Scripts disponibles

### Développement
```bash
npm run dev          # Démarre le serveur de développement
npm run check        # Vérification TypeScript
```

### Production
```bash
npm run build        # Build pour la production
npm run start        # Démarre l'application en production
```

### Base de données
```bash
npm run db:push      # Synchronise le schéma avec la base de données
```

## 🌐 Fonctionnalités principales

### 1. Système de devis interactif
- Interface en nid d'abeille unique
- Calcul automatique des prix
- Génération de devis PDF
- Envoi par email et WhatsApp

### 2. Hub d'articles
- Articles sur les conseils de déménagement
- Système de catégories
- Navigation fluide
- Articles recommandés

### 3. Services
- Déménagement résidentiel et commercial
- Emballage professionnel
- Stockage sécurisé
- Transport international

### 4. Contact et support
- Formulaires de contact multiples
- Chatbot intégré
- Support multicanal

## 🔧 Configuration avancée

### Variables d'environnement complètes

```env
# Base de données
DATABASE_URL=postgresql://username:password@localhost:5432/d3drone_dev

# Serveur
PORT=5000
NODE_ENV=development

# Session
SESSION_SECRET=votre_secret_session_tres_securise

# Google Analytics
VITE_GA_MEASUREMENT_ID=G-XXXXXXXXXX

# Email (pour les notifications)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=votre_email@gmail.com
SMTP_PASS=votre_mot_de_passe_app

# WhatsApp Business API (optionnel)
WHATSAPP_TOKEN=votre_token_whatsapp
WHATSAPP_PHONE_ID=votre_phone_id
```

### Personnalisation des couleurs

Les couleurs de la marque sont définies dans `client/src/index.css` :

```css
:root {
  --brand-orange: #ff6b35;
  --brand-blue: #1e3a8a;
  --brand-green: #059669;
}
```

## 🚀 Déploiement sur Replit

L'application est configurée pour un déploiement facile sur Replit :

1. Les configurations sont dans `.replit`
2. Les variables d'environnement se configurent dans l'interface Replit
3. La base de données PostgreSQL est fournie automatiquement

## 🐛 Résolution de problèmes

### Erreur de connexion à la base de données

```
Error: connection to server failed
```

**Solutions :**
1. Vérifiez que PostgreSQL est démarré
2. Vérifiez l'URL de connexion dans `.env`
3. Assurez-vous que la base de données existe

### Port déjà utilisé

```
Error: listen EADDRINUSE :::5000
```

**Solutions :**
1. Changez le port dans `.env` : `PORT=5001`
2. Ou tuez le processus utilisant le port 5000

### Erreurs de dépendances

```
npm ERR! peer dep missing
```

**Solution :**
```bash
rm -rf node_modules package-lock.json
npm install
```

## 📝 Développement

### Ajouter une nouvelle page

1. Créez le fichier dans `client/src/pages/`
2. Ajoutez la route dans `client/src/App.tsx`
3. Mettez à jour la navigation dans `client/src/components/Header.tsx`

### Ajouter un nouvel article

1. Ajoutez les données dans `client/src/data/articles.ts`
2. L'article apparaîtra automatiquement dans le hub

### Modifier les styles

- Classes Tailwind dans les composants
- Variables CSS globales dans `client/src/index.css`
- Configuration Tailwind dans `tailwind.config.ts`

## 🤝 Contribution

1. Forkez le projet
2. Créez une branche pour votre fonctionnalité
3. Committez vos changements
4. Pushez vers la branche
5. Ouvrez une Pull Request

## 📞 Support

Pour toute question ou problème :
- Email : support@d3drone.com
- Documentation : Consultez ce README
- Issues : Créez un ticket dans le repository

## 📄 Licence

Ce projet est sous licence MIT. Voir le fichier LICENSE pour plus de détails.

---

**Développé avec ❤️ par l'équipe D3Drone**
