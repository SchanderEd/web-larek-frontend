import { IProduct } from "../types";
import { createElement } from "../utils/utils";
import { Component } from "./base/components";
import { IEvents } from "./base/events";

interface IBasketStore {
  products: IProduct[] | null
  total: number
}

export class BasketStore implements IBasketStore {
  products;
  total;

  constructor(products: IProduct[] | undefined, total: number) {
    this.products = products
    this.total = total
  }
}

interface IBasketView {
  items: IProduct[]
  total: number
}

export class Basket extends Component<IBasketStore>{
  protected _products: IProduct[] | null;

  protected cartButton: HTMLButtonElement
  cartList: HTMLUListElement
  protected cartCounter: HTMLSpanElement
  protected orderBtn: HTMLButtonElement
  protected cartAmount: HTMLSpanElement

  constructor(protected container: HTMLElement, protected events: IEvents) {
    super(container)

    this.cartButton = document.querySelector('.header__basket')
    this.cartCounter = document.querySelector('.header__basket-counter')
    this.cartList = this.container.querySelector('.basket__list')
    this.cartAmount = this.container.querySelector('.basket__price')
    this.orderBtn = this.container.querySelector('.basket__button')

    this.cartButton.addEventListener('click', () => {
      events.emit('basket:open')
    })
  }

  set total(total: number) {
    this.cartAmount.textContent = `${String(total)} синапсов`
  }

  set products(products: IProduct[]) {
    this._products = products

    if (products) {
      this.orderBtn.disabled = false

      const emptyMessage = this.cartList.querySelector('.empty__basket')

      if (emptyMessage) {
        emptyMessage.remove()
      }
      
    } else {
      this.orderBtn.disabled = true
      this.cartList.append(createElement<HTMLParagraphElement>('p', {
        textContent: 'Корзина пуста', className: 'empty__basket'
      }));
    }
  }

  set counter(counter: number) {
    this.cartCounter.textContent = String(counter)
  }
}