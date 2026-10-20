// Hash SHA-256 de la contraseña (por defecto equivale a "1234")
// Si quieres cambiar la contraseña, puedes calcular el hash de la nueva clave.
const ADMIN_PASSWORD_HASH = "03ac674216f3e15c761ee1a5e255f067953623c8b388b4459e13f978d7c846f4";

// Función auxiliar para encriptar el texto ingresado usando SHA-256
async function hashPassword(password) {
    const encoder = new TextEncoder();
    const data = encoder.encode(password);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

// Función para manejar el login de administrador (ahora con encriptación)
async function login() {
    const passInput = document.getElementById("password").value;
    
    // Encriptamos lo que el usuario escribió para compararlo con el hash seguro
    const hashedInput = await hashPassword(passInput);

    if (hashedInput === ADMIN_PASSWORD_HASH) {
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

    const cards = JSON.parse(localStorage.getItem("cards")) || [];

    cards.push({
        id: Date.now(),
        title,
        image,
        material,
        length,
        price,
        description
    });

    localStorage.setItem("cards", JSON.stringify(cards));

    document.getElementById("title").value = "";
    document.getElementById("image").value = "";
    document.getElementById("material").value = "";
    document.getElementById("length").value = "";
    document.getElementById("price").value = "";
    document.getElementById("description").value = "";

    renderCards();
}

// Función para renderizar las tarjetas en el panel de administración
function renderCards() {
    const container = document.getElementById("cards");
    if (!container) return;
    
    container.innerHTML = "";

    const cards = JSON.parse(localStorage.getItem("cards")) || [];

    cards.forEach(card => {
        const div = document.createElement("div");
        div.className = "card";

        div.innerHTML = `
            <div>
                <img src="${card.image}" alt="${card.title}">
                <h3>${card.title}</h3>
                <p>${card.description}</p>
                <p><strong>Material:</strong> ${card.material}</p>
                <p><strong>Longitud:</strong> ${card.length}</p>
                <p><strong>Precio:</strong> ${card.price}</p>
            </div>
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

// Sincronización del Modo Oscuro con el resto del sitio
document.addEventListener("DOMContentLoaded", () => {
    const modeBtnAdmin = document.getElementById("modeBtnAdmin");

    if (localStorage.getItem("darkMode") === "enabled") {
        document.body.classList.add("dark-mode");
        updateThemeButtonAdmin(true);
    }

    if (modeBtnAdmin) {
        modeBtnAdmin.addEventListener("click", () => {
            document.body.classList.toggle("dark-mode");
            const isDark = document.body.classList.contains("dark-mode");
            localStorage.setItem("darkMode", isDark ? "enabled" : "disabled");
            updateThemeButtonAdmin(isDark);
        });
    }

    function updateThemeButtonAdmin(isDark) {
        if (!modeBtnAdmin) return;
        const icon = modeBtnAdmin.querySelector(".theme-icon");
        const text = modeBtnAdmin.querySelector(".theme-text");
        if (icon) icon.textContent = isDark ? "☀️" : "🌙";
        if (text) text.textContent = isDark ? "Claro" : "Oscuro";
    }
});