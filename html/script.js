document.addEventListener("DOMContentLoaded", function() {

  const infoBtn = document.getElementById("infoBtn");
  const extraInfo = document.getElementById("extraInfo");
  const modeBtn = document.getElementById("modeBtn");

  // Mostrar/ocultar info extra
  infoBtn.addEventListener("click", function() {
    if (extraInfo.style.display === "none") {
      extraInfo.style.display = "block";
      infoBtn.textContent = "Ocultar información";
    } else {
      extraInfo.style.display = "none";
      infoBtn.textContent = "Haz clic para saber más";
    }
  });

  // Modo oscuro
  modeBtn.addEventListener("click", function() {
    document.body.classList.toggle("dark-mode");

    if (document.body.classList.contains("dark-mode")) {
      modeBtn.textContent = "☀️ Modo Claro";
    } else {
      modeBtn.textContent = "🌙 Modo Oscuro";
    }
  });

  // Cards que se voltean
  const cards = document.querySelectorAll(".card");

  cards.forEach(card => {
    card.addEventListener("click", () => {
      card.classList.toggle("flipped");
    });
  });

});
