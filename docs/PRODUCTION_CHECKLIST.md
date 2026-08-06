# Checklist de publication

La landing reste en preview tant que chaque point de cette liste n'est pas validé.

## Identité et conformité

- [ ] Domaine Fooder acquis et connecté à Vercel.
- [ ] Adresse `contact@<domaine>` créée et testée.
- [ ] Identité et adresse postale de l'éditeur publiées.
- [ ] Directeur de publication confirmé.
- [ ] Adresse légale et région d'exécution Vercel publiées.
- [ ] Région Supabase et garanties de transfert publiées.
- [ ] Canal de retrait de la waitlist testé.
- [ ] `LEGAL_NOTICE_READY=true` validé par l'éditeur.

## Environnements

- [ ] Preview : `PUBLICATION_STATUS=preview`.
- [ ] Preview : `WAITLIST_ENABLED=false`.
- [ ] Preview protégée par Vercel Authentication.
- [ ] Preview vérifiée en `noindex, nofollow`.
- [ ] Production : `NEXT_PUBLIC_SITE_URL` utilise HTTPS.
- [ ] Production : tous les secrets serveur sont configurés.
- [ ] Aucun secret n'est disponible dans un Client Component.

## Vercel WAF

La documentation officielle Vercel du 16 juin 2026 confirme que le rate limiting
Fixed Window est disponible sur tous les plans, avec une règle sur le plan Hobby.

Configurer dans **Project > Firewall > Configure** :

1. Créer une règle `Waitlist submissions`.
2. Conditions : méthode `POST` et chemin `/`.
3. Commencer avec l'action `Log` et vérifier qu'elle cible uniquement la Server Action.
4. Passer ensuite à `Rate Limit` par adresse IP.
5. Fenêtre : 10 minutes ; limite initiale : 10 requêtes.
6. Action : réponse `429`.
7. Publier la règle uniquement après vérification dans l'overview Firewall.

Les compteurs WAF sont régionaux. Le contrôle SQL reste donc obligatoire.

## Données

- [ ] Migration waitlist présente sur `main` dans le repo Expo.
- [ ] Migration appliquée au projet Supabase Cloud lié.
- [ ] RPC exécutable uniquement par `service_role`.
- [ ] Inscription réelle, doublon et rate limit testés.
- [ ] Alertes Vercel activées pour les erreurs de fonction.
- [ ] Aucune adresse email n'apparaît dans les logs.

## Recette

- [ ] `pnpm check` réussi.
- [ ] CI GitHub réussie.
- [ ] Lighthouse exécuté sur le domaine final.
- [ ] Thèmes clair et sombre vérifiés.
- [ ] Largeurs 320, 375, 430, 768, 1024 et 1440 px vérifiées.
- [ ] Open Graph, `robots.txt` et `sitemap.xml` vérifiés.
- [ ] Les captures ne contiennent aucune donnée réelle ou image Google Places.

## Activation

Après seulement :

```text
PUBLICATION_STATUS=public
LEGAL_NOTICE_READY=true
WAITLIST_ENABLED=true
```
