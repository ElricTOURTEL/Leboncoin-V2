const query = `
  query {
    Page(page: 1, perPage: 20) {
      media(type: ANIME) {
        id
        title {
          romaji
          english
          native
        }
        description
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

// Appel API avec fetch
fetch('https://graphql.anilist.co', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
    body: JSON.stringify({ query })
})
    .then(response => response.json())
    .then(data => {
        if (data.errors) {
            console.error('Erreur GraphQL:', data.errors);
            document.body.innerHTML = "<h2>Erreur de chargement.</h2>";
        } else if (data.data) {
            const animes = data.data.Page.media;
            console.log('Résultat AniList:', data.data.Page.media); // ici on va dans Page > media
            animes.forEach(anime => {
                const animeDiv = document.createElement('div');

                const title = document.createElement('h2');
                title.textContent = anime.title.english || anime.title.romaji;
                title.classList.add("anime-title");

                const img = document.createElement('img');
                img.src = anime.coverImage.large;
                img.classList.add("img-anime");

                const description = document.createElement('p');
                description.textContent = anime.description ? anime.description.substring(0, 200) + '...' : 'Pas de description disponible.';
                description.classList.add("")

                animeDiv.appendChild(title);
                animeDiv.appendChild(img);
                animeDiv.appendChild(description);

                document.body.appendChild(animeDiv);
            });
        }
    })







































    .catch(error => {
        console.error('Erreur AniList:', error);
    });
