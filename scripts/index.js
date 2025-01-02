// const track = document.querySelector(".carousel-track");
const containers = document.querySelectorAll(".product_container");
const items1 = containers[0].querySelectorAll(".product_item");
const items2 = containers[1].querySelectorAll(".product_item");

const prevButton1 = document.querySelector(".prev1");
const prevButton2 = document.querySelector(".prev2");

const nextButton1 = document.querySelector(".next1");
const nextButton2 = document.querySelector(".next2");

let currentIndex1 = 0;
let currentIndex2 = 0;
const itemWidth = containers[0].offsetWidth;
const visibleItems = 3;

function updateButtons() {
  prevButton1.style.display = currentIndex1 > 0 ? "block" : "none";
  nextButton1.style.display =
    currentIndex1 < items1.length - visibleItems ? "block" : "none";

  prevButton2.style.display = currentIndex2 > 0 ? "block" : "none";
  nextButton2.style.display =
    currentIndex2 + 1 < Math.ceil(items2.length / visibleItems)
      ? "block"
      : "none";

  console.log(
    currentIndex1,
    items1.length,
    visibleItems,
    currentIndex1 < items1.length - visibleItems
  );
  console.log(
    currentIndex2,
    items2.length,
    visibleItems,
    currentIndex2 < items2.length - visibleItems
  );
}

function moveCarousel1(direction) {
  currentIndex1 += direction;
  currentIndex1 = Math.max(
    0,
    Math.min(currentIndex1, items1.length - visibleItems)
  );

  for (const element of items1) {
    element.style.transform = `translateX(-${
      currentIndex1 * itemWidth + currentIndex1 * 15
    }px)`;
  }

  updateButtons();
}

function moveCarousel2(direction) {
  currentIndex2 += direction;
  currentIndex2 = Math.max(
    0,
    Math.min(currentIndex2, items2.length - visibleItems)
  );

  for (const element of items2) {
    element.style.transform = `translateX(-${
      currentIndex2 * itemWidth + currentIndex2 * 15
    }px)`;
  }

  updateButtons();
}

prevButton1.addEventListener("click", () => moveCarousel1(-1));
prevButton2.addEventListener("click", () => moveCarousel2(-1));
nextButton1.addEventListener("click", () => moveCarousel1(1));
nextButton2.addEventListener("click", () => moveCarousel2(1));

document.addEventListener("DOMContentLoaded", () => {
  updateButtons();
});
