export interface IProduct {
	id: string;
	title: string;
	category: string;
	price: number;
	image: string;
	description: string;
}

export class Product implements IProduct {
	id: string;
	title: string;
	category: string;
	price: number;
	image: string;
	description: string;

	constructor(
		id: string,
		title: string,
		category: string,
		price: number,
		image: string,
		description: string
	) {
		this.id = id;
		this.title = title;
		this.category = category;
		this.price = price;
		this.image = image;
		this.description = description;
	}
}

export interface ICatalog {
	items: IProduct[];
	setItems(items: IProduct[]): void;
	getProduct(id: string): IProduct;
}

export interface IBasket {
	items: Map<string, number>;
	counter: number;
	addProduct(id: string): void;
	removeProduct(id: string): void;
}

export class Basket implements IBasket {
	items: Map<string, number> = new Map();
	counter: number;

	addProduct(id: string): void {
		if (!this.items.has(id)) this.items.set(id, 1);
		this.items.set(id, this.items.get(id)! + 1);
		this.counter++;
	}
	removeProduct(id: string): void {
		if (!this.items.has(id)) return;
		if (this.items.get(id)! > 0) {
			this.items.set(id, this.items.get(id)! - 1);
			this.counter--;
			if (this.items.get(id) === 0) {
				this.items.delete(id);
				this.counter = 0;
			}
		}
	}
}

export enum Modals {
	productModal,
	basketModal,
	paymentModal,
	successOrderModal,
	contactsModal,
}

export interface Modal {
	modal: Modals;
	elForOpen: HTMLElement;
	elForClose: HTMLButtonElement;
	openModal(modal: Modals): void;
	closeModal(modal: Modals): void;
}

export interface IBuyers {
	paymentMethod: string;
	address: string;
	email: string;
	phone: string;
}

export interface IEventEmmitter {
	emit: (event: string, data: unknown) => void;
}

export interface IViewConstructor {
	new (container: HTMLElement, events?: IEventEmmitter): IView;
}

export interface IView {
	render(data?: object): HTMLElement;
}
