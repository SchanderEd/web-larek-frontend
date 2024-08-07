import { ICardProduct, IProduct } from "../../types";

export const createCard = (product: IProduct) => { /* Функция создания карточки */
  const cardTemplate: HTMLTemplateElement = document.querySelector('#card-catalog');

  if (cardTemplate instanceof HTMLTemplateElement) {
    const template = cardTemplate.content;
    const cardElement = template.cloneNode(true) as HTMLElement

    const card: ICardProduct = {
      container: cardElement.querySelector('.card'),
      title: cardElement.querySelector('.card__title'),
      category: cardElement.querySelector('.card__category'),
      img: cardElement.querySelector('.card__image'),
      price: cardElement.querySelector('.card__price'),
    }

    card.title.textContent = product.title
    card.category.textContent = product.category
    card.img.src = `${process.env.API_ORIGIN}/content/weblarek/${product.image}`
    card.img.alt = product.title

    return card
  }
}