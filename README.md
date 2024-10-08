# Проектная работа "Веб-ларек"

Ссылка на проект: https://github.com/SchanderEd/web-larek-frontend.git

Архитектура проекта: MVP

- Model - слой отвечающий за хранение модели данных и их изменение.
- View - слой представления, отвечающий за отображение данных на странице.
- Presenter - слой отвечающий за связь между моделью и отображением.


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

## Базовый код

### Класс Api

Содержит логику работы с Api проекта. Принимает два параметра:

1. `baseUrl` - адрес запроса
2. `options` - набор опций для отправки запроса в виде объекта, которые передаются в headers запроса.

Методы Api

- `handleResponse(response: Response)` - метод отвеающий за обработку ответа от сервера. В случае успешного запроса возвращает ответ в JSON формате, в противном случае в ответе приходит код и текст ошибки.
- `get(uri: string)` - метод отправки запроса на сервер. Возвращает данные с сервера. Принимает на вход адрес запроса.
- `post(uri: string, data: object, method: ApiPostMethods = 'POST')` - метод для отправки данных на сервер. В ответе возвращает данные с сервера в JSON формате. Принимает на вход адрес запроса, данные для передачи в виде объекта и метод запроса.

### Класс Component

Родительский класс для всех элементов отображения. Принимает тип объекта который будет передаваться в render для отображения компонента. В конструктор принимает элемент разметки который является родительским контейнером переданного компонента.

Методы:

- `render()` - отвечает за сохранение полученных данных в компоненте через сеттеры и возвращает контейнер элемента.

## Классы свойста Model. Слой модели.

### Catalog

Класс отвечает за хранение данных каталога. Класс имеет геттер для получения списка каталога и сеттер `products` который сохраняет полученный список товаров в каталоге. Также имеет метод для получения определенного товара по его id.

Методы:

- `findProduct(data: IProduct)` - принимает объект товара и возвращает его из каталога.

---

### AppApi

Класс отвечающий за взаимодействие приложения с Api. Имеет методы для получения списка товаров с сервера и метод для отправки заказа.

Методы:

- `getCatalog()` - метод возвращает список товаров с сервера.
- `placeOrder()` - метод отвечает за отправку данных заказа на сервер. В ответе возвращает итоговую сумму заказа.

### AppState

Класс отражающий состояние приложения. Хранит в себе данные товаров добавленных в корзину и введенные данные для оформления заказа. Также имеет методы для взаимодествия с корзиной.

Методы:

  - `getIdItems()` - метод возвращает список id товаров добавленных в корзину в виде массива.
  - `getTotalBasket()` - метод возвращает сумму товаров в корзине.
  - `addProduct(product: IProduct)` - добавляет товар в корзину.
  - `removeProduct(indexProduct: number)` - удаляет товар из корзины
  - `clear()` - метод очищающий корзину.

## Классы свойства View. Слой отображения

### Card

Дочерний класс Component. Реализует карточку товара на странице. Имеет геттер для получения id карточки товара.
  
  - `cardId: string` - id карточки.
	- `events: IEvents` - брокер событий
	- `_isDisabledBasketBtn: boolean` - параметр отвечаюищий за состояние кнопки добавления в корзину
	- `_indexCard: HTMLElement` - элмент отображающий номер товара в корзине
	- `card: HTMLElement` - контейнер карточки
	- `galleryButton: HTMLElement` - кнопка для открытия карточки товара
	- `cardTitle: HTMLHeadingElement` - отображает название товара
	- `cardCategory: HTMLElement` - отображает категорию товара
	- `cardImg: HTMLImageElement` - отображает изображение товара
	- `cardPrice: HTMLElement` - отображает стоимость товара
	- `cardDescription: HTMLElement` - отображает описание товара
	- `deleteProductBtn: HTMLButtonElement` - кнопка для удаления товара из корзины
	- `cardBasketBtn: HTMLButtonElement` - кнопка для добавления товара в корзину

### Modal

Класс реализует модальное окно. Дочерний элемент класса Component.

  - `protected _closeButton: HTMLButtonElement` - кнопка закрытия модального окна
  - `protected _content: HTMLElement` - контент для отображения в модальном окне

