import { ICatalog, ICatalogData } from "../types";
import { IEvents } from "./base/events";

export class Catalog implements ICatalogData {
  _catalog: ICatalog
  preview: string | null
  events: IEvents

  constructor(events: IEvents) {
    this.events = events
  }

  set products(products: ICatalog) {
    this._catalog.items = products.items
    this.events.emit('products:changed')
  }

  get catalog():ICatalog {
    return this._catalog
  }
}