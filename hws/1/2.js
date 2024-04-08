"use strict";

/*
###Задание 2
Вы управляете рестораном, в котором работают разные повара, специализирующиеся
на определенных блюдах. Клиенты приходят и делают заказы на разные блюда.

Необходимо реализовать функцию newOrder. Создавать вспомогательные функции,
коллекции, не запрещается. Старайтесь использовать коллекции Map/Set, где это
актуально. Представленный ниже код должен работать.

Повара и их специализации:
Олег - специализация: Пицца.
Андрей - специализация: Суши.
Анна - специализация: Десерты.

Блюда, которые могут заказать посетители:
Пицца "Маргарита"
Пицца "Пепперони"
Пицца "Три сыра"
Суши "Филадельфия"
Суши "Калифорния"
Суши "Чизмаки"
Суши "Сеякемаки"
Десерт Тирамису
Десерт Чизкейк

// Вам необходимо реализовать класс, который управляет заказами и поварами.
*/

// Посетитель ресторана.
class Client {
  constructor(firstname, lastname) {
    this.firstname = firstname;
    this.lastname = lastname;
  }
}

//--------------------------------------------------------------------------//

// повара и их специализации:
const chefs = new Map();
chefs.set("Пицца", "Олег").set("Суши", "Андрей").set("Десерт", "Анна");

// блюда, которые могут заказать посетители:
const menu = new Map();
menu
  .set("Пицца", ["Маргарита", "Пепперони", "Три сыра"])
  .set("Суши", ["Филадельфия", "Калифорния", "Чизмаки", "Сеякемаки"])
  .set("Десерт", ["Тирамису", "Чизкейк"]);
//--------------------------------------------------------------------------//

// менеджер заказов
class Manager {
  constructor() {
    if (!this.orders) {
      this.orders = new Map();
    }
  }

  // cоздание нового заказа.
  newOrder(client, ...dishes) {
    const currentOrder = [...dishes]; // массив объектов переданных блюд

    // проверка на существование такого блюда в меню
    for (const dish of currentOrder) {
      const dishType = dish.type;
      const dishName = dish.name;
      const availableDishes = new Set(menu.get(dishType));

      if (!availableDishes.has(dishName)) {
        // удаление блюда (которого нет в меню) из текущего заказа
        const index = currentOrder.findIndex((item) => item.name === dishName);
        if (index !== -1) {
          currentOrder.splice(index, 1);
        }
        // throw new Error(
        //   `${dishType} ${dishName} - такого блюда не существует.`
        // );
      }
    }

    if (!this.orders.has(client)) {
      this.orders.set(client, currentOrder);
    } else {
      const previousOrder = this.orders.get(client);

      for (const dishPrevious of previousOrder) {
        let found = false;
        for (const dishCurrent of currentOrder) {
          if (dishPrevious.name === dishCurrent.name) {
            dishCurrent.quantity += dishPrevious.quantity;
            found = true;
            break;
          }
        }
        if (!found) {
          currentOrder.push(dishPrevious); // добавление ненайденного блюда в заказ
        }
      }

      // созранение в общий список заказов обновленных данных по этому клиенту
      this.orders.delete(client);
      this.orders.set(client, currentOrder);
    }

    console.log(`Клиент ${client.firstname} заказал:`);
    for (const dish of currentOrder) {
      console.log(
        `${dish.type} ${dish.name} - ${
          dish.quantity
        }; готовит повар ${chefs.get(dish.type)}`
      );
    }
  }
}

//--------------------------------------------------------------------------//

// Можно передать внутрь конструктора что-либо, если необходимо.
const manager = new Manager();

// Вызовы ниже должны работать верно, менять их нельзя, удалять тоже.
console.log("Первый вызов функции newOrder:");
manager.newOrder(
  new Client("Иван", "Иванов"),
  { name: "Маргарита", quantity: 1, type: "Пицца" },
  { name: "Пепперони", quantity: 2, type: "Пицца" },
  { name: "Чизкейк", quantity: 1, type: "Десерт" }
);
// Вывод:
// Клиент Иван заказал
// Пицца "Маргарита" - 1; готовит повар Олег
// Пицца "Пепперони" - 2; готовит повар Олег
// Десерт "Чизкейк" - 1; готовит повар Анна

console.log(" "); // пустая строка
console.log("Второй вызов функции newOrder:");
const clientPavel = new Client("Павел", "Павлов");
manager.newOrder(
  clientPavel,
  { name: "Филадельфия", quantity: 5, type: "Суши" },
  { name: "Калифорния", quantity: 3, type: "Суши" }
);
// Вывод:
// Клиент Павел заказал:
// Суши "Филадельфия" - 5; готовит повар Андрей
// Суши "Калифорния" - 3; готовит повар Андрей

console.log(" "); // пустая строка
console.log("Третий вызов функции newOrder:");
manager.newOrder(
  clientPavel,
  { name: "Калифорния", quantity: 1, type: "Суши" },
  { name: "Тирамису", quantity: 2, type: "Десерт" }
);
// Вывод:
// Клиент Павел заказал:
// Суши "Филадельфия" - 5; готовит повар Андрей
// Суши "Калифорния" - 4; готовит повар Андрей
// Десерт "Тирамису" - 2; готовит повар Анна

console.log(" "); // пустая строка
console.log("Четвертый вызов функции newOrder:");
manager.newOrder(
  clientPavel,
  { name: "Филадельфия", quantity: 1, type: "Суши" },
  { name: "Трубочка с вареной сгущенкой", quantity: 1, type: "Десерт" }
);
// Ничего не должно быть добавлено, должна быть выброшена ошибка:
// Десерт "Трубочка с вареной сгущенкой" - такого блюда не существует.
