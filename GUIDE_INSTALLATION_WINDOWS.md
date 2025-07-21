# 🖥️ Guide d'Installation Windows - Mon Auxiliaire

Guide complet pour installer et lancer l'application Mon Auxiliaire sur Windows.

## 📋 Prérequis Windows

### 1. Node.js (obligatoire)
- **Téléchargement :** [nodejs.org](https://nodejs.org/)
- **Version recommandée :** 20.x LTS
- **Installation :** 
  - Téléchargez l'installateur Windows (.msi)
  - Lancez l'installateur et suivez les étapes
  - Cochez "Add to PATH" pendant l'installation
- **Vérification :**
  ```cmd
  node --version
  npm --version
  ```

### 2. Git (obligatoire)
- **Téléchargement :** [git-scm.com](https://git-scm.com/download/win)
- **Installation :** Installer avec les options par défaut
- **Vérification :**
  ```cmd
  git --version
  ```

### 3. PostgreSQL (obligatoire)
- **Téléchargement :** [postgresql.org](https://www.postgresql.org/download/windows/)
- **Version recommandée :** PostgreSQL 16
- **Installation :**
  - Téléchargez l'installateur Windows
  - Pendant l'installation, notez bien le mot de passe superutilisateur
  - Port par défaut : 5432
  - Installez pgAdmin 4 (inclus)

### 4. Éditeur de code (optionnel mais recommandé)
- **Visual Studio Code :** [code.visualstudio.com](https://code.visualstudio.com/)

## 🚀 Installation de l'Application

### Étape 1 : Télécharger le projet
```cmd
git clone [URL_DU_PROJET]
cd mon-auxiliaire-app
```

### Étape 2 : Installer les dépendances
```cmd
npm install
```
⏱️ Cette étape peut prendre 2-3 minutes.

### Étape 3 : Configurer la base de données

#### 3.1 Créer la base de données
1. **Ouvrir pgAdmin 4** (installé avec PostgreSQL)
2. **Se connecter** avec le mot de passe défini
3. **Clic droit sur "Databases" > Create > Database**
4. **Nom de la base :** `monauxiliaire_dev`
5. **Cliquer "Save"**

#### 3.2 Créer le fichier de configuration
Créez un fichier `.env` à la racine du projet :

```env
# Base de données
DATABASE_URL=postgresql://postgres:VOTRE_MOT_DE_PASSE@localhost:5432/monauxiliaire_dev

# Port de l'application
PORT=5000

# Environnement
NODE_ENV=development

# Assistant IA OpenRouter (obligatoire pour le chatbot)
OPENROUTER_API_KEY=VOTRE_CLE_OPENROUTER

# Google Analytics (optionnel)
VITE_GA_MEASUREMENT_ID=

# Session secret (générez une chaîne aléatoire)
SESSION_SECRET=mon_secret_super_securise_123456789
```

**⚠️ Important :** Remplacez `VOTRE_MOT_DE_PASSE` par le mot de passe PostgreSQL défini lors de l'installation.

#### 3.3 Obtenir la clé OpenRouter (pour l'assistant IA)
1. **Aller sur :** [openrouter.ai](https://openrouter.ai)
2. **Créer un compte** ou se connecter
3. **Aller dans "API Keys"**
4. **Créer une nouvelle clé**
5. **Copier la clé** et la mettre dans le fichier `.env`

### Étape 4 : Initialiser la base de données
```cmd
npm run db:push
```

### Étape 5 : Démarrer l'application
```cmd
npm run dev
```

✅ **Succès !** L'application est accessible sur : **http://localhost:5000**

## 🔧 Utilisation Quotidienne

### Démarrer l'application (après installation)
```cmd
cd mon-auxiliaire-app
npm run dev
```

### Arrêter l'application
- **Dans le terminal :** Appuyez sur `Ctrl + C`

### Redémarrer après modifications
L'application se recharge automatiquement lors des modifications du code.

## 🛠️ Commandes Utiles

### Développement
```cmd
npm run dev          # Démarre l'application en mode développement
npm run build        # Build pour la production
npm run start        # Démarre en mode production
```

### Base de données
```cmd
npm run db:push      # Met à jour le schéma de la base de données
```

### Vérifications
```cmd
npm run check        # Vérification TypeScript
```

## 🔍 Résolution de Problèmes

### Erreur : "node n'est pas reconnu"
**Solution :**
1. Redémarrez l'invite de commande
2. Ou redémarrez Windows
3. Vérifiez que Node.js est installé correctement

### Erreur : "Port 5000 already in use"
**Solution :**
```cmd
# Changez le port dans .env
PORT=5001
```

### Erreur : "Connection to database failed"
**Solutions :**
1. **Vérifiez PostgreSQL :** Ouvrez pgAdmin et connectez-vous
2. **Vérifiez le mot de passe** dans le fichier `.env`
3. **Vérifiez que la base existe :** `monauxiliaire_dev`

### Erreur : "OpenRouter API error: 402"
**Solutions :**
1. **Vérifiez votre clé API** OpenRouter
2. **Ajoutez du crédit** sur votre compte OpenRouter
3. **Testez la clé** sur le dashboard OpenRouter

### L'application ne se charge pas
**Solutions :**
1. **Vérifiez l'URL :** http://localhost:5000
2. **Vérifiez les logs** dans le terminal
3. **Redémarrez** l'application (`Ctrl+C` puis `npm run dev`)

## 📱 Fonctionnalités Testables

### 1. Page d'accueil
- Slider d'images automatique
- Boutons "Devis Gratuit" et téléphone

### 2. Assistant IA (chat)
- Clic sur l'icône en bas à droite
- Posez des questions sur le déménagement
- L'assistant guide vers vos services

### 3. Système de devis
- Interface en nid d'abeille
- Formulaire étape par étape

### 4. Pages de services
- Images de vos vrais camions et équipes
- Descriptions détaillées

## 📋 Liste de Vérification Post-Installation

- [ ] Node.js installé et fonctionnel
- [ ] PostgreSQL installé et base créée
- [ ] Fichier `.env` configuré correctement
- [ ] Application démarre sans erreur
- [ ] Page d'accueil accessible (http://localhost:5000)
- [ ] Assistant IA répond aux questions
- [ ] Formulaire de devis fonctionne
- [ ] Images des services s'affichent

## 🔄 Mise à Jour du Projet

Pour récupérer les dernières modifications :
```cmd
git pull origin main
npm install
npm run db:push
```

## 📞 Support Technique

**En cas de problème :**
1. **Vérifiez** ce guide étape par étape
2. **Consultez** la section résolution de problèmes
3. **Contactez** l'équipe de développement
4. **Téléphone :** 06 61 20 69 29

---

**✅ Votre application Mon Auxiliaire est maintenant prête pour Windows !**