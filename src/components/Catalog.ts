import { ICatalog, ICatalogData, IProduct } from '../types';
import { IEvents } from './base/events';

export class Catalog implements ICatalogData {
  protected _catalog: ICatalog | null;
  events: IEvents;

  constructor(catalog: ICatalog, events: IEvents) {
    this.events = events;
    this._catalog = catalog;
  }

  set products(catalog: ICatalog) {
    this._catalog = catalog;
  }

  get catalog(): ICatalog {
    return this._catalog;
  }

  findProduct(data: IProduct) {
    return this.catalog.items.find((product) => product.id === data.id);
  }
}
