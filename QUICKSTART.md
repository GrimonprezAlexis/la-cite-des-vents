# Guide de démarrage rapide - Gestion de menus

## Installation et configuration

### 1. Installer les dépendances (déjà fait)

```bash
npm install
```

Les dépendances suivantes ont été ajoutées :
- `@aws-sdk/client-s3`
- `@aws-sdk/s3-request-presigner`
- `firebase`

### 2. Configurer les variables d'environnement

Éditez le fichier `.env` et remplissez les valeurs suivantes :

#### AWS S3
```bash
# Client-side (pour l'upload direct depuis le navigateur)
NEXT_PUBLIC_AWS_REGION=eu-west-1
NEXT_PUBLIC_AWS_ACCESS_KEY_ID=AKIAXXXXXXXXXXXXXXXX
NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
NEXT_PUBLIC_AWS_S3_BUCKET=votre-bucket-name

# Server-side (pour les URLs signées)
AWS_REGION=eu-west-1
AWS_ACCESS_KEY_ID=AKIAXXXXXXXXXXXXXXXX
AWS_SECRET_ACCESS_KEY=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
AWS_S3_BUCKET=votre-bucket-name
```

#### Firebase
```bash
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=votre-projet.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=votre-projet-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=votre-projet.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789012
NEXT_PUBLIC_FIREBASE_APP_ID=1:123456789012:web:xxxxxxxxxxxxxxxxxx
```

### 3. Démarrer le serveur de développement

```bash
npm run dev
```

L'application sera accessible sur http://localhost:3000

### 4. Accéder à l'interface d'administration

Allez sur : http://localhost:3000/admin/menu

## Commandes utiles

```bash
# Développement
npm run dev

# Build de production
npm run build

# Démarrer en production
npm run start

# Vérification TypeScript
npm run typecheck

# Linting
npm run lint
```

## Utilisation rapide

### Ajouter un menu

1. Cliquez sur "Ajouter un menu"
2. Entrez un titre (ex: "Menu du jour")
3. Optionnel : ajoutez une description
4. Sélectionnez un fichier PDF ou une image (max 10 MB)
5. Cliquez sur "Télécharger"

### Prévisualiser un menu

1. Cliquez sur le bouton "Voir" d'un menu
2. Une modale s'ouvre avec la prévisualisation
3. L'URL signée est valide 60 secondes

### Supprimer un menu

1. Cliquez sur l'icône poubelle
2. Confirmez la suppression
3. Le fichier est supprimé de S3 et les métadonnées de Firestore

## Structure des fichiers

```
la-cite-des-vents/
├── lib/
│   ├── aws-s3.ts           # Utilitaires S3
│   └── firebase.ts         # Configuration Firebase
├── pages/
│   └── api/
│       └── get-menu-url.ts # API pour URLs signées
├── app/
│   └── admin/
│       └── menu/
│           └── page.tsx    # Interface admin
├── .env                    # Variables d'environnement
├── MENU_SETUP.md          # Documentation complète
├── IMPLEMENTATION_SUMMARY.md # Résumé de l'implémentation
└── QUICKSTART.md          # Ce fichier
```

## Dépannage rapide

### Le build échoue
```bash
npm run typecheck
```
Vérifiez les erreurs TypeScript

### L'upload ne fonctionne pas
- Vérifiez les variables d'environnement AWS dans `.env`
- Vérifiez que le bucket S3 existe et que CORS est configuré
- Vérifiez les permissions IAM de l'utilisateur AWS

### Les métadonnées ne se sauvegardent pas
- Vérifiez les variables d'environnement Firebase dans `.env`
- Vérifiez que Firestore est activé dans votre projet Firebase
- Vérifiez les règles de sécurité Firestore

### Les URLs signées ne fonctionnent pas
- Vérifiez les variables `AWS_*` (sans `NEXT_PUBLIC_`) dans `.env`
- Les URLs sont valides 60 secondes, régénérez-les si nécessaire

## Documentation complète

Pour plus de détails, consultez :
- `MENU_SETUP.md` - Configuration détaillée AWS et Firebase
- `IMPLEMENTATION_SUMMARY.md` - Résumé technique de l'implémentation

## Support

Pour toute question sur l'implémentation, référez-vous aux fichiers de documentation ou contactez le développeur.
