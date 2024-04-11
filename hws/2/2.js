"use strict";

/*
###Задание 2
Вы разрабатываете систему отзывов для вашего веб-сайта. Пользователи могут
оставлять отзывы, но чтобы исключить слишком короткие или слишком длинные
сообщения, вы решаете установить ограничение, отзыв должен быть не менее 50
символов в длину и не более 500. В случае неверной длины, необходимо выводить
сообщение об ошибке, рядом с полем для ввода.

Создайте HTML-структуру.
На странице должны отображаться товары, под каждым товаром должен быть список
отзывов на данный товар. Под каждым списком отзывов должна быть форма, где можно
добавить отзыв для продукта.

При добавлении отзыва, он должен отображаться на странице под предыдущими
отзывами, а не заменять их.
Массив initialData должен использоваться для начальной загрузки данных
при запуске вашего приложения.

Каждый отзыв, как и продукт, должен иметь уникальный id, для упрощения, используем
функцию `uid()`, она нам будет возвращать случайный id в виде небольшой строки.

ВНИМАНИЕ! Если вы не проходили на курсе работу с DOM, то можно это задание не
делать, пока рано.
*/

function uid() {
  return Math.random().toString(36).slice(2);
}

const initialData = [
  {
    id: uid(),
    product: "Apple iPhone 13",
    reviews: [
      {
        id: uid(),
        text: "Отличный телефон! Батарея держится долго.",
      },
      {
        id: uid(),
        text: "Камера супер, фото выглядят просто потрясающе.",
      },
    ],
  },
  {
    id: uid(),
    product: "Samsung Galaxy Z Fold 3",
    reviews: [
      {
        id: uid(),
        text: "Интересный дизайн, но дорогой.",
      },
    ],
  },
  {
    id: uid(),
    product: "Sony PlayStation 5",
    reviews: [
      {
        id: uid(),
        text: "Люблю играть на PS5, графика на высоте.",
      },
    ],
  },
];

const productsElements = document.querySelectorAll(".product");

// вывод на страницу дефолтных отзывов
productsElements.forEach((productInHTML) => {
  initialData.forEach((initialDataEl) => {
    if (
      productInHTML.querySelector(".product-name").querySelector("a")
        .textContent === initialDataEl.product
    ) {
      initialDataEl.reviews.forEach((reviewEl) => {
        const feedbacksWrapEl = productInHTML.querySelector(".feedbacks-wrap");

        const feedbackEl = document.createElement("div");
        feedbackEl.classList.add("feedback");
        feedbackEl.innerHTML = `
          <div class="feedback-text">
            ${reviewEl.text}
          </div>
        `;

        feedbacksWrapEl.append(feedbackEl);
      });
    }
  });
});

// textarea
productsElements.forEach((productInHTML) => {
  const textareaEl = productInHTML.querySelector("textarea");
  const buttonEl = productInHTML.querySelector("button");

  buttonEl.addEventListener("click", (e) => {
    e.preventDefault();

    initialData.forEach((initialDataEl) => {
      if (
        productInHTML.querySelector(".product-name").querySelector("a")
          .textContent === initialDataEl.product
      ) {
        // проверка длины отзыва
        if (textareaEl.value.length < 50 || textareaEl.value.length > 500) {
          7;
          const textareaErrorEl =
            productInHTML.querySelector(".textarea-error");
          textareaErrorEl.textContent =
            "Длина введенного отзыва не соответствует требованиям";
          throw new Error(
            "Длина введенного отзыва не соответствует требованиям"
          );
        }

        // добавление нового отзыва в initialDataEl
        initialDataEl.reviews.push({
          id: uid(),
          text: textareaEl.value,
        });

        // добавление нового отзыва в initialDataEl
        initialDataEl.reviews.push({
          id: uid(),
          text: textareaEl.value,
        });

        // отображение нового отзыва на странице
        const feedbacksWrapEl = productInHTML.querySelector(".feedbacks-wrap");
        const feedbackEl = document.createElement("div");
        feedbackEl.classList.add("feedback");
        feedbackEl.innerHTML = `
          <div class="feedback-text">
            ${textareaEl.value}
          </div>
        `;
        feedbacksWrapEl.append(feedbackEl);

        // очистка поля textarea
        textareaEl.value = "";
      }
    });
  });
});
