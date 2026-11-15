# ActInData — site vitrine

Site statique (HTML / CSS / JavaScript, sans dépendance ni build) pour ActInData, cabinet de conseil et de services Data & IA.

## Structure

```
actindata/
├── index.html              # Page d'accueil (one-page)
├── mentions-legales.html   # Mentions légales & confidentialité (à compléter)
└── assets/
    ├── css/style.css
    ├── js/main.js
    └── img/logo.svg
```

## Sections de la page d'accueil

Accueil (hero animé) · Pourquoi ActInData · Expertises (6 pôles) · Méthode en 4 étapes ·
Cas d'usage (onglets) · Secteurs · Technologies · Formations (ActInData Academy) ·
À propos · Bandeau d'appel à l'action · Contact · Pied de page

## Voir le site en local

Ouvrir `index.html` dans un navigateur, ou lancer :

```bash
cd actindata && python3 -m http.server 8000
# puis http://localhost:8000
```

## À personnaliser avant mise en ligne

- **E-mail / téléphone / LinkedIn** : `contact@actindata.com`, `+33 0 00 00 00 00` et le lien LinkedIn sont des valeurs provisoires (`index.html`, section Contact, et `assets/js/main.js`).
- **Formulaire** : sans serveur, il ouvre la messagerie de l'internaute avec le message pré-rempli. Pour un envoi direct, brancher un service comme Formspree ou Netlify Forms.
- **Mentions légales** : compléter les champs entre crochets une fois la société immatriculée.
- **Références clients / témoignages** : à ajouter quand vous aurez vos premières missions.

## Mise en ligne

Hébergement gratuit possible sur GitHub Pages, Netlify ou Vercel (déposer simplement le dossier `actindata/`).
