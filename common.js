const blurWrapper = document.querySelector(".nav__wrapper");
const scrollLocker = document.querySelector(".body-wrapper");
const btnMenu = document.querySelector(".hamburger");
const menu = document.querySelector(".nav");
const navLinks = document.querySelectorAll(".nav__link");

const toggleMenu = function () {
  menu.classList.toggle("nav_open");
  btnMenu.classList.toggle("nav_open");
  blurWrapper.classList.toggle("bg");
  scrollLocker.classList.toggle("bg");
};

btnMenu.addEventListener("click", function (e) {
  e.stopPropagation();
  toggleMenu();
});

document.addEventListener("click", function (e) {
  const target = e.target;
  const its_menu = target == menu || menu.contains(target);
  const its_btnMenu = target == btnMenu;
  const menu_is_active = menu.classList.contains("nav_open");

  if (!its_menu && !its_btnMenu && menu_is_active) {
    toggleMenu();
  }
});

navLinks.forEach((button) => {
  button.addEventListener("click", toggleMenu);
});
