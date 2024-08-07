import './scss/styles.scss';
import './components/catalog/catalog.ts'
import { ICatalog } from './types';
import { createCard } from './components/card/card';
import { getCatalog } from './components/catalog/catalog';

const renderCards = async () => {
  const gallery = document.querySelector('.gallery')

  try {
    const catalog: ICatalog = await getCatalog();

    for (let catalogItem of catalog.items) {
      const card = createCard(catalogItem);
      gallery.appendChild(card.container);
    }
  }
  catch (err) {
    gallery.textContent = `Произошла ошибка: ${err}`
  }
}

renderCards()