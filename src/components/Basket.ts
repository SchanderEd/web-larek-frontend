import { createElement } from "../utils/utils";
import { Component } from "./base/components";
import { IEvents } from "./base/events";

interface IBasket {
  items: HTMLElement[]
  total: number
}

export class Basket extends Component<IBasket>{

  protected cartButton: HTMLButtonElement
  cartList: HTMLUListElement
  protected cartCounter: HTMLSpanElement

  constructor(protected container: HTMLElement, protected events: IEvents) {
    super(container)

    this.cartButton = document.querySelector('.header__basket')
    this.cartCounter = document.querySelector('.header__basket-counter')
    this.cartList = this.container.querySelector('.basket__list')

    this.cartButton.addEventListener('click', () => {
      events.emit('basket:open')
    })

    this.items = [];
  }

  set items(items: HTMLElement[]) {
    if (items.length) {
      this.cartList.append(...items);
    } else {
      this.cartList.append(createElement<HTMLParagraphElement>('p', {
        textContent: 'Корзина пуста'
      }));
    }
  }

  set total(total: number) {
    this.cartCounter.textContent = String(total)
  }
}