import { IApi, ICatalog, IOrder } from '../types';

export class AppApi {
	private _baseApi: IApi;

	constructor(baseApi: IApi) {
		this._baseApi = baseApi;
	}

	getCatalog(): Promise<ICatalog> {
		return this._baseApi
			.get<ICatalog>('/product')
			.then((catalog: ICatalog) => catalog);
	}

	placeOrder(order: IOrder): Promise<IOrder> {
		return this._baseApi
			.post<IOrder>('/order', order)
			.then((res: IOrder) => res);
	}
}
