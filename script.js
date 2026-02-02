// Espera a que el DOM esté completamente cargado antes de ejecutar el código
document.addEventListener("DOMContentLoaded", () => {

  // Obtiene referencias a los elementos del DOM
  const infoBtn = document.getElementById("infoBtn");
  const extraInfo = document.getElementById("extraInfo");
  const modeBtn = document.getElementById("modeBtn");

  // Agrega un evento de clic al botón de información para mostrar/ocultar la sección extra
  infoBtn.addEventListener("click", () => {
    extraInfo.style.display =
      extraInfo.style.display === "none" ? "block" : "none";
  });

  // Agrega un evento de clic al botón de modo para alternar entre modo claro y oscuro
  modeBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
  });

  // Agrega un evento de clic a cada tarjeta para voltearla (efecto 3D)
  document.querySelectorAll(".card").forEach(card => {
    card.addEventListener("click", () => {
      card.classList.toggle("flipped");
    });
  });

});

// (Admin functions moved to admin.js)

// Función para renderizar las tarjetas públicas en index.html
function renderPublicCards() {
  const container = document.getElementById("cards");
  if (!container) return;

  container.innerHTML = "";

  // Obtiene las tarjetas y las renderiza con estructura de frente y reverso
  getCards().forEach(card => {
    container.innerHTML += `
      <div class="card">
        <div class="front">
          <img src="${card.image}">
          <p class="press-text">👉 Presiona la imagen</p>
        </div>
        <div class="back">
          <p>
            Material: ${card.material}<br>
            Longitud: ${card.length}<br>
            Precio: ${card.price}
          </p>
        </div>
      </div>
    `;
  });
}

// Evento para renderizar tarjetas públicas al cargar el DOM
document.addEventListener("DOMContentLoaded", renderPublicCards);

// Evento adicional para manejar el flip de tarjetas en index.html
document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("cards");
  if (!container) return;

  const cards = JSON.parse(localStorage.getItem("cards")) || [];

  cards.forEach(card => {
    const div = document.createElement("div");
    div.className = "card";

    div.innerHTML = `
      <div class="front">
        <img src="${card.image}">
        <p class="press-text">👉 Presiona la imagen</p>
      </div>
      <div class="back">
        <p>
          Material: ${card.material}<br>
          Longitud: ${card.length}<br>
          Precio: ${card.price}
        </p>
      </div>
    `;

    // Agrega evento de clic para el efecto flip
    div.addEventListener("click", () => {
      div.classList.toggle("flipped");
    });

    container.appendChild(div);
  });
});
