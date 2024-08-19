import { IBasket, IProduct } from '../../types';
import { createElement } from '../../utils/utils';
import { Component } from '../base/components';
import { IEvents } from '../base/events';

export class Basket extends Component<IBasket> {
  protected _products: IProduct[] | null;

  protected _cartButton: HTMLButtonElement;
  protected _cartList: HTMLUListElement;
  protected _cartCounter: HTMLSpanElement;
  protected _orderBtn: HTMLButtonElement;
  protected _cartAmount: HTMLSpanElement;
  protected _cartItems: NodeList;

  constructor(protected container: HTMLElement, protected events: IEvents) {
    super(container);

    this._cartButton = document.querySelector('.header__basket');
    this._cartCounter = document.querySelector('.header__basket-counter');
    this._cartList = this.container.querySelector('.basket__list');
    this._cartAmount = this.container.querySelector('.basket__price');
    this._orderBtn = this.container.querySelector('.basket__button');

    this._cartButton.addEventListener('click', () => {
      events.emit('basket:open');
    });

    this._orderBtn.addEventListener('click', () => {
      events.emit('form:order');
    });
  }

  get getItems() {
    return this._cartList.querySelectorAll(`[data-id]`);
  }

  get list() {
    return this._cartList;
  }

  set total(total: number) {
    this._cartAmount.textContent = `${String(total)} синапсов`;
  }

  set products(products: IProduct[]) {
    this._products = products;

    if (products) {
      this._orderBtn.disabled = false;

      const emptyMessage = this._cartList.querySelector('.empty__basket');

      if (emptyMessage) {
        emptyMessage.remove();
      }
    } else {
      this._orderBtn.disabled = true;
      this._cartList.append(
        createElement<HTMLParagraphElement>('p', {
          textContent: 'Корзина пуста',
          className: 'empty__basket',
        })
      );
    }
  }

  set counter(counter: number) {
    this._cartCounter.textContent = String(counter);
  }

  renderItem(card: HTMLElement) {
    this._cartList.append(card)
  }

  removeItem(id: string) {
    const item = this._cartList.querySelector(`[data-id="${id}"]`);
    item.remove()
  }

  getIndexElement(basket: IProduct[], product: IProduct): number {
    return basket.indexOf(product) + 1;
  }

  updateIndexElements(items: NodeList, products: IProduct[]) {
    items.forEach((item: HTMLElement) => {
      const itemId = item.dataset.id;
      const product = products.find((item) => item.id === itemId);
      const indexItem = products.indexOf(product) + 1;

      const indexEl = item.querySelector('.basket__item-index');
      indexEl.textContent = String(indexItem);
    });
  }

  clear() {
    const items = this._cartList.querySelectorAll(`[data-id]`);

    items.forEach((item) => {
      item.remove();
    });

    this.counter = 0;
    this.total = 0;
    this.products = null;
  }
}
