export interface IProduct {
	id: string;
	title: string;
	category: string;
	price: number | null;
	image: string;
	description: string;
}

export interface ICatalog {
	items: IProduct[];
	setItems(items: IProduct[]): void;
	getProduct(id: string): IProduct;
}

export interface IBasket {
	items: IProduct[] | undefined;
	counter: number;
	addProduct(id: string): void;
	removeProduct(id: string): void;
}

export enum Modals {
	productModal,
	basketModal,
	paymentModal,
	successOrderModal,
	contactsModal,
}

export interface IModal {
	modal: Modals;
	openModal(modal: Modals): void;
	closeModal(modal: Modals): void;
}

export interface IFormOrder {
	paymentMethod: string;
	address: string;
	email: string;
	phone: string;
}

export interface ISuccesOrder {
	amount: number
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