# Convention CSS : Utilisation de BEM

## Qu'est-ce que BEM ?

BEM (Block, Element, Modifier) est une méthode de nommage CSS qui permet d’écrire un code clair, maintenable et évolutif. Elle sépare la structure en trois parties :

- **Block** : Composant principal autonome.
- **Element** : Partie d’un bloc, qui dépend de lui.
- **Modifier** : Variante ou état différent d’un bloc ou élément.

---

## Syntaxe

- `block`
- `block__element`
- `block--modifier`
- `block__element--modifier`

---

## Règles de base

- Utiliser des **minuscules** uniquement.
- Utiliser `__` pour relier un **élément** à un **bloc**.
- Utiliser `--` pour ajouter un **modificateur** à un **bloc** ou un **élément**.
- Éviter l'imbrication CSS excessive ; préférez la structure BEM pour exprimer les relations.

---

## Exemple simple

HTML :
```html
<section class="card">
  <h2 class="card__title">Titre</h2>
  <p class="card__content">Contenu de la carte</p>
  <button class="card__button card__button--primary">Action</button>
</section>
