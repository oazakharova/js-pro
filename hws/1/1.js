"use strict";

/*
###Задание 1
Создайте обычный объект "Музыкальная коллекция", который можно итерировать.
Каждая итерация должна возвращать следующий альбом из коллекции. Коллекция
альбомов - это массив внутри нашего объекта (создать несколько альбомов самому).
Каждый альбом имеет следующую структуру:
{
  title: "Название альбома",
  artist: "Исполнитель",
  year: "Год выпуска"
}
Используйте цикл for...of для перебора альбомов в музыкальной коллекции и
вывода их в консоль в формате:
"Название альбома - Исполнитель (Год выпуска)"
*/

const musicCollection = {
  collection: [
    {
      title: "Rolling in the deep",
      artist: "Adele",
      year: "2010",
    },
    {
      title: "Do i wanna know",
      artist: "Arctic Monkeys",
      year: "2013",
    },
    {
      title: "Stronger",
      artist: "Kanye West",
      year: "2007",
    },
  ],

  *[Symbol.iterator]() {
    for (const song of this.collection) {
      yield song;
    }
  },
};

for (const song of musicCollection) {
  console.log(`${song.title} - ${song.artist} (${song.year})`);
}
