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
	items: IProduct[];
	total: number;
}

export interface ICatalogData {
	catalog: ICatalog;
	events: IEvents;
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

export interface ICatalogView {
	catalogList: HTMLUListElement;
}

export interface IApi {
	baseUrl: string;
	get<T>(uri: string): Promise<T>;
	post<T>(uri: string, data: object, method?: ApiPostMethods): Promise<T>;
}

export interface IOrder {
	items: string[];
	payment: string;
	address: string;
	email: string;
	phone: string;
	total: number;
}
