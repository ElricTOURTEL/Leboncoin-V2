const fileInput = document.getElementById("fileInput");
const preview = document.getElementById("preview");

fileInput.addEventListener("change", () => {
  const file = fileInput.files[0];
  if (!file) return;

  // Créer une URL temporaire pour le fichier
  const fileURL = URL.createObjectURL(file);

  // Effacer l'aperçu précédent
  preview.innerHTML = '';

  // Créer un élément pour afficher le fichier (ici image)
  const img = document.createElement("img");
  img.classList.add('anime--container__image');
  img.src = fileURL;
  img.style.maxWidth = "100%";
  img.alt = file.name;

  preview.appendChild(img);
});