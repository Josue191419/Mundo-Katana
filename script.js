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

// Contraseña de administrador (debe cambiarse en producción)
const ADMIN_PASSWORD = "1234";

// Función para manejar el login de administrador
function login() {
  const pass = document.getElementById("password").value;

  if (pass === ADMIN_PASSWORD) {
    document.getElementById("login").style.display = "none";
    document.getElementById("adminContent").style.display = "block";
    renderCards();
  } else {
    alert("Contraseña incorrecta");
  }
}

// Función para agregar una nueva tarjeta
function addCard() {
  const title = document.getElementById("title").value;
  const image = document.getElementById("image").value;
  const material = document.getElementById("material").value;
  const length = document.getElementById("length").value;
  const price = document.getElementById("price").value;
  const description = document.getElementById("description").value;

  // Obtiene las tarjetas existentes del localStorage o inicializa un array vacío
  const cards = JSON.parse(localStorage.getItem("cards")) || [];

  // Agrega la nueva tarjeta con un ID único basado en timestamp
  cards.push({
    id: Date.now(), // ID único
    title,
    image,
    material,
    length,
    price,
    description
  });

  // Guarda las tarjetas actualizadas en localStorage
  localStorage.setItem("cards", JSON.stringify(cards));
  renderCards();
}

// Función para renderizar las tarjetas en el panel de administración
function renderCards() {
  const container = document.getElementById("cards");
  container.innerHTML = "";

  // Obtiene las tarjetas del localStorage
  const cards = JSON.parse(localStorage.getItem("cards")) || [];

  // Crea un elemento div para cada tarjeta y lo agrega al contenedor
  cards.forEach(card => {
    const div = document.createElement("div");
    div.className = "card";

    div.innerHTML = `
      <img src="${card.image}">
      <h3>${card.title}</h3>
      <p>${card.description}</p>
      <p><strong>Material:</strong> ${card.material}</p>
      <p><strong>Longitud:</strong> ${card.length}</p>
      <p><strong>Precio:</strong> ${card.price}</p>
      <button class="delete-btn" onclick="deleteCard(${card.id})">❌ Eliminar</button>
    `;

    container.appendChild(div);
  });
}

// Función para eliminar una tarjeta por ID
function deleteCard(id) {
  let cards = JSON.parse(localStorage.getItem("cards")) || [];
  cards = cards.filter(card => card.id !== id);
  localStorage.setItem("cards", JSON.stringify(cards));
  renderCards();
}

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
