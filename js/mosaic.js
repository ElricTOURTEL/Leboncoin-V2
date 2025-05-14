const fileInput = document.getElementById("fileInput");
const preview = document.getElementById("preview");

fileInput.addEventListener("change", () => {
  const file = fileInput.files[0];
  if (!file) return;

  const fileURL = URL.createObjectURL(file);

  const wrapper = document.createElement("div");
  wrapper.classList.add("image-wrapper");

  const img = document.createElement("img");
  img.src = fileURL;
  img.alt = file.name;
  img.classList.add("image-preview");

  const delet = document.createElement("p");
  delet.classList.add("delete-text");
  delet.textContent = "Supprimer";

  delet.addEventListener("click", () => {
    preview.innerHTML = ''; // Supprimer l’image
    fileInput.value = '';   // Réinitialiser le champ fichier
  });

  wrapper.appendChild(delet);
  wrapper.appendChild(img);
  preview.appendChild(wrapper);
});