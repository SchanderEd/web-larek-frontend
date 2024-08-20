import './scss/styles.scss';
import { EventEmitter } from './components/base/events';
import { IApi, IAppState, IOrder } from './types';
import { Api } from './components/base/api';
import { API_URL, settings } from './utils/constants';
import { AppApi } from './components/Model/AppApi';
import { Catalog } from './components/Model/Catalog';
import { Card } from './components/View/Card';
import { cloneTemplate, ensureElement } from './utils/utils';
import { Modal } from './components/common/Modal';
import { Basket } from './components/View/Basket';
import { FormContacts } from './components/View/FormContacts';
import { FormOrder } from './components/View/FormOrder';
import { Success } from './components/View/Success';
import { AppState } from './components/Model/AppState';

/* Темплейты */
const cardTemplate: HTMLTemplateElement =
	document.querySelector('#card-catalog');
const cardModalTemplate: HTMLTemplateElement =
	document.querySelector('#card-preview');
const cartTemplate: HTMLTemplateElement = document.querySelector('#basket');
const cartItemTemplate: HTMLTemplateElement =
	document.querySelector('#card-basket');
const orderTemplate: HTMLTemplateElement = document.querySelector('#order');
const contactsTemaplate: HTMLTemplateElement =
	document.querySelector('#contacts');
const successTemplate: HTMLTemplateElement = document.querySelector('#success');

const events = new EventEmitter();

const initialState: IAppState = {
	basket: {
		products: [],
	},
	orderData: {
		paymentMethod: '',
		address: '',
		email: '',
		phone: '',
	},
};

const appState = new AppState(initialState.basket, initialState.orderData);

const baseApi: IApi = new Api(API_URL, settings);
const api = new AppApi(baseApi);
const catalogData = new Catalog(null, events);

const modal = new Modal(ensureElement<HTMLElement>('#modal-container'), events);
const basket = new Basket(cloneTemplate(cartTemplate), events);
let counterBasket: number = appState.getBasket.products.length

const formOrder = new FormOrder(cloneTemplate(orderTemplate), events);
const formContacts = new FormContacts(cloneTemplate(contactsTemaplate), events);

const success = new Success(cloneTemplate(successTemplate), events);

const gallery = document.querySelector('.gallery');
const page = document.querySelector('.page');

/* Получение каталога */

api.getCatalog()
	.then((catalog) => {
		catalogData.catalog = catalog;
		basket.products = null;
		events.emit('catalog:loaded', catalogData);
	})
	.catch((err) => {
		gallery.textContent = 'Что-то пошло не так :(';
		console.log(err);
	});

events.on('catalog:loaded', () => {
	/* Получение начальных данных */
	for (const product of catalogData.catalog.items) {
		const card = new Card(cloneTemplate(cardTemplate), events);

		gallery.appendChild(
			card.render({
				title: product.title,
				image: product.image,
				category: product.category,
				price: product.price,
				id: product.id,
			})
		);
	}
});

/* Открытие карточки товара */

events.on('card:select', (data: Card) => {
	const product = catalogData.findProduct(data)
	let basketButtonState = false;

	if (appState.getBasket.products.some((item) => item.id === product.id)) {
		basketButtonState = true;
	}

	const card = new Card(
		cloneTemplate(cardModalTemplate),
		events,
		basketButtonState
	);

	modal.render({
		content: card.render({
			title: product.title,
			image: product.image,
			description: product.description,
			category: product.category,
			price: product.price,
			id: product.id,
		}),
	});

	events.emit('modal:open')
});

events.on('modal:open', () => {
	page.classList.add('page__locked');
})

events.on('modal:close', () => {
	page.classList.remove('page__locked');
});

/* Добавление в корзину */

events.on('card:basket', (data: Card) => {
	const product = catalogData.findProduct(data)

	appState.addProduct(product);

	const basketItemCard = new Card(cloneTemplate(cartItemTemplate), events);

	const productCard = basketItemCard.render({
		title: product.title,
		price: product.price,
		indexCard: basket.getIndexElement(appState.getBasket.products, product),
		id: product.id,
	});

	counterBasket++

	basket.renderItem(productCard)
	events.emit('basket:update');
	
	modal.close()
});

/* Удаление товара из корзины */

events.on('basket:delete product', (card: Card) => {
	const product = appState.getBasket.products.find(
		(item) => item.id === card.id
	);
	const indexProduct = appState.getBasket.products.indexOf(product);

	appState.removeProduct(indexProduct);
	basket.removeItem(card.id)

	counterBasket--

	events.emit('basket:update');
});

/* Обновление корзины */

events.on('basket:update', () => {
	basket.updateIndexElements(basket.getItems, appState.getBasket.products);

	basket.products = appState.getBasket.products;
	basket.total = appState.getTotalBasket();
	basket.counter = counterBasket

	if (appState.getBasket.products.length === 0) {
		basket.products = null;
	}
});

events.on('basket:clear', () => {
	basket.clear();
	counterBasket = 0
});
/* Открытие корзины */

events.on('basket:open', () => {
	modal.render({ content: basket.render() });
	events.emit('modal:open')
});

/* Формы */

events.on('form:order', () => {
	modal.render({ content: formOrder.render() });
});

events.on('form:submit', () => {
	modal.render({ content: formContacts.render() });
});

events.on('form:payment', (event: FormOrder) => {
	appState.paymentMethod = event.paymentMethod;
	formOrder.paymentMethod = appState.paymentMethod;
	formOrder.validate();
});

events.on('form:input', (event: HTMLInputElement) => {
	switch (event.name) {
		case 'address':
			appState.address = event.value;
			formOrder.address = appState.address;
			formOrder.validate();
			return;
		case 'email':
			appState.email = event.value;
			formContacts.email = appState.email;
			formContacts.validate();
			return;
		case 'phone':
			appState.phone = event.value;
			formContacts.phone = appState.phone;
			formContacts.validate();
			return;
	}
});

events.on('form:complete', () => {
	const order: IOrder = {
		items: appState.getIdItems(),
		payment: appState.paymentMethod,
		email: appState.email,
		phone: appState.phone,
		address: appState.address,
		total: appState.getTotalBasket(),
	};

	events.on('success:close', () => {
		modal.close()
	})

	api
		.placeOrder(order)
		.then((res) => {
			modal.render({ content: success.render() });
			success.amount = res.total;
			appState.clear();
			events.emit('basket:clear');
		})
		.catch((err) => {
			console.log(err);
		});
});
