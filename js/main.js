const query = `
  query {
  Page(page: 1, perPage: 30)
    Media(id: 1, type: ANIME) {
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
`;

// Appel API avec fetch
fetch('https://graphql.anilist.co', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  body: JSON.stringify({
    query: query
  })
})
  .then(response => response.json())
  .then(data => {
    console.log('Résultat AniList:', data.data.Media);
  })
  .catch(error => {
    console.error('Erreur AniList:', error);
  });