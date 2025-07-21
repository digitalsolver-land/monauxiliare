# Guide d'Installation et de Déploiement - Mon Auxiliaire
## Installation sous Windows

### Prérequis

1. **Node.js** (version 18 ou supérieure)
   - Téléchargez depuis [nodejs.org](https://nodejs.org/)
   - Choisissez la version LTS (Long Term Support)
   - Vérifiez l'installation : ouvrez l'Invite de commande et tapez :
     ```
     node --version
     npm --version
     ```

2. **Git** (optionnel mais recommandé)
   - Téléchargez depuis [git-scm.com](https://git-scm.com/)
   - Utilisez les paramètres par défaut lors de l'installation

3. **Un éditeur de code**
   - Visual Studio Code (recommandé) : [code.visualstudio.com](https://code.visualstudio.com/)

### Étapes d'Installation

#### 1. Récupération du Projet
Si vous avez Git installé :
```bash
git clone [URL_DU_PROJET]
cd mon-auxiliaire
```

Sinon, téléchargez le projet en tant qu'archive ZIP et extrayez-le.

#### 2. Installation des Dépendances
Ouvrez l'Invite de commande (cmd) ou PowerShell dans le dossier du projet :

```bash
npm install
```

Cette commande peut prendre quelques minutes pour télécharger toutes les dépendances.

#### 3. Configuration de la Base de Données (Optionnel)
Pour utiliser une base de données PostgreSQL :

1. **Installer PostgreSQL** :
   - Téléchargez depuis [postgresql.org](https://www.postgresql.org/download/windows/)
   - Notez le mot de passe que vous définissez pour l'utilisateur `postgres`

2. **Créer une base de données** :
   - Ouvrez pgAdmin (installé avec PostgreSQL)
   - Créez une nouvelle base de données nommée `monauxiliaire`

3. **Configurer les variables d'environnement** :
   - Créez un fichier `.env` à la racine du projet :
   ```
   DATABASE_URL=postgresql://postgres:VOTRE_MOT_DE_PASSE@localhost:5432/monauxiliaire
   VITE_GA_MEASUREMENT_ID=votre_id_google_analytics
   ```

#### 4. Lancement en Mode Développement

```bash
npm run dev
```

L'application sera accessible à l'adresse : `http://localhost:5000`

### Construction pour Production

#### 1. Construction du Projet
```bash
npm run build
```

#### 2. Lancement en Production
```bash
npm start
```

### Déploiement

#### Option 1 : Déploiement Local (Windows Server/IIS)

1. **Installer IIS** :
   - Panneau de configuration → Programmes → Activer/Désactiver des fonctionnalités Windows
   - Cocher "Services Internet (IIS)"

2. **Installer iisnode** :
   - Téléchargez iisnode depuis [github.com/tjanczuk/iisnode](https://github.com/tjanczuk/iisnode)
   - Installez le package approprié pour votre version de Windows

3. **Configuration IIS** :
   - Copiez le dossier du projet dans `C:\inetpub\wwwroot\monauxiliaire`
   - Créez un site web dans IIS Manager
   - Pointez vers le dossier du projet

4. **Fichier web.config** :
   Créez un fichier `web.config` à la racine :
   ```xml
   <?xml version="1.0" encoding="utf-8"?>
   <configuration>
     <system.webServer>
       <handlers>
         <add name="iisnode" path="server/index.js" verb="*" modules="iisnode"/>
       </handlers>
       <rewrite>
         <rules>
           <rule name="NodeInspector" patternSyntax="ECMAScript" stopProcessing="true">
             <match url="^server\/index.js\/debug[\/]?" />
           </rule>
           <rule name="StaticContent">
             <action type="Rewrite" url="public{REQUEST_URI}"/>
           </rule>
           <rule name="DynamicContent">
             <conditions>
               <add input="{REQUEST_FILENAME}" matchType="IsFile" negate="True"/>
             </conditions>
             <action type="Rewrite" url="server/index.js"/>
           </rule>
         </rules>
       </rewrite>
     </system.webServer>
   </configuration>
   ```

#### Option 2 : Déploiement Cloud (Recommandé)

**Netlify (pour le frontend uniquement)** :
1. Connectez votre repository GitHub à Netlify
2. Configuration de build :
   - Build command : `npm run build`
   - Publish directory : `dist/public`

**Heroku (application complète)** :
1. Installez Heroku CLI
2. Créez une nouvelle application :
   ```bash
   heroku create mon-auxiliaire-app
   ```
3. Ajoutez la base de données PostgreSQL :
   ```bash
   heroku addons:create heroku-postgresql:hobby-dev
   ```
4. Déployez :
   ```bash
   git push heroku main
   ```

**Vercel (application complète)** :
1. Installez Vercel CLI : `npm i -g vercel`
2. Dans le dossier du projet : `vercel`
3. Suivez les instructions

#### Option 3 : VPS/Serveur Dédié

1. **Installer Node.js** sur le serveur
2. **Cloner le projet** :
   ```bash
   git clone [URL_DU_PROJET]
   cd mon-auxiliaire
   npm install
   npm run build
   ```

3. **Installer PM2** (gestionnaire de processus) :
   ```bash
   npm install -g pm2
   pm2 start server/index.js --name "mon-auxiliaire"
   pm2 save
   pm2 startup
   ```

4. **Configurer Nginx** (proxy inverse) :
   ```nginx
   server {
       listen 80;
       server_name votre-domaine.com;
       
       location / {
           proxy_pass http://localhost:5000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```

### Structure du Projet

```
mon-auxiliaire/
├── client/                 # Frontend React
│   ├── src/
│   │   ├── components/     # Composants réutilisables
│   │   ├── pages/         # Pages de l'application
│   │   ├── hooks/         # Hooks personnalisés
│   │   ├── lib/           # Utilitaires
│   │   └── data/          # Données statiques
├── server/                # Backend Express
│   ├── index.ts           # Point d'entrée du serveur
│   ├── routes.ts          # Routes API
│   ├── storage.ts         # Interface de stockage
│   └── vite.ts            # Configuration Vite
├── shared/                # Code partagé
│   └── schema.ts          # Schémas de données
└── attached_assets/       # Assets statiques
```

### Scripts Disponibles

- `npm run dev` : Lance en mode développement
- `npm run build` : Construction pour production
- `npm start` : Lance en mode production
- `npm run db:push` : Synchronise le schéma de base de données
- `npm run db:studio` : Ouvre l'interface de gestion DB

### Troubleshooting

#### Problème : "npm install" échoue
**Solution** :
```bash
npm cache clean --force
npm install
```

#### Problème : Port 5000 déjà utilisé
**Solution** : Modifiez le port dans `server/index.ts` :
```typescript
const port = process.env.PORT || 3000;
```

#### Problème : Base de données inaccessible
**Vérifications** :
1. PostgreSQL est-il en cours d'exécution ?
2. Les identifiants dans `.env` sont-ils corrects ?
3. Le firewall bloque-t-il la connexion ?

#### Problème : Site ne se charge pas après déploiement
**Vérifications** :
1. Les variables d'environnement sont-elles définies ?
2. Les dépendances sont-elles installées ?
3. Le processus Node.js est-il en cours d'exécution ?

### Contact Support

Pour toute question technique :
- Email : support@mon-auxiliaire.com
- Téléphone : 06 61 20 69 29

### Mises à Jour

Pour mettre à jour l'application :
1. Récupérez les dernières modifications
2. Réinstallez les dépendances si nécessaire
3. Reconstruisez le projet
4. Redémarrez l'application

```bash
git pull origin main
npm install
npm run build
pm2 restart mon-auxiliaire  # Si vous utilisez PM2
```