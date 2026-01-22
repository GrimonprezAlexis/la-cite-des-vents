# Configuration du système de gestion de menus

Ce système utilise **AWS S3** pour le stockage des fichiers et **Firebase Firestore** pour les métadonnées.

## Prérequis

1. Un compte AWS avec un bucket S3 configuré
2. Un projet Firebase avec Firestore activé

## Installation des dépendances

Les dépendances nécessaires sont déjà installées :
- `@aws-sdk/client-s3`
- `@aws-sdk/s3-request-presigner`
- `firebase`

## Configuration AWS S3

### 1. Créer un bucket S3

1. Connectez-vous à la console AWS
2. Allez dans S3 et créez un nouveau bucket
3. Configurez les permissions CORS du bucket :

```json
[
  {
    "AllowedHeaders": ["*"],
    "AllowedMethods": ["GET", "PUT", "POST", "DELETE"],
    "AllowedOrigins": ["*"],
    "ExposeHeaders": []
  }
]
```

### 2. Créer un utilisateur IAM

1. Allez dans IAM > Users
2. Créez un nouvel utilisateur avec accès programmatique
3. Attachez la politique suivante :

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "s3:PutObject",
        "s3:GetObject",
        "s3:DeleteObject",
        "s3:ListBucket"
      ],
      "Resource": [
        "arn:aws:s3:::your-bucket-name/*",
        "arn:aws:s3:::your-bucket-name"
      ]
    }
  ]
}
```

4. Notez l'Access Key ID et le Secret Access Key

## Configuration Firebase

### 1. Créer un projet Firebase

1. Allez sur [Firebase Console](https://console.firebase.google.com/)
2. Créez un nouveau projet
3. Activez Firestore Database

### 2. Créer la collection Firestore

La collection `menu_items` sera créée automatiquement lors du premier upload.

Structure d'un document :
```javascript
{
  title: string,
  description: string,
  file_url: string,
  file_type: string,
  file_name: string,
  storage_path: string,
  display_order: number,
  created_at: string
}
```

### 3. Configurer les règles de sécurité Firestore

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /menu_items/{document=**} {
      allow read: if true;
      allow write: if request.auth != null; // ou ajustez selon vos besoins d'authentification
    }
  }
}
```

### 4. Obtenir les clés Firebase

1. Dans Firebase Console, allez dans Project Settings
2. Dans l'onglet General, trouvez "Your apps"
3. Cliquez sur l'icône web (</>)
4. Copiez la configuration Firebase

## Variables d'environnement

Copiez `.env.example` vers `.env` et remplissez les valeurs :

```bash
# AWS S3 Configuration (client-side)
NEXT_PUBLIC_AWS_REGION=eu-west-1
NEXT_PUBLIC_AWS_ACCESS_KEY_ID=your-aws-access-key-id
NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY=your-aws-secret-access-key
NEXT_PUBLIC_AWS_S3_BUCKET=your-s3-bucket-name

# AWS S3 Configuration (server-side for signed URLs)
AWS_REGION=eu-west-1
AWS_ACCESS_KEY_ID=your-aws-access-key-id
AWS_SECRET_ACCESS_KEY=your-aws-secret-access-key
AWS_S3_BUCKET=your-s3-bucket-name

# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=your-firebase-api-key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project-id.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project-id.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your-messaging-sender-id
NEXT_PUBLIC_FIREBASE_APP_ID=your-app-id
```

**Note importante** : Les variables avec `NEXT_PUBLIC_` sont exposées côté client. Les autres sont seulement disponibles côté serveur (API routes).

## Architecture

### Fichiers créés

1. **`lib/aws-s3.ts`** - Fonctions utilitaires pour uploader et supprimer des fichiers sur S3
2. **`lib/firebase.ts`** - Configuration Firebase et export de l'instance Firestore
3. **`pages/api/get-menu-url.ts`** - API route pour générer des URLs signées sécurisées
4. **`app/admin/menu/page.tsx`** - Interface d'administration pour gérer les menus

### Flux de données

#### Upload d'un menu
1. L'utilisateur sélectionne un fichier dans l'interface admin
2. Le fichier est uploadé directement vers S3 via `uploadFileToS3()`
3. L'URL publique du fichier est retournée
4. Les métadonnées sont sauvegardées dans Firestore

#### Consultation d'un menu
1. L'utilisateur clique sur "Voir" dans l'interface admin
2. Une requête est envoyée à `/api/get-menu-url` avec le `storage_path`
3. L'API génère une URL signée valide 60 secondes
4. Le menu s'affiche dans une modale de prévisualisation

#### Suppression d'un menu
1. L'utilisateur clique sur le bouton de suppression
2. Le fichier est supprimé de S3 via `deleteFileFromS3()`
3. Le document Firestore est supprimé

## Sécurité

⚠️ **Important** : Les clés AWS sont exposées côté client pour permettre l'upload direct. Pour une meilleure sécurité en production :

1. **Option recommandée** : Créer une API route Next.js qui gère l'upload côté serveur
2. Utiliser des signed URLs pour l'upload (pre-signed PUT URLs)
3. Implémenter une authentification Firebase côté client
4. Restreindre les permissions IAM au strict minimum
5. Ajouter une validation côté serveur

## Utilisation

1. Accédez à `/admin/menu`
2. Cliquez sur "Ajouter un menu"
3. Remplissez le titre, la description (optionnel) et sélectionnez un fichier
4. Le fichier sera uploadé sur S3 et les métadonnées sauvegardées dans Firestore
5. Pour voir un menu, cliquez sur "Voir"
6. Pour supprimer un menu, cliquez sur l'icône poubelle

## Types de fichiers supportés

- PDF (application/pdf)
- Images (image/*)

Limite de taille : 10 MB

## Dépannage

### Erreur CORS
Si vous obtenez des erreurs CORS, vérifiez la configuration CORS de votre bucket S3.

### Erreur d'authentification AWS
Vérifiez que vos clés AWS sont correctes et que l'utilisateur IAM a les bonnes permissions.

### Erreur Firebase
Vérifiez que votre configuration Firebase est correcte et que Firestore est activé.

### URL signée expirée
Les URLs signées sont valides 60 secondes. Si vous obtenez une erreur d'accès, régénérez l'URL en cliquant à nouveau sur "Voir".
