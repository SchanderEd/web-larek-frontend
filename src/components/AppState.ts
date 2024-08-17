import { IFormOrder, IProduct } from "../types";
import { IBasket } from "./Basket";

export interface IAppState {
  basket: IBasket,
  orderData: IFormOrder
}

export class AppState implements IAppState {
  protected _basket: IBasket;
  protected _orderData: IFormOrder;

  constructor(basket: IBasket, orderData: IFormOrder) {
    this._basket = basket
    this._orderData = orderData
  }

  set basket(basket: IBasket) {
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

  addProduct(product: IProduct) {
    this._basket.products.push(product)
  }

  removeProduct(indexProduct: number) {
    this._basket.products.splice(indexProduct, 1)
  }

  clear() {
    this._basket.products.splice(0, this._basket.products.length)
    this._orderData.address = ''
    this._orderData.email = ''
    this._orderData.paymentMethod = ''
    this._orderData.phone = ''
  }
}