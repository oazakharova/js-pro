"use strict";

const keyLS = "feedback";

const bodyEl = document.querySelector("body");
const errorEl = document.querySelector(".error");
const feedbackContainer = document.querySelector(".feedback-container");

if (!localStorage.getItem(keyLS)) {
  errorEl.textContent = "Отзывы не найдены.";
}

const allFeedback = JSON.parse(localStorage.getItem(keyLS));

// добавление товаров на страницу
allFeedback.forEach((feedback) => {
  const feedbackProductName = feedback.productName;
  const arrayOfFeedback = feedback.newFeedbackArray;

  const feedbackEl = document.createElement("div");
  feedbackEl.classList.add("feedback-item");
  feedbackEl.setAttribute("data-product", feedbackProductName);
  feedbackEl.innerHTML = `
  <h3 class="feedback-item-title">${feedbackProductName}</h3>
  <button class="showFeedback">показать отзывы</button>
  <div class="feedback-wrap hidden"></div>
  `;

  feedbackContainer.append(feedbackEl);

  // добавление отзывов к товарам
  const feedbackWrapEl = document.querySelector(
    `.feedback-item[data-product="${feedbackProductName}"] .feedback-wrap`
  );

  arrayOfFeedback.forEach((feedbackText) => {
    const divWrapEL = document.createElement("div");
    divWrapEL.classList.add("feedback-div-wrap");
    feedbackWrapEl.append(divWrapEL);

    const feedbackTextEl = document.createElement("p");
    feedbackTextEl.textContent = feedbackText;
    divWrapEL.append(feedbackTextEl);

    const deleteFeedbackEl = document.createElement("button");
    deleteFeedbackEl.textContent = "удалить отзыв";
    deleteFeedbackEl.classList.add("deleteThisFeedback");
    divWrapEL.append(deleteFeedbackEl);
  });
});

// showFeedbackBtns
const showFeedbackBtns = document.querySelectorAll(".showFeedback");

showFeedbackBtns.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    e.target.parentElement
      .querySelector(".feedback-wrap")
      .classList.toggle("hidden");

    if (btn.textContent === "показать отзывы") {
      btn.textContent = "скрыть отзывы";
    } else {
      btn.textContent = "показать отзывы";
    }
  });
});

// deleteFeedbackBtns
const deleteFeedbackBtns = document.querySelectorAll(".deleteThisFeedback");

deleteFeedbackBtns.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    const feedbackItem = e.target.parentElement;
    const productName =
      feedbackItem.parentElement.parentElement.dataset.product;
    const feedbackText = feedbackItem.firstChild.textContent;

    // удаление из DOM
    feedbackItem.remove();

    // текущие отзывы из localStorage
    let allFeedback = JSON.parse(localStorage.getItem(keyLS)) || [];

    // индекс продукта в массиве отзывов
    const productIndex = allFeedback.findIndex(
      (item) => item.productName === productName
    );
    // удаление отзыва из массива
    if (productIndex !== -1) {
      allFeedback[productIndex].newFeedbackArray = allFeedback[
        productIndex
      ].newFeedbackArray.filter((feedback) => feedback !== feedbackText);

      // если отзывов не осталось, удаление всего продукта из массива
      if (allFeedback[productIndex].newFeedbackArray.length === 0) {
        allFeedback.splice(productIndex, 1);

        // удаление из localStorage
        localStorage.setItem(keyLS, JSON.stringify(allFeedback));

        // удаление из DOM
        const productEl = document.querySelector(
          `.feedback-item[data-product="${productName}"]`
        );
        if (productEl) {
          productEl.remove();
        }
      } else {
        // обновление localStorage, тк остались отзывы
        localStorage.setItem(keyLS, JSON.stringify(allFeedback));
      }
    }
  });
});
