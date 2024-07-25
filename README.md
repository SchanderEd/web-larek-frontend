# Проектная работа "Веб-ларек"

Ссылка на проект: https://github.com/SchanderEd/web-larek-frontend.git

Паттрен проектирования: MVP

Стек: HTML, SCSS, TS, Webpack

Структура проекта:
- src/ — исходные файлы проекта
- src/components/ — папка с JS компонентами
- src/components/base/ — папка с базовым кодом

Важные файлы:
- src/pages/index.html — HTML-файл главной страницы
- src/types/index.ts — файл с типами
- src/index.ts — точка входа приложения
- src/scss/styles.scss — корневой файл стилей
- src/utils/constants.ts — файл с константами
- src/utils/utils.ts — файл с утилитами

## Установка и запуск
Для установки и запуска проекта необходимо выполнить команды

```
npm install
npm run start
```

или

```
yarn
yarn start
```
## Сборка

```
npm run build
```

или

```
yarn build
```

## Типы модели

Product - товар:

id - индетификатор товара
title: string  - название товара
category: string  - категория товара
price: number - стоимость товара
image: string  - ссылка на изображение товара
description: string - описание товара

```

Catalog - каталог:

items: IProduct[] - массив товаров

Методы:
setItems() - возвращает список товаров в каталоге.
getProduct(id: string) - возвращает объект переданного товара.

---

Basket - корзина:

items: Map<string, number> - список товаров в корзине
counter: number - количество товаров в корзине

Методы:
addProduct(id: string) - добавляет товар в корзину по переданному id
removeProduct(id: string) - удаляет товар из корзины по переданному id

---

enum Modals - список модальных окон

	productModal - окно товара,
	basketModal - окно корзины,
	paymentModal - окно выбора способа оплаты,
	successOrderModal - окно при успешном оформлении заказа,
	contactsModal - окно заполнения контактных данных

---

Modal - модальное окно

modal: Modals - тип модального окна
elForOpen: HTMLElement - элемент для открытия окна
elForClose: HTMLButtonElement - элемент для закрытия окна

Методы:
openModal(modal: Modals) - открывает указанное модальное окно
closeModal(modal: Modals) - закрывает указанное модальное окно

---

Buyers - данные покупателя:

paymentMethod: string - выбранный тип оплаты
address: string - адрес доставки
email: string - адрес эл.почты
phone: string - номер телефона

```
## Типы отображения

---

ViewConstructor - конструктор HTML элемента

container: HTMLElement - HTML элемент
events?: IEventEmmitter - список событий

---

IView:

Методы:
render(data?: object) - рендерит HTML элемент с переданной data

---

## Брокер событий

EventEmitter - обеспечивает работу событий. Устанавливает и снимает слушателей событий, а также вызывает их при возникновении события».

Методы:
on() - установить обработчик на событие
off() - снять обработчик на событие
emit() - инициировать событие с данными
onAll() - слушать все события
offAll() - сбросить все обработчики
trigger() - сделать коллбек триггер, генерирующий событие при вызове