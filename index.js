console.log("exo-7");

console.log(jsonDatas);
let translation = {
    "car": "voiture",
    "house": "maison",
    "game": "jeu",
    "videoGame": "jeu vidéo",
    "show": "spectacle"
};

for (let i = 0; i < jsonDatas.length; i++) {
    // console.log(jsonDatas[i]);
    // console.log(jsonDatas[i].type);
    let type = jsonDatas[i].type;
    jsonDatas[i].translatedType = translation[type];
}
console.log(jsonDatas);

let articlescontainer = document.getElementById("articles-container");

function displayArticles(articles) {
    articlescontainer.innerHTML = '';
    articles.forEach(function (article) {
        // Créer un élément pour chaque article
        let articleDiv = document.createElement("div");
        articleDiv.classList.add("article");

        // Ajouter un titre (nom de l'article)
        let title = document.createElement("h3");
        title.textContent = article.name;
        articleDiv.appendChild(title);

        // Ajouter un sous-titre pour le type
        let translatedType = document.createElement("p");
        translatedType.textContent = "Type: " + article.translatedType;
        articleDiv.appendChild(translatedType);

        // Ajouter la description
        let description = document.createElement("p");
        description.textContent = "Description: " + article.description;
        articleDiv.appendChild(description);

        // Ajouter le prix
        let price = document.createElement("p");
        price.textContent = "Prix: " + article.price + " €";
        articleDiv.appendChild(price);

        // Ajouter la quantité
        let quantity = document.createElement("p");
        quantity.textContent = "Quantité en stock: " + article.quantity;
        articleDiv.appendChild(quantity);

        // Ajouter l'élément article à l'élément contenant
        articlescontainer.appendChild(articleDiv);
    });
}
displayArticles(jsonDatas);
const searchInput = document.querySelector("#search");
const searchButton = document.querySelector("#searchButton");
const searchBox = document.querySelector("#check-stock");
const sortBoxAsc = document.querySelector("#sort-article");
const sortBoxDesc = document.querySelector("#sort-article-reverse");
const sortPriceAsc = document.querySelector("#sort-price");
const sortPriceDesc = document.querySelector("#sort-price-reverse");
/*searchButton.addEventListener("click", function () {
    // Récupérer le texte de la recherche
    const searchQuery = searchInput.value.toLowerCase().trim();

    // Filtrer les articles en fonction du type
    const filteredArticles = jsonDatas.filter(function (article) {
        return article.translatedType.toLowerCase().includes(searchQuery) ||
        article.price.toString().toLowerCase().includes(searchQuery) ||
        article.name.toLowerCase().includes(searchQuery);
    });

    // Afficher les articles filtrés
    displayArticles(filteredArticles);
});
const searchBox = document.querySelector("#check-stock");
searchBox.addEventListener("change", function() {
    if (this.checked) {
        const filteredArticles = jsonDatas.filter(function (article) {
            return article.quantity >0;
        });
        displayArticles(filteredArticles);
    } else {
        displayArticles(jsonDatas);
    }
}); */
function applyFilters() {
    const searchQuery = searchInput.value.toLowerCase().trim();
    const filteredArticles = jsonDatas.filter(function (article) {
        const matchesSearchQuery =
            article.translatedType.toLowerCase().includes(searchQuery) ||
            article.price.toString().toLowerCase().includes(searchQuery) ||
            article.name.toLowerCase().includes(searchQuery);

        const matchesStockFilter = searchBox.checked ? article.quantity > 0 : true;

        return matchesSearchQuery && matchesStockFilter;
    });
    displayArticles(filteredArticles);
}

sortBoxAsc.addEventListener("change", function () {
    if (this.checked) {
        const filteredArticlesAsc = [...jsonDatas].sort((a, b) => a.name.localeCompare(b.name));
        displayArticles(filteredArticlesAsc);
    }
    else {
        displayArticles(jsonDatas);
    }
});
sortBoxDesc.addEventListener("change", function () {
    if (this.checked) {
        const filteredArticlesDesc = [...jsonDatas].sort((a, b) => b.name.localeCompare(a.name));
        displayArticles(filteredArticlesDesc);
    }
    else {
        displayArticles(jsonDatas);
    }
});
sortPriceAsc.addEventListener("change", function () {
    if (this.checked) {
        const filteredPriceAsc = [...jsonDatas].sort((a, b) => a.price - b.price);
        displayArticles(filteredPriceAsc);
    }
    else {
        displayArticles(jsonDatas);
    }
});
sortPriceDesc.addEventListener("change", function () {
    if (this.checked) {
        const filteredPriceDesc = [...jsonDatas].sort((a, b) => b.price - a.price);
        displayArticles(filteredPriceDesc);
    }
    else {
        displayArticles(jsonDatas);
    }
});

let form = document.createElement("form");
form.setAttribute('method', "post");
form.setAttribute('action', "submit.php");
for (let i = 1; i < 6; i++) {
    let label = document.createElement("label");
    label.setAttribute('for', "input" + i);
    label.setAttribute('class', "form-label");
    form.appendChild(label);
    form.appendChild(document.createElement("br"));
    let input = document.createElement("input");
    input.setAttribute('id', "input" + i);
    input.setAttribute('type', "text");
    input.setAttribute('name', "username"+ i);
    input.setAttribute('placeholder', "username"+i );
    input.setAttribute('class', "form-control");
    form.appendChild(input);
    form.appendChild(document.createElement("br"));
}
form.appendChild(document.createElement("br"));
let s = document.createElement("input");
s.setAttribute('type', "submit");
s.setAttribute('value', "submit");


form.appendChild(s);
document.getElementById("formulaire").appendChild(form);


searchInput.addEventListener("input", applyFilters); //penser à changer pour searchButton "click" si je veux remettre sur le click du button
searchBox.addEventListener("change", applyFilters);