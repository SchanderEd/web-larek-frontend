# Проектная работа "Веб-ларек"

Ссылка на проект: https://github.com/SchanderEd/web-larek-frontend.git

Стек: HTML, SCSS, TS, Webpack

Структура проекта:
- src/ — исходные файлы проекта
- src/components/ — папка с JS компонентами
- src/components/base/ — папка с базовым кодом

Важные файлы:
- src/pages/index.html — HTML-файл главной страницы
- src/types/index.ts — файл с типами
- src/index.ts — точка входа приложения
- src/styles/styles.scss — корневой файл стилей
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

## Типы данных

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

---

Basket - корзина:

items: Map<string, number> - список товаров в корзине
counter: number - количество товаров в корзине

---

enum Modals - список модальных окон

	productModal - окно товара,
	basketModal - окно корзины,
	paymentModal - окно выбора способа оплаты,
	successOrderModal - окно при успешном оформлении заказа,
	contactsModal - окно заполнения контактных данных

---

Buyers - данные покупателя:

paymentMethod: string - выбранный тип оплаты
address: string - адрес доставки
email: string - адрес эл.почты
phone: string - номер телефона

```
## Методы 

Catalog:

setItems() - возвращает список товаров в каталоге.
getProduct(id: string) - возвращает объект переданного товара.

---

Basket:

addProduct(id: string) - добавляет товар в корзину по переданному id
removeProduct(id: string) - удаляет товар из корзины по переданному id

---

Modal:

openModal(modal: Modals) - открывает указанное модальное окно
closeModal(modal: Modals) - закрывает указанное модальное окно

---

ViewConstructor - конструктор HTML элемента

container: HTMLElement - HTML элемент
events?: IEventEmmitter - список событий

---

IView:

render(data?: object) - рендерит HTML элемент с переданной data