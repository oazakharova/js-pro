"use strict";

const productNameEl = document.querySelector(".form__productName");
const newFeedbackEl = document.querySelector(".form__newFeedback");
const addNewFeedbackEl = document.querySelector(".form__addNewFeedback");
const userInfoEl = document.querySelector(".form-info");

const keyLS = "feedback";

addNewFeedbackEl.addEventListener("click", (e) => {
  e.preventDefault();

  const productName = productNameEl.value.trim();
  const newFeedback = newFeedbackEl.value.trim();

  if (!productName || !newFeedback) {
    userInfoEl.textContent = "Необходимо ввести название товара и отзыв.";
    throw new Error("Необходимо ввести название товара и отзыв.");
  }

  let existingFeedback = [];
  const existingFeedbackJSON = localStorage.getItem(keyLS);

  if (existingFeedbackJSON) {
    existingFeedback = JSON.parse(existingFeedbackJSON);
  }

  const hasProduct = existingFeedback.some(
    (product) => product.productName === productName
  );

  let newFeedbackArray = [];

  if (hasProduct) {
    existingFeedback.forEach((product) => {
      if (product.productName === productName) {
        newFeedbackArray = product.newFeedbackArray;
        newFeedbackArray.push(newFeedback);
      }
    });
  } else {
    newFeedbackArray = [newFeedback];
    existingFeedback.push({ productName, newFeedbackArray });
  }

  localStorage.setItem("feedback", JSON.stringify(existingFeedback));

  productNameEl.value = "";
  newFeedbackEl.value = "";

  userInfoEl.textContent = "Отзыв успешно сохранен.";
});
