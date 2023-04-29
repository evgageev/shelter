import data from "../../pets.json" assert { type: "json" };
let innerWidth = window.innerWidth;

const bigArr = [].flat();

function shuffle(data) {
  let sortedArr = data.sort(() => Math.random() - 0.5);
  bigArr.push(...sortedArr);
}

for (let i = 0; i <= 5; i++) {
  shuffle(data);
}
console.log(bigArr);

// Заполнение страницы

let pageNum = 1;
let cardsOnPage;
let lastPage;

if (innerWidth >= 1280) {
  cardsOnPage = 8;
  lastPage = 6;
} else if (innerWidth > 320 && innerWidth <= 768) {
  cardsOnPage = 6;
  lastPage = 8;
} else if (innerWidth <= 320) {
  cardsOnPage = 3;
  lastPage = 16;
}
insertHtml();
const slideFirst = document.querySelector(".slide-first");
const slidePrev = document.querySelector(".slide-prev");
const slideNow = document.querySelector(".slide-now");
const slideNext = document.querySelector(".slide-next");
const slideLast = document.querySelector(".slide-last");

slideNext.addEventListener("click", () => {
  pageNum++;
  insertPageNum();
  insertHtml();
  if (pageNum >= lastPage) {
    slideLast.setAttribute("disabled", "");
    slideNext.setAttribute("disabled", "");
  } else if (pageNum > 1) {
    slideFirst.removeAttribute("disabled");
    slidePrev.removeAttribute("disabled");
  }
  console.log(pageNum);
});

slidePrev.addEventListener("click", () => {
  pageNum--;
  insertPageNum();
  insertHtml();
  if (pageNum === 1) {
    slideFirst.setAttribute("disabled", "");
    slidePrev.setAttribute("disabled", "");
  } else if (pageNum < lastPage) {
    slideNext.removeAttribute("disabled");
    slideLast.removeAttribute("disabled");
  }
  console.log(pageNum);
});

slideLast.addEventListener("click", () => {
  pageNum = lastPage;
  insertPageNum();
  insertHtml();
  slideLast.setAttribute("disabled", "");
  slideNext.setAttribute("disabled", "");
  slideFirst.removeAttribute("disabled");
  slidePrev.removeAttribute("disabled");
});

slideFirst.addEventListener("click", () => {
  pageNum = 1;
  insertPageNum();
  insertHtml();
  slideFirst.setAttribute("disabled", "");
  slidePrev.setAttribute("disabled", "");
  slideNext.removeAttribute("disabled");
  slideLast.removeAttribute("disabled");
});

function insertPageNum() {
  slideNow.innerHTML = "";
  slideNow.insertAdjacentHTML("afterbegin", pageNum);
}

function getCards() {
  let start = (pageNum - 1) * cardsOnPage;
  let end = start + cardsOnPage;
  let cards = bigArr.slice(start, end);
  console.log(cards);
  return cards;
}

function insertHtml() {
  let petCards = getCards();
  const sliderItems = document.querySelectorAll(".slider__item");
  console.log(sliderItems);
  console.log(petCards);
  console.log(cardsOnPage);
  for (let i = 0; i <= cardsOnPage - 1; i++) {
    sliderItems[i].innerHTML = "";
    const html = `
        <div>
          <img src="${petCards[i].img}" alt="pets" class="slider__img">
          <div class="slider__name">${petCards[i].name}</div>
          <button class="slider__btn">Learn more</button>
        </div>
      `;
    sliderItems[i].insertAdjacentHTML("afterbegin", html);
  }
}

// Модальное окно
const sliderItems = document.querySelectorAll(".slider__item");
const modal = document.querySelector(".modal");

sliderItems.forEach((item, i) => {
  let petCards = getCards();
  item.addEventListener("click", () => {
    modal.innerHTML = "";
    const html = `
      <div class="modal__inner">
      <button class="modal__btn"></button>
      <div class="modal__card">
      <img src="${petCards[i].img}" alt="pet" class="modal__img">
        <div class="modal__content">
          <h3 class="modal__title">${petCards[i].name}</h3>
          <p class="modal__subtitle">${petCards[i].type} - ${petCards[i].breed}</p>
          <p class="modal__info">${petCards[i].description}</p>
          <ul class="modal__list">
            <li class="modal__list-element"><b>Age:</b> ${petCards[i].age}</li>
            <li class="modal__list-element"><b>Inoculations:</b> ${petCards[i].inoculations}</li>
            <li class="modal__list-element"><b>Diseases:</b> ${petCards[i].diseases}</li>
            <li class="modal__list-element"><b>Parasites:</b> ${petCards[i].parasites}</li>
          </ul>
        </div>
      </div>
    </div>
      `;
    modal.insertAdjacentHTML("afterbegin", html);
    modal.classList.add("open");
    document.body.style.overflow = "hidden";

    // Закрыть модальное окно
    document.querySelector(".modal__btn").addEventListener("click", () => {
      modal.classList.remove("open");
      document.body.style.overflow = "auto";
    });

    // Закрыть модальное окно при клике вне его
    document
      .querySelector("#my-modal .modal__inner")
      .addEventListener("click", (event) => {
        event._isClickWithInModal = true;
      });

    document.getElementById("my-modal").addEventListener("click", (event) => {
      if (event._isClickWithInModal) return;
      event.currentTarget.classList.remove("open");
      document.body.style.overflow = "auto";
    });
  });
});
