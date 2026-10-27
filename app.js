const viewer = document.querySelector("#character-viewer");
const title = document.querySelector("#character-title");
const description = document.querySelector("#character-description");
const status = document.querySelector("#status-message");
const loading = document.querySelector("#viewer-loading");
const sizeRange = document.querySelector("#size-range");
const cards = [...document.querySelectorAll(".character-card")];

const characters = {
  robot: {
    title: "Friendly Robot",
    description: "A cheerful companion ready to explore your world.",
    alt: "A friendly expressive 3D robot",
    src: "https://modelviewer.dev/shared-assets/models/RobotExpressive.glb",
    scale: 1
  },
  astronaut: {
    title: "Space Explorer",
    description: "A space traveller for your next out-of-this-world photo.",
    alt: "A 3D astronaut character",
    src: "https://modelviewer.dev/shared-assets/models/Astronaut.glb",
    scale: 1.15
  },
  helmet: {
    title: "Moon Walker",
    description: "A second space-themed model to try in your room or garden.",
    alt: "A 3D moon explorer model",
    src: "https://modelviewer.dev/shared-assets/models/NeilArmstrong.glb",
    scale: 1.1
  }
};

function selectCharacter(key) {
  const character = characters[key];
  if (!character) return;
  viewer.src = character.src;
  viewer.alt = character.alt;
  title.textContent = character.title;
  description.textContent = character.description;
  sizeRange.value = String(character.scale);
  viewer.scale = `${character.scale} ${character.scale} ${character.scale}`;
  cards.forEach(card => {
    const active = card.dataset.character === key;
    card.classList.toggle("active", active);
    card.setAttribute("aria-pressed", String(active));
  });
  loading.hidden = false;
  status.textContent = `Selected ${character.title}. Rotate the model, or use “Place in my space” on a compatible Android phone.`;
}

cards.forEach(card => {
  card.addEventListener("click", () => selectCharacter(card.dataset.character));
});

sizeRange.addEventListener("input", () => {
  const size = Number(sizeRange.value);
  viewer.scale = `${size} ${size} ${size}`;
});

viewer.addEventListener("load", () => {
  loading.hidden = true;
  status.textContent = "3D model loaded. On a compatible Android phone, tap “Place in my space” to start AR.";
});
viewer.addEventListener("error", () => {
  loading.hidden = true;
  status.textContent = "The model could not load. Check your internet connection, then refresh the page.";
});

viewer.addEventListener("ar-status", (event) => {
  if (event.detail.status === "session-started") {
    status.textContent = "AR started. Move your phone slowly to scan the floor, then tap to place the character.";
  } else if (event.detail.status === "object-placed") {
    status.textContent = "Character placed! Move around it carefully to view it from different angles.";
  } else if (event.detail.status === "failed") {
    status.textContent = "AR could not start. Check device/browser compatibility and Google Play Services for AR.";
  }
});

if (!("xr" in navigator)) {
  status.textContent = "Preview mode is ready. Full in-browser WebXR AR depends on device and browser support; the AR button may use Android's supported AR viewer.";
}
