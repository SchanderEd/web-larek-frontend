import { IApi, ICatalog } from "../types";

export class AppApi {
  private _baseApi: IApi

  constructor(baseApi: IApi) {
    this._baseApi = baseApi
  }

  getCatalog(): Promise<ICatalog> {
    return this._baseApi.get<ICatalog>('/product').then((catalog: ICatalog) => catalog)
  }
}