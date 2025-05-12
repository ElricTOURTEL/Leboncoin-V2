function fetchPage(page) {
  const query = `
  query ($page: Int, $perPage: Int) {
    Page(page: $page, perPage: $perPage) {
      media(type: ANIME) {
        id
        title {
          romaji
          english
          native
        }
        episodes
        genres
        averageScore
        coverImage {
          large
        }
      }
    }
  }
`;


  const variables = {
    page: page,
    perPage: 20
  };

  fetch('https://graphql.anilist.co', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: JSON.stringify({
      query: query,
      variables: variables
    })
  })
    .then(response => response.json())
    .then(data => {
      if (data.errors) {
        console.error('Erreur GraphQL:', data.errors);
        document.body.innerHTML = "<h2>Erreur de chargement.</h2>";
      } else if (data.data) {
        displayAnime(data.data.Page.media); // On passe la liste des animes à la fonction
      }
    })
    .catch(error => {
      console.error('Erreur Fetch:', error);
      document.body.innerHTML = "<h2>Erreur de chargement.</h2>";
    });
}



function changedisplayAnime() {
  const btnGrid = document.getElementById('container--button__grid');
  const btnList = document.getElementById('container--button__list');
  const animeDiv = document.getElementById('container--anime');
  if (!animeDiv){
      console.log("container--anime introuvable");
  }
  btnGrid.addEventListener('click', () => {
    animeDiv.classList.remove("anime--container__list");
    animeDiv.classList.add("anime--container__grid");
    console.log("ajout de grid");
  });
  btnList.addEventListener("click", () => {
    animeDiv.classList.remove("anime--container__grid");
    animeDiv.classList.add("anime--container__list");
    console.log("ajout de list");
  });
}

function displayAnime(animes) {
  const oldContainer = document.querySelector('.anime--container');
  let animeDiv = document.getElementById('container--anime');
  if(oldContainer) oldContainer.remove();
  console.log('Résultat AniList:', animes);
  if(!animeDiv){
    animeDiv = document.createElement('div');
    animeDiv.classList.add("anime--container__grid");
    animeDiv.id="container--anime";
    document.body.appendChild(animeDiv);
  } else{
    animeDiv.innerHTML="";
  }
 


  animes.forEach(anime => {
    const animeCard = document.createElement('div');
    animeCard.classList.add("anime--container__card");
    const title = document.createElement('h2');
    title.textContent = anime.title.english || anime.title.romaji;
    title.classList.add("anime--container__title");

    const img = document.createElement('img');
    img.src = anime.coverImage.large;
    img.classList.add("anime--container__image");


    animeDiv.appendChild(animeCard);
    animeCard.appendChild(title);
    animeCard.appendChild(img);
  });
  changedisplayAnime();

}
fetchPage(1);






//tentative de pull request 