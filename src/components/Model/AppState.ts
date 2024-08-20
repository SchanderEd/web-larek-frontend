import { IAppState, IBasket, IFormOrder, IProduct } from '../../types';

export class AppState implements IAppState {
	protected _basket: IBasket;
	protected _orderData: IFormOrder;

	constructor(basket: IBasket, orderData: IFormOrder) {
		this._basket = basket;
		this._orderData = orderData;
	}

	set basket(basket: IBasket) {
		this._basket = basket;
	}

	get getBasket() {
		return this._basket;
	}

	set orderData(orderData: IFormOrder) {
		this._orderData = orderData;
	}

	set paymentMethod(paymentMethod: string) {
		this._orderData.paymentMethod = paymentMethod
	}

	get paymentMethod() {
		return this._orderData.paymentMethod
	}

	set address(address: string) {
		this._orderData.address = address
	}

	get address() {
		return this._orderData.address
	}

	set email(email: string) {
		this._orderData.email = email
	}

	get email() {
		return this._orderData.email
	}

	set phone(phone: string) {
		this._orderData.phone = phone
	}

	get phone() {
		return this._orderData.phone
	}

	getIdItems(): string[] {
		const itemsId: string[] = [];

		this._basket.products.map((item) => {
			if (item.price === null) {
				return
			}

			itemsId.push(item.id);
		});

		return itemsId;
	}

	getTotalBasket(): number {
		return this._basket.products.reduce((amount, product) => amount + product.price, 0);
	}

	addProduct(product: IProduct) {
		this._basket.products.push(product);
	}

	removeProduct(indexProduct: number) {
		this._basket.products.splice(indexProduct, 1);
	}

	clear() {
		this._basket.products = []
	}
}
