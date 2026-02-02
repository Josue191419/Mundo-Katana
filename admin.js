// Código de administración trasladado desde script.js)

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

