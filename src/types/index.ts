import { ApiPostMethods } from '../components/base/api';
import { IEvents } from '../components/base/events';

export interface IProduct {
	id: string;
	title: string;
	category: string;
	price: number | null;
	image: string;
	description: string;
}

export interface ICatalog {
	items: IProduct[]
	total: number
}

export interface ICatalogData {
	catalog: ICatalog
	events: IEvents
}

export interface IModal {
	modal: HTMLElement;
	elForClose: HTMLButtonElement;
	open(): void;
	close(): void;
}

export interface IModalWithForm extends IModal {
	submitButton: HTMLButtonElement;
	_form: HTMLFormElement;
	formName: string;
	inputs: NodeListOf<HTMLInputElement>;
	handleSubmit: Function;
	errors: Record<string, HTMLElement>;
	setValid(isValid: boolean): void;
	getInputValues(): Record<string, string>;
	setInputValues(data: Record<string, string>): void;
	setError(data: {
		field: string;
		value: string;
		validInformation: string;
	}): void;
	showInputError(field: string, errorMessage: string): void;
	hideInputError(field: string): void;
	close(): void;
	get form(): HTMLElement;
}

export interface ICardProduct {
	id: string
	container: HTMLElement;
	category: HTMLSpanElement;
	title: HTMLHeadingElement;
	img: HTMLImageElement;
	price: HTMLSpanElement;
}

export interface IModalProduct extends IModal {
	elForOpen: HTMLElement;
	basketButton: HTMLButtonElement;
}

export interface IFormOrder {
	paymentMethod: string;
	address: string;
	email: string;
	phone: string;
}

export interface ISuccesOrder {
	amount: number | null;
}

export interface ISuccesOrderModal {
	amount: HTMLSpanElement;
}

export interface ICatalogView {
	catalogList: HTMLUListElement;
}

export interface IBasketView {
	counter: HTMLSpanElement;
	products: HTMLUListElement;
	deleteProductButton: HTMLButtonElement;
	amount: HTMLSpanElement;
	buttonForOrder: HTMLButtonElement;
}

export interface IEventEmmitter {
	emit: (event: string, data: unknown) => void;
}

export interface IViewConstructor {
	new(container: HTMLElement, events?: IEventEmmitter): IView;
}

export interface IView {
	render(data?: object): HTMLElement;
}

export interface IApi {
	baseUrl: string
	get<T>(uri: string): Promise<T>
	post<T>(uri: string, data: object, method?: ApiPostMethods): Promise<T>
}