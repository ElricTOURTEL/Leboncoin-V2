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



function fetchPage(pageNumber) {
  const variables = {
    page: pageNumber,
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

const pageSelector = document.createElement('input');
pageSelector.type = 'number';
pageSelector.min = 1;
pageSelector.placeholder = 'Numéro de page';
pageSelector.style.margin = '2em';
pageSelector.style.padding = '0.5em';
pageSelector.style.fontSize = '1em';

const loadButton = document.createElement('button');
loadButton.textContent = 'Charger';
loadButton.style.padding = '0.5em 1em';
loadButton.style.fontSize = '1em';
loadButton.style.marginLeft = '1em';

// Ajout au body
const controlsDiv = document.createElement('div');
controlsDiv.style.textAlign = 'center';
controlsDiv.appendChild(pageSelector);
controlsDiv.appendChild(loadButton);
document.body.prepend(controlsDiv);

function displayAnime(animes) {
  let animeDiv = document.querySelector(".anime--container");

  if (animeDiv) {
    animeDiv.innerHTML = '';
  }
  else {
    animeDiv = document.createElement('div');
    animeDiv.classList.add("anime--container");
    document.body.appendChild(animeDiv);
  }

  console.log('Résultat AniList:', animes);

  animes.forEach(anime => {
    const animeCard = document.createElement('div');
    animeCard.classList.add("anime--container__card");

    const title = document.createElement('h2');
    title.textContent = anime.title.english || anime.title.romaji;
    title.classList.add("anime--container__title");

    const img = document.createElement('img');
    img.src = anime.coverImage.large;
    img.classList.add("anime--container__image");



    animeCard.appendChild(title);
    animeCard.appendChild(img);
    animeDiv.appendChild(animeCard);
  });
}

loadButton.addEventListener('click', () => {
  const page = parseInt(pageSelector.value);
  if (page > 0) {
    fetchPage(page);
  } else {
    alert("Numéro de page invalide");
  }
});

fetchPage(1);

/* async function fetchPageAnimes(page=1, perPage=20){
  try{
    const response = await fetch('https://graphql.anilist.co', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        query: `
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
        `,
        variables: { page, perPage }
      })
    });
  }
}*/
