document.addEventListener("DOMContentLoaded", init);

function init() {
  let header = document.getElementById("header-nav");
  let button = document.getElementById("button-menu");
  let content = document.getElementById("content");
  

  button.addEventListener("click", menuToggle);

  function menuToggle() {
    header.classList.toggle("active");
    content.classList.toggle("is-hide");
    button.classList.toggle("close");
  }
}