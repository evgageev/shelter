import data from "../../pets.json" assert { type: "json" };
console.log(data);

let innerWidth = window.innerWidth;
let pastArr = [];
let currArr = [];
let nextArr = [];
let nextCounter = 0;
let prevCounter = 0;

init();

function nextArrGeneration() {
  let i = 2;
  nextArr = [];
  while (i >= 0) {
    let randomObj = data[Math.floor(Math.random() * data.length)];
    const checCurrkDuplicate = currArr.some((e) => e.name === randomObj.name);
    const checkNextDuplicate = nextArr.some((e) => e.name === randomObj.name);

    if (!checCurrkDuplicate && !checkNextDuplicate) {
      nextArr.push(randomObj);
      i--;
    }
  }
}

function init() {
  nextArrGeneration();
  currArr = [...nextArr];
  nextArrGeneration();
  pastArr = [...currArr];
  currArr = [...nextArr];
  nextArr = [];
  nextArrGeneration();
  insertHtml();
}

function insertHtml() {
  const sliderItems = document.querySelectorAll(".slider__item");
  sliderItems.forEach((item, index) => {
    item.innerHTML = "";
    const html = `
        <div>
          <img src="${currArr[index].img}" alt="pet" class="slider__img">
          <div class="slider__name">${currArr[index].name}</div>
          <button class="slider__btn">Learn more</button>
        </div>
      `;
    item.insertAdjacentHTML("afterbegin", html);
  });
}

// Модальное окно
const sliderItems = document.querySelectorAll(".slider__item");
const modal = document.querySelector(".modal");
const scrollLocker = document.querySelector(".body-wrapper");

sliderItems.forEach((item, index) => {
  item.addEventListener("click", () => {
    modal.innerHTML = "";
    const html = `
      <div class="modal__inner">
      <button class="modal__btn"></button>
      <div class="modal__card">
      <img src="${currArr[index].img}" alt="pet" class="modal__img">
        <div class="modal__content">
          <h3 class="modal__title">${currArr[index].name}</h3>
          <p class="modal__subtitle">${currArr[index].type} - ${currArr[index].breed}</p>
          <p class="modal__info">${currArr[index].description}</p>
          <ul class="modal__list">
            <li class="modal__list-element"><b>Age:</b> ${currArr[index].age}</li>
            <li class="modal__list-element"><b>Inoculations:</b> ${currArr[index].inoculations}</li>
            <li class="modal__list-element"><b>Diseases:</b> ${currArr[index].diseases}</li>
            <li class="modal__list-element"><b>Parasites:</b> ${currArr[index].parasites}</li>
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

// Слайдер
const nextBtn = document.querySelector(".slide-next");
nextBtn.addEventListener("click", forward);

function forward() {
  if (prevCounter === 0 && nextCounter >= 0) {
    pastArr = [];
    pastArr = [...currArr];
    currArr = [];
    currArr = [...nextArr];
    nextArrGeneration();
    insertHtml();
    console.log("forward");
  } else if (prevCounter > 0) {
    changeToForward();
  }
  nextCounter++;
  console.log(nextCounter);
}

function changeToForward() {
  prevCounter = 0;
  let pastTempArr = [...pastArr];
  pastArr = [...currArr];
  currArr = [...pastTempArr];
  nextArr = [];
  nextArrGeneration();
  insertHtml();
  console.log("changeToForward");
}

const prevBtn = document.querySelector(".slide-prev");
prevBtn.addEventListener("click", backward);

function backward() {
  if (nextCounter === 0 && prevCounter >= 0) {
    pastArr = [];
    pastArr = [...currArr];
    currArr = [];
    currArr = [...nextArr];
    nextArrGeneration();
    insertHtml();
    console.log("backward");
  } else {
    changeToBackward();
  }
  prevCounter++;
  console.log(prevCounter);
}

function changeToBackward() {
  nextCounter = 0;
  let pastTempArr = [...pastArr];
  pastArr = [...currArr];
  currArr = [...pastTempArr];
  nextArr = [];
  nextArrGeneration();
  insertHtml();
  console.log("changeToBackward");
}
