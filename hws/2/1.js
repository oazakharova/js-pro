"use strict";

/*
###Задание 1
Необходимо создать класс Library. Конструктор класса, должен принимать начальный
список книг (массив) в качестве аргумента. Убедитесь, что предоставленный массив
не содержит дубликатов; в противном случае необходимо выбросить ошибку.
1. Класс должен содержать приватное свойство #books, которое должно хранить
книги, переданные при создании объекта.
2. Реализуйте геттер-функцию allBooks, которая возвращает текущий список книг.
3. Реализуйте метод addBook(title), который позволяет добавлять книгу в список.
Если книга с таким названием уже существует в списке, выбросьте ошибку с
соответствующим сообщением.
4. Реализуйте метод removeBook(title), который позволит удалять книгу из списка
по названию. Если книги с таким названием нет в списке, выбросьте ошибку с
соответствующим сообщением.
5. Реализуйте метод hasBook(title), который будет проверять наличие книги в
библиотеке и возвращать true или false в зависимости от того, есть ли такая
книга в списке или нет.
*/

class Library {
  #books = [];

  constructor(books) {
    if (!books?.length) {
      throw new Error("Передан пустой массив");
    }
    if (books?.length !== new Set(books).size) {
      throw new Error("В предоставленном массиве содержатся дубликаты");
    }
    this.#books.push(...books);
  }

  getAllBooks() {
    return this.#books;
  }

  addBook(title) {
    if (this.#books?.includes(title)) {
      throw new Error("Книга с таким названием уже есть в списке.");
    } else this.#books.push(title);
  }

  hasBook(title) {
    const indexOfTitle = this.#books?.indexOf(title);
    if (indexOfTitle !== -1) {
      return true;
    }
    return false;
  }

  removeBook(title) {
    const indexOfTitle = this.#books.indexOf(title);
    if (indexOfTitle !== -1) {
      this.#books.splice(indexOfTitle, 1);
    } else {
      throw new Error(
        "Книги с таким названием нет в списке, удаление невозможно"
      );
    }
  }
}

// массивы книг
// const myBooksWithDuplicate = [
//   "Anna Karenina",
//   "Anna Karenina",
//   "The Great Gatsby",
//   "Hamlet",
//   "One Hundred Years of Solitude",
//   "Crime and Punishment",
// ];
const myBooks = [
  "Anna Karenina",
  "The Great Gatsby",
  "Hamlet",
  "One Hundred Years of Solitude",
  "Crime and Punishment",
];

// const library1 = new Library(myBooksWithDuplicate);

const library2 = new Library(myBooks);
console.log(library2.getAllBooks());
library2.addBook("Война и мир");
console.log(library2.getAllBooks());
library2.addBook("Винни Пух");
console.log(library2.getAllBooks());
library2.removeBook("Винни Пух");
console.log(library2.getAllBooks());
console.log(library2.hasBook("Война и мир"));
console.log(library2.hasBook("Алиса в стране чудес"));

// const library3 = new Library();
