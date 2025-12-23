document.addEventListener("DOMContentLoaded", () => {

  const infoBtn = document.getElementById("infoBtn");
  const extraInfo = document.getElementById("extraInfo");
  const modeBtn = document.getElementById("modeBtn");

  infoBtn.addEventListener("click", () => {
    extraInfo.style.display =
      extraInfo.style.display === "none" ? "block" : "none";
  });

  modeBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
  });

  document.querySelectorAll(".card").forEach(card => {
    card.addEventListener("click", () => {
      card.classList.toggle("flipped");
    });
  });

});
