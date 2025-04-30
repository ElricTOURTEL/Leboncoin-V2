const form = document.querySelector("#fileinfo");
const animeList = JSON.parse(localStorage.getItem("AnimeList")) || [];

form.addEventListener("submit", (event) => {
    event.preventDefault();
    const title = form.title.value.trim();
    let titleAsString = JSON.stringify(title);
    console.log(titleAsString);
    localStorage.setItem("Anime", titleAsString);
    const anime = {
        title: title,
        date: new Date().toISOString()
    };

    animeList.push(anime);

    localStorage.setItem("AnimeList", JSON.stringify(animeList));
    console.log(animeList);
    form.reset();
});

function displayNewAnime() {
    const newAnimeDiv = document.createElement('div');
    newAnimeDiv.classList.add("anime--container");

    for (let i = 0; i < localStorage.length; i++) {

        const title = document.createElement('h2');
        title.textContent = animeList.title[i];
        title.classList.add("anime--container__title");


    }
}