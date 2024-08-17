import './scss/styles.scss';
import { EventEmitter } from './components/base/events';
import { IApi, IFormOrder } from './types';
import { Api } from './components/base/api';
import { API_URL, settings } from './utils/constants';
import { AppApi } from './components/Api';
import { Catalog } from './components/Catalog';
import { Card } from './components/Card';
import { cloneTemplate, ensureElement } from './utils/utils';
import { Modal } from './components/common/Modal';
import { Basket, IBasket } from './components/Basket';
import { FormContacts } from './components/FormContacts';
import { FormOrder } from './components/FormOrder';
import { Success } from './components/Success';
import { AppState, IAppState } from './components/AppState';

/* Темплейты */
const cardTemplate: HTMLTemplateElement = document.querySelector('#card-catalog')
const cardModalTemplate: HTMLTemplateElement = document.querySelector('#card-preview')
const cartTemplate: HTMLTemplateElement = document.querySelector('#basket')
const cartItemTemplate: HTMLTemplateElement = document.querySelector('#card-basket')
const orderTemplate: HTMLTemplateElement = document.querySelector('#order');
const contactsTemaplate: HTMLTemplateElement = document.querySelector('#contacts')
const successTemplate: HTMLTemplateElement = document.querySelector('#success');

const events = new EventEmitter();

const initialState: IAppState = {
  basket: {
    products: []
  },
  orderData: {
    paymentMethod: '',
    address: '',
    email: '',
    phone: ''
  }
}

const appState = new AppState(initialState.basket, initialState.orderData)

const baseApi: IApi = new Api(API_URL, settings)
const api = new AppApi(baseApi)
const catalogData = new Catalog(null, events)

const modal = new Modal(ensureElement<HTMLElement>('#modal-container'), events);
const basket = new Basket(cloneTemplate(cartTemplate), events);

const formOrder = new FormOrder(cloneTemplate(orderTemplate), events)
const formContacts = new FormContacts(cloneTemplate(contactsTemaplate), events)

const gallery = document.querySelector('.gallery')
const page = document.querySelector('.page')

/*events.onAll((event) => {
  console.log(event.eventName, event.data)
})*/


/* Получение каталога */

Promise.all([api.getCatalog()])
  .then(([catalog]) => {
    catalogData.products = catalog
    basket.products = null
    events.emit('catalog:loaded', catalogData)
  })
  .catch((err) => {
    gallery.textContent = 'Что-то пошло не так :('
    console.log(err)
  })

events.on('catalog:loaded', () => { /* Получение начальных данных */
  for (let product of catalogData.catalog.items) {
    const card = new Card(cloneTemplate(cardTemplate), events)

    gallery.appendChild(card.render({
      title: product.title,
      image: product.image,
      category: product.category,
      price: product.price,
      id: product.id
    }))
  }
})

/* Открытие карточки товара */

events.on('card:select', (data: Card) => {
  const product = catalogData.catalog.items.find((item) => item.id === data.id)
  let basketButtonState = false
  if (appState.getBasket.products.some((item) => item.id === product.id)) {
    basketButtonState = true
  }

  const card = new Card(cloneTemplate(cardModalTemplate), events, basketButtonState)

  modal.render({
    content: card.render({
      title: product.title,
      image: product.image,
      description: product.description,
      category: product.category,
      price: product.price,
      id: product.id
    })
  });

  page.classList.add('page__locked')
})

events.on('modal:close', () => {
  page.classList.remove('page__locked')
})

/* Добавление в корзину */

events.on('card:basket', (data: Card) => {
  const product = catalogData.catalog.items.find((item) => item.id === data.id)

  appState.addProduct(product)

  const indexProduct = appState.getBasket.products.indexOf(product) + 1

  basket.total = appState.getBasket.products.reduce((amount, product) => amount + product.price, 0)

  const basketItemCard = new Card(cloneTemplate(cartItemTemplate), events)

  const productCard = basketItemCard.render({
    title: product.title,
    price: product.price,
    indexCard: indexProduct,
    id: product.id
  })

  basket.list.append(productCard)
  events.emit('basket:update')
  modal.close()
  console.log(appState)
})

/* Удаление товара из корзины */

events.on('basket:delete product', (data: Card) => {
  const product = appState.getBasket.products.find((item) => item.id === data.id)
  const indexProduct = appState.getBasket.products.indexOf(product)

  appState.removeProduct(indexProduct)
  events.emit('basket:update', basket.list)

  const item = basket.list.querySelector(`[data-id="${data.id}"]`)
  item.remove()
  console.log(appState)
})

/* Обновление корзины */

events.on('basket:update', () => {
  basket.updateIndexElements(basket.getItems, appState.getBasket.products)

  basket.counter = appState.getBasket.products.length
  basket.products = appState.getBasket.products
  basket.total = appState.getBasket.products.reduce((amount, product) => amount + product.price, 0)

  if (appState.getBasket.products.length === 0) {
    basket.products = null
  }
})

events.on('basket:clear', () => {
  basket.clear()
})
console.log(appState)
/* Открытие корзины */

events.on('basket:open', () => {
  modal.render({ content: basket.render() })
})

/* Формы */

events.on('form:order', () => {
  modal.render({ content: formOrder.render() })
})

events.on('form:submit', () => {
  modal.render({ content: formContacts.render() })
})

events.on('form:payment', (event: FormOrder) => {
  appState.getOrderData.paymentMethod = event.paymentMethod
  formOrder.paymentMethod = appState.getOrderData.paymentMethod
  formOrder.validate()
})

events.on('form:input', (event: HTMLInputElement) => {
  switch (event.name) {
    case 'address':
      appState.getOrderData.address = event.value
      formOrder.address = appState.getOrderData.address
      formOrder.validate()
      return
    case 'email':
      appState.getOrderData.email = event.value
      formContacts.email = appState.getOrderData.email
      formContacts.validate()
      return
    case 'phone':
      appState.getOrderData.phone = event.value
      formContacts.phone = appState.getOrderData.phone
      formContacts.validate()
      return
  }
})

events.on('form:complete', () => {
  const success = new Success(cloneTemplate(successTemplate), events)

  success.amount = appState.getBasket.products.reduce((amount, product) => amount + product.price, 0)

  modal.render({ content: success.render() })
  console.log(appState)
 // appState.clear()
  events.emit('basket:clear')
})