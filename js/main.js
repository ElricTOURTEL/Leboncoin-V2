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
