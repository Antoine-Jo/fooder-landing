# Fooder Landing

Site de présentation et liste d'attente de Fooder, l'application qui aide les Duos à choisir un restaurant sans révéler leurs choix individuels.

## Stack

- Next.js 16.3, App Router et React Server Components
- React 19 et TypeScript strict
- Tailwind CSS 4 pour la chaîne CSS, avec tokens et styles éditoriaux dans `globals.css`
- Supabase pour la liste d'attente
- Vercel Web Analytics
- Vitest

## Installation

Prérequis : Node.js 22 et pnpm 11.

```bash
pnpm install
cp .env.example .env.local
pnpm dev
```

Le site est disponible sur `http://localhost:3000`.

## Variables d'environnement

| Variable | Portée | Description |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Publique | URL canonique du site, sans slash final |
| `NEXT_PUBLIC_CONTACT_EMAIL` | Publique | Adresse affichée pour le contact et les demandes RGPD |
| `SUPABASE_URL` | Serveur | URL du projet Supabase Fooder |
| `SUPABASE_SERVICE_ROLE_KEY` | Serveur | Clé service role, jamais exposée au navigateur |
| `WAITLIST_RATE_LIMIT_SALT` | Serveur | Secret aléatoire d'au moins 32 caractères pour l'empreinte anti-abus |

La migration de la liste d'attente vit dans le repo de l'application, source de vérité Supabase :

`../app/supabase/migrations/20260805170000_create_waitlist_signups.sql`

## Commandes

```bash
pnpm dev
pnpm lint
pnpm typecheck
pnpm test
pnpm build
pnpm check
```

## Structure

```text
src/
  app/          routes, métadonnées et action serveur
  components/   marque, mockups et formulaire
  lib/          validation de la liste d'attente
public/         illustrations culinaires originales
```

## Mockups et droits

Les écrans représentés reprennent les parcours réels du prototype Expo : découverte, choix Duo privés, accord commun et planification. Les trois illustrations culinaires SVG ont été créées spécifiquement pour ce site et ne réutilisent aucune photographie de Google Places ou d'une banque d'images.

Avant chaque publication, vérifier que les écrans restent cohérents avec l'application et remplacer les mises en situation par des captures validées si le design mobile évolue.

## Déploiement Vercel

1. Importer le repo GitHub privé dans Vercel.
2. Configurer les cinq variables d'environnement pour Preview et Production.
3. Utiliser une base Supabase de Preview séparée si les previews doivent accepter des inscriptions.
4. Définir le domaine final dans `NEXT_PUBLIC_SITE_URL`.
5. Vérifier `/robots.txt`, `/sitemap.xml` et l'aperçu Open Graph après déploiement.

Le formulaire reste volontairement indisponible si un secret serveur manque. Aucune clé Supabase n'est utilisée dans un Client Component.
