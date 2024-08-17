import { ICatalog, ICatalogData } from "../types";
import { IEvents } from "./base/events";

export class Catalog implements ICatalogData {
  protected _catalog: ICatalog | null
  events: IEvents

  constructor(catalog: ICatalog, events: IEvents) {
    this.events = events
    this._catalog = catalog
  }

  set products(catalog: ICatalog) {
    this._catalog = catalog
    this.events.emit('products:changed')
  }

  get catalog(): ICatalog {
    return this._catalog
  }
}