import { IFormOrder, IProduct } from "../types";
import { IBasketStore } from "./Basket";

export interface IAppState {
  basket: IBasketStore,
  orderData: IFormOrder
}

export class AppState implements IAppState {
  protected _basket: IBasketStore;
  protected _orderData: IFormOrder;

  constructor(basket: IBasketStore, orderData: IFormOrder) {
    this._basket = basket
    this._orderData = orderData
  }

  set basket(basket: IBasketStore) {
    this._basket = basket
  }

  get getBasket() {
    return this._basket
  }

  set orderData(orderData: IFormOrder) {
    this._orderData = orderData
  }

  get getOrderData() {
    return this._orderData
  }

  clear() {
    this._basket.products.splice(0, this._basket.products.length)
  }
}