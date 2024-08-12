import { IProduct } from "../types";
import { CDN_URL } from "../utils/constants";
import { Component } from "./base/components";
import { IEvents } from "./base/events";

export class Card extends Component<IProduct>{
  protected cardId: string
  protected events: IEvents
 
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

  constructor(protected container: HTMLElement, events: IEvents) {
    super(container)

    this.events = events
    this.card = this.container
    this.galleryButton = this.container
    this.cardTitle = this.container.querySelector('.card__title')
    this.cardCategory = this.container.querySelector('.card__category')
    this.cardImg = this.container.querySelector('.card__image')
    this.cardPrice = this.container.querySelector('.card__price')
    this.cardBasketBtn = this.container.querySelector('.card__button')
    this.cardDescription = this.container.querySelector('.card__text')
    this.deleteProductBtn = this.container.querySelector('.basket__item-delete')

    if (this.galleryButton.classList.contains('gallery__item')) {
      this.galleryButton.addEventListener('click', () => {
        this.events.emit('card:select', { id: this.id })
      })
    }

    if (this.cardBasketBtn) {
      this.cardBasketBtn.addEventListener('click', () => {
        this.events.emit('card:basket', { id: this.id },)
      })
    }
  }

  set price(price: number) {
    if (price === null) {
      this.cardPrice.textContent = 'Бесценно'
    } else {
      this.cardPrice.textContent = String(price)
    }
  }

  set altImg(alt: string) {
    this.cardImg.alt = alt
  }

  set image(link: string) {
    this.cardImg.src = `${CDN_URL}${link}`
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
    this.cardId = id;
  }

  get id(): string {
    return this.cardId;
  }
}