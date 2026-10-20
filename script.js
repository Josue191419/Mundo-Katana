// Espera a que el DOM esté completamente cargado
document.addEventListener("DOMContentLoaded", () => {

  // Referencias a los elementos del DOM
  const infoBtn = document.getElementById("infoBtn");
  const extraInfo = document.getElementById("extraInfo");
  const modeBtn = document.getElementById("modeBtn");

  // Toggle animado para la sección de información extra
  if (infoBtn && extraInfo) {
    infoBtn.addEventListener("click", () => {
      const isHidden = extraInfo.style.display === "none" || extraInfo.style.display === "";
      extraInfo.style.display = isHidden ? "block" : "none";
      infoBtn.textContent = isHidden ? "Ocultar información" : "Haz clic para saber más";
    });
  }

  // Restaurar preferencia guardada de Modo Oscuro con localStorage
  if (localStorage.getItem("darkMode") === "enabled") {
    document.body.classList.add("dark-mode");
    if (modeBtn) modeBtn.textContent = "☀️ Modo Claro";
  }

  // Alternar Modo Oscuro de forma dinámica
  if (modeBtn) {
    modeBtn.addEventListener("click", () => {
      document.body.classList.toggle("dark-mode");
      const isDark = document.body.classList.contains("dark-mode");
      
      localStorage.setItem("darkMode", isDark ? "enabled" : "disabled");
      modeBtn.textContent = isDark ? "☀️ Modo Claro" : "🌙 Modo Oscuro";
    });
  }

  // Renderizar tarjetas dinámicas creadas desde el panel admin
  renderPublicCards();

  // Delegación de eventos global para el giro 3D fluido de las tarjetas (estáticas y dinámicas)
  document.addEventListener("click", (event) => {
    const card = event.target.closest(".card");
    if (card) {
      card.classList.toggle("flipped");
    }
  });

});

// Función para obtener tarjetas del almacenamiento local
function getCards() {
  return JSON.parse(localStorage.getItem("cards")) || [];
}

// Renderizado optimizado de tarjetas dinámicas sin duplicaciones
function renderPublicCards() {
  const container = document.getElementById("dynamicCards");
  if (!container) return;

  container.innerHTML = "";
  const dynamicCards = getCards();

  dynamicCards.forEach(card => {
    const div = document.createElement("div");
    div.className = "card";

    div.innerHTML = `
      <div class="front">
        <img src="${card.image}" alt="Katana Dinámica">
        <p class="press-text">👉 Presiona la imagen</p>
      </div>
      <div class="back">
        <p>
          <strong>Material:</strong> ${card.material}<br>
          <strong>Longitud:</strong> ${card.length}<br>
          <span class="price-tag">${card.price}</span>
        </p>
      </div>
    `;

    container.appendChild(div);
  });
}