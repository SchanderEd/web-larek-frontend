import './scss/styles.scss';
import { EventEmitter, IEvents } from './components/base/events';
import { IApi, IProduct } from './types';
import { Api } from './components/base/api';
import { API_URL, settings } from './utils/constants';
import { AppApi } from './components/Api';
import { Catalog } from './components/Catalog';
import { Card } from './components/Card';
import { CatalogContainer } from './components/CatalogContainer';
import { cloneTemplate, ensureAllElements, ensureElement } from './utils/utils';
import { Modal } from './components/common/Modal';
//import { CardModal } from './components/cardModal';

const events = new EventEmitter();

const baseApi: IApi = new Api(API_URL, settings)
const api = new AppApi(baseApi)

const modal = new Modal(ensureElement<HTMLElement>('#modal-container'), events);
//const catalogContainer = new CatalogContainer(document.querySelector('.gallery'))
const catalogData = new Catalog(events)

events.onAll((event) => {
  console.log(event.eventName, event.data)
})

const gallery = document.querySelector('.gallery')
const page = document.querySelector('.page')

/* Темплейты */
const cardTemplate: HTMLTemplateElement = document.querySelector('#card-catalog')
const cardModalTemplate: HTMLTemplateElement = document.querySelector('#card-preview')

const modalContainer: HTMLElement = document.querySelector('#modal-container')

/* Получение каталога */

Promise.all([api.getCatalog()])
  .then(([catalog]) => {
    catalogData._catalog = catalog
    events.emit('catalog:loaded', catalogData)
  })
  .catch((err) => {
    gallery.textContent = 'Что-то пошло не так :('
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

events.on('card:select', (data: Card) => {
  const card = new Card(cloneTemplate(cardModalTemplate), events)
  const product = catalogData.catalog.items.find((item) => item.id === data.id)

  modal.render({
    content: card.render({
      title: product.title,
      image: product.image,
      description: product.description,
      category: product.category,
      price: product.price
    })
  });

page.classList.add('page__locked')
})

events.on('modal:close', () => {
 page.classList.remove('page__locked')
})