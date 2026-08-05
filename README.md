# Fooder Landing

Site de présentation et liste d'attente de Fooder, l'application qui aide les Duos à choisir un restaurant sans révéler leurs choix individuels.

## Stack

- Next.js 16.3, App Router et React Server Components
- React 19 et TypeScript strict
- Tailwind CSS 4 pour la chaîne CSS, avec tokens et styles éditoriaux dans `globals.css`
- Supabase pour la liste d'attente
- Vercel Web Analytics
- Vitest

Le thème suit la préférence système au premier chargement. Le visiteur peut
ensuite choisir le thème clair ou sombre depuis l'en-tête ; ce choix est conservé
localement dans le navigateur.

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
| `PUBLICATION_STATUS` | Serveur | `preview` bloque l'indexation et la collecte ; `public` active les garde-fous de publication |
| `LEGAL_NOTICE_READY` | Serveur | Doit être `true` uniquement après validation des mentions légales complètes |
| `WAITLIST_ENABLED` | Serveur | Doit rester `false` dans toutes les previews |
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
pnpm test:e2e
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

Les écrans Découverte et Accord sont de vraies captures du rendu Expo, générées
depuis le harness de développement documenté dans `../app/docs/MARKETING_CAPTURES.md`.
Les écrans de confidentialité et de planification restent des compositions web
fidèles aux parcours réels. Les illustrations culinaires ont été créées pour
Fooder et ne réutilisent aucune photographie Google Places ou banque d'images.

Avant chaque publication, régénérer les captures si le design mobile évolue et
vérifier que `EXPO_PUBLIC_MARKETING_CAPTURE_MODE` n'est configuré dans aucun
environnement public ou EAS.

## Déploiement Vercel

1. Importer le repo GitHub privé dans Vercel.
2. Configurer les cinq variables d'environnement pour Preview et Production.
3. Utiliser une base Supabase de Preview séparée si les previews doivent accepter des inscriptions.
4. Définir le domaine final dans `NEXT_PUBLIC_SITE_URL`.
5. Vérifier `/robots.txt`, `/sitemap.xml` et l'aperçu Open Graph après déploiement.

La procédure de passage de preview à publication est détaillée dans
[`docs/PRODUCTION_CHECKLIST.md`](docs/PRODUCTION_CHECKLIST.md), y compris la règle
Vercel WAF à configurer dans le dashboard.

Le formulaire reste volontairement indisponible dans les previews et si un secret serveur manque. Aucune clé Supabase n'est utilisée dans un Client Component. Une publication publique échoue au build si l'URL HTTPS, l'email de contact, les mentions légales ou la waitlist ne sont pas explicitement validés.