Методы:

  - `open()` - открывает модальное окно
  - `close()` - закрывает модальное окно
  - `render()` - расширяет родительский метод. Рендерит контент в модальном окне и открывает его

---

### Basket

Класс отвечает за отображение корзины на странице и добавленных в неё товаров. Дочерний элемент класса Component.

  - `protected _products: IProduct[] | null` - список товаров в корзине
  - `protected _cartButton: HTMLButtonElement` - кнопка для открытия корзины
  - `protected _cartList: HTMLUListElement` - отображает список товаров в корзине
  - `protected _cartCounter: HTMLSpanElement` - отображает количество товаров в корзине
  - `protected _orderBtn: HTMLButtonElement` - кнопка для оформления заказа
  - `protected _cartAmount: HTMLSpanElement` - отображает сумму товаров в корзине
  - `protected _cartItems: NodeList` - элементы в списке корзины

Методы:

  - `renderItem(card: HTMLElement)` - рендерит карточку товара в списке корзины
  - `removeItem(id: string)` - удаляет карточку товара из списка корзины
  - `getIndexElement(basket: IProduct[], product: IProduct): number` - метод возвращающий номер карточки товара в корзине для его отображаения.
  - `updateIndexElements(items: NodeList, products: IProduct[])` - обновляет номер карточки в корзине
  - `clear()` - метод для удаления всех карточек товаров из списка

--- 

### Form

Класс реализующий все формы на странице.

  - `protected _form: HTMLFormElement` - элементы формы
	- `protected _inputs: NodeList` - список всех инпутов в форме
	- `protected _submitButton: HTMLButtonElement` - кнопка для отправки формы
	- `protected _emptyElements: HTMLElement[]` - список пустых полей ввода
	- `protected _errorField: HTMLSpanElement` - элемент для отображения сообщений об ошибке
	- `protected _isValid: boolean` - отвечает за состояние кнопки отправки формы

Методы:

  - `validate()` - проверяет поля ввода и выводит сообщение с ошибкой в случае если форма не валидна

---  

### FormContacts

Класс реализующий форму для заполнения контакты данных. Генерирует событие для отправки данных заказа на сервер.

---

### FormOrder

Класс реализующий форму для заполнения данных заказа.

Методы:

  - `validate()` - расширяет родительский метод. Блокирует кнопку отправки формы если не выбран способ оплаты.

---  

### Success

Класс реализующий модальное окно в случае успешного оформления заказа.

  - `protected _amountEl: HTMLSpanElement` - отображает сумму покупки
	- `protected _succesCloseBtn: HTMLButtonElement` - кнопка для закрытия окна

## Классы свойства Presenter. Слой презентера

EventEmitter - обеспечивает работу событий. Устанавливает и снимает слушателей событий, а также вызывает их при возникновении события.

Методы:

- `on()` - установить обработчик на событие
- `off()` - снять обработчик на событие
- `emit()` - инициировать событие с данными
- `onAll()` - слушать все события
- `offAll()` - сбросить все обработчики
- `trigger()` - сделать коллбек триггер, генерирующий событие при вызове


### Список событий в приложении

- `catalog:loaded` - сообщает о том, что каталог товаров успешно получен с сервера
- `modal:open` - сообщает об открытии модального окна
- `modal:close` - сообщает о закрытии модального окна
- `success:close` - закрытие окна успешного оформления заказа
- `card:select` - сообщает, что выбрана карточка товара для просмотра
- `card:basket` - сообщает о добавлении карточки товара в корзину
- `basket:delete product` - сообщает об удалении товара из корзины
- `basket:open` - сообщает об открытии корзины
- `basket:update` - сообщает об измении корзины товаров
- `basket:clear` - сообщает об очистке корзины
- `form:order` - сообщает об открытии формы заказа 
- `form:input` - сообщает о вводе данных в инпуты формы
- `form:submit` - сообщает о нажатии на кнопку отправки формы
- `form:payment` - сообщает о выборе способа оплаты
- `form:complete` - сообщает об отправке формы