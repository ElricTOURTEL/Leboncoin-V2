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
controlsDiv.id="container--control";
controlsDiv.appendChild(pageSelector);
controlsDiv.appendChild(loadButton);
document.querySelector('.container--search').append(controlsDiv);


loadButton.addEventListener('click', () => {
  const page = parseInt(pageSelector.value);
  let animeDiv = document.getElementById('container--anime');
  animeDiv = document.getElementById('container--anime');
  animeDiv.innerHTML="";
  if (page > 0) {
    fetchPage(page);
  } else {
    alert("Numéro de page invalide");
  }
});

