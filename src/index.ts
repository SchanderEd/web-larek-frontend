import './scss/styles.scss';
import { EventEmitter } from './components/base/events';
import { IApi } from './types';
import { Api } from './components/base/api';
import { API_URL, settings } from './utils/constants';
import { AppApi } from './components/Api';
import { Catalog } from './components/Catalog';
import { Card } from './components/Card';
import { cloneTemplate, ensureAllElements, ensureElement } from './utils/utils';
import { Modal } from './components/common/Modal';
import { Basket, BasketStore } from './components/Basket';

/* Темплейты */
const cardTemplate: HTMLTemplateElement = document.querySelector('#card-catalog')
const cardModalTemplate: HTMLTemplateElement = document.querySelector('#card-preview')
const cartTemplate: HTMLTemplateElement = document.querySelector('#basket')
const cartItemTemplate: HTMLTemplateElement = document.querySelector('#card-basket')

const events = new EventEmitter();
const basketStore = new BasketStore([], null)
const baseApi: IApi = new Api(API_URL, settings)
const api = new AppApi(baseApi)
const catalogData = new Catalog(events)

const modal = new Modal(ensureElement<HTMLElement>('#modal-container'), events);
const basket = new Basket(cloneTemplate(cartTemplate), events);
basket.products = null

const gallery = document.querySelector('.gallery')
const page = document.querySelector('.page')

/*events.onAll((event) => {
  console.log(event.eventName, event.data)
})*/


/* Получение каталога */

Promise.all([api.getCatalog()])
  .then(([catalog]) => {
    catalogData._catalog = catalog
    events.emit('catalog:loaded', catalogData)
  })
  .catch((err) => {
    gallery.textContent = 'Что-то пошло не так :('
    console.log(err)
  })

events.on('catalog:loaded', () => { /* Получение начальных данных */
  for (let product of catalogData._catalog.items) {
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

const findProduct = (catalogData: Catalog, dataProduct: Card) => {
  const product = catalogData.catalog.items.find((item) => item.id === dataProduct.id)
  return product
} // Нужно как-то перенести в утилитарную функцию

/* Открытие карточки товара */

events.on('card:select', (data: Card) => {
  const product = findProduct(catalogData, data)
  let basketButtonState = false

  if (basketStore.products.some((item) => item.id === product.id)) {
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
  const product = findProduct(catalogData, data)

  basketStore.products.push(product)
  const indexProduct = basketStore.products.indexOf(product) + 1

  basket.total = basketStore.products.reduce((amount, product) => amount + product.price, 0)

  const basketItemCard = new Card(cloneTemplate(cartItemTemplate), events)

  const productCard = basketItemCard.render({
    title: product.title,
    price: product.price,
    indexCard: indexProduct,
    id: product.id
  })

  basket.cartList.append(productCard)
  events.emit('basket:update')
  modal.close()
})

/* Удаление товара из корзины */

events.on('basket:delete product', (data: Card) => {
  const product = findProduct(catalogData, data)
  const indexProduct = basketStore.products.indexOf(product)

  basketStore.products.splice(indexProduct, 1)
  events.emit('basket:update', basket.cartList)

  const item = basket.cartList.querySelector(`[data-id="${data.id}"]`)
  item.remove()
})

/* Обновление корзины */

events.on('basket:update', () => {
  const items = basket.cartList.querySelectorAll(`[data-id]`)

  items.forEach((item: HTMLElement) => {
    const itemId = item.dataset.id
    const product = basketStore.products.find((item) => item.id === itemId)
    const indexItem = basketStore.products.indexOf(product) + 1

    const indexEl = item.querySelector('.basket__item-index')
    indexEl.textContent = String(indexItem)
  })

  basket.counter = basketStore.products.length
  basket.products = basketStore.products
  basket.total = basketStore.products.reduce((amount, product) => amount + product.price, 0)

  if (basketStore.products.length === 0) {
    basket.products = null
  }
})

/* Открытие корзины */

events.on('basket:open', () => {
  console.log(basketStore.products)
  modal.render({ content: basket.render() })
})