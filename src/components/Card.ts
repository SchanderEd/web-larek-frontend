import { IProduct } from "../types";
import { CDN_URL } from "../utils/constants";
import { Component } from "./base/components";
import { IEvents } from "./base/events";

interface ICardView extends IProduct {
  indexCard: number
  isDisabledBasketBtn: boolean
}

export class Card extends Component<ICardView>{
  protected cardId: string
  protected events: IEvents

  protected _isDisabledBasketBtn: boolean
  protected _indexCard: HTMLElement;
  protected card: HTMLElement
  protected galleryButton: HTMLElement
  protected cardTitle: HTMLHeadingElement
  protected cardCategory: HTMLElement
  protected cardImg: HTMLImageElement
  protected cardPrice: HTMLElement
  protected cardDescription: HTMLElement
  protected cartButton: HTMLButtonElement
  protected deleteProductBtn: HTMLButtonElement
  protected cardBasketBtn: HTMLButtonElement

  constructor(protected container: HTMLElement, events: IEvents, isDisabledBtn?: boolean) {
    super(container)

    this.events = events
    this.card = this.container
    this.galleryButton = this.container
    this._indexCard = this.container.querySelector('.basket__item-index');
    this.cardTitle = this.container.querySelector('.card__title')
    this.cardCategory = this.container.querySelector('.card__category')
    this.cardImg = this.container.querySelector('.card__image')
    this.cardPrice = this.container.querySelector('.card__price')
    this.cardBasketBtn = this.container.querySelector('.card__button')
    this.cardDescription = this.container.querySelector('.card__text')
    this.deleteProductBtn = this.container.querySelector('.basket__item-delete')
    this._isDisabledBasketBtn = isDisabledBtn

    if (this.galleryButton.classList.contains('gallery__item')) {
      this.galleryButton.addEventListener('click', () => {
        this.events.emit('card:select', { id: this.id })
      })
    }

    if (this.cardBasketBtn) {

      if (this._isDisabledBasketBtn) {
        this.cardBasketBtn.disabled = true
        return
      }

      this.cardBasketBtn.disabled = false
      this.cardBasketBtn.addEventListener('click', () => {
        this.events.emit('card:basket', { id: this.id },)
      })

    }
  }

  set price(price: number) {
    if (price === null) {
      this.cardPrice.textContent = 'Бесценно'
    } else {
      this.cardPrice.textContent = `${String(price)} синапсов`
    }
  }

  set indexCard(value: string) {
    this._indexCard.textContent = value;
  }

  set image(link: string) {
    this.cardImg.src = `${CDN_URL}${link}`
    this.cardImg.alt = this.cardTitle.textContent
  }

  set category(category: string) {
    this.cardCategory.textContent = category
  }

  set description(description: string) {
    this.cardDescription.textContent = description
  }

  set title(title: string) {
    this.cardTitle.textContent = title
  }

  set id(id: string) {
    this.container.dataset.id = id
    this.cardId = id;
  }

  get id(): string {
    return this.cardId;
  }
}