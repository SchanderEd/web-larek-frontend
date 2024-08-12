import './scss/styles.scss';
import { EventEmitter, IEvents } from './components/base/events';
import { IApi, ICatalog, IProduct } from './types';
import { Api } from './components/base/api';
import { API_URL, settings } from './utils/constants';
import { AppApi } from './components/Api';
import { Catalog } from './components/Catalog';
import { Card } from './components/Card';
import { cloneTemplate, ensureAllElements, ensureElement } from './utils/utils';
import { Modal } from './components/common/Modal';
import { Basket } from './components/Basket';

/* Темплейты */
const cardTemplate: HTMLTemplateElement = document.querySelector('#card-catalog')
const cardModalTemplate: HTMLTemplateElement = document.querySelector('#card-preview')
const cartTemplate: HTMLTemplateElement = document.querySelector('#basket')
const cartItemTemplate: HTMLTemplateElement = document.querySelector('#card-basket')

const events = new EventEmitter();

const baseApi: IApi = new Api(API_URL, settings)
const api = new AppApi(baseApi)

const modal = new Modal(ensureElement<HTMLElement>('#modal-container'), events);
const basket = new Basket(cloneTemplate(cartTemplate), events);
const catalogData = new Catalog(events)

events.onAll((event) => {
  console.log(event.eventName, event.data)
})

const gallery = document.querySelector('.gallery')
const page = document.querySelector('.page')

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

events.on('card:select', (data: Card) => {
  const card = new Card(cloneTemplate(cardModalTemplate), events)
  const product = findProduct(catalogData, data)

  modal.render({
    content: card.render({
      title: product.title,
      image: product.image,
      description: product.description,
      category: product.category,
      price: product.price,
      id: product.id,
    })
  });

  page.classList.add('page__locked')
})

events.on('modal:close', () => {
  page.classList.remove('page__locked')
})

events.on('card:basket', (data: Card) => {
  const product = findProduct(catalogData, data)

  const basketItemCard = new Card(cloneTemplate(cartItemTemplate), events)
  const productCard = basketItemCard.render({
    title: product.title,
    price: product.price,
  })

  //basket.cartList.append(productCard)
  
  console.log(productCard)
})

events.on('basket:open', () => {
  modal.render({ content: basket.render() })
})