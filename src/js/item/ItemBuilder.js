/* eslint-disable camelcase */
import { appendToParent } from '@js/utils';

class ItemBuilder {
  constructor(id) {
    this.id = id;
  }

  withDelete = () => {
    const deleteButton = document.createElement('div');
    deleteButton.classList.add('item__delete');
    this.deleteButton = deleteButton;
    return this;
  };

  withName = (name) => {
    const nameHeading = document.createElement('h1');
    nameHeading.classList.add('item__name');
    nameHeading.textContent = name;
    nameHeading.textContent;

    this.nameHeading = nameHeading;
    return this;
  };

  withInfo = (quantity, quantity_type, category) => {
    const nodesList = document.createDocumentFragment();

    const itemQuan = document.createElement('div');
    const itemQuanType = document.createElement('div');
    const itemCat = document.createElement('div');
    const itemId = document.createElement('div');

    appendToParent(
      nodesList,
      itemQuan,
      { id: this.id, class: 'item__quantity' },
      `Ilość: ${quantity}`
    );
    appendToParent(
      nodesList,
      itemQuanType,
      { id: this.id, class: 'item__quantity-type' },
      `Jednostka: ${quantity_type}`
    );
    appendToParent(
      nodesList,
      itemCat,
      { id: this.id, class: 'item__category' },
      `Kategoria: ${category}`
    );
    appendToParent(nodesList, itemId, { id: this.id, class: 'item__category' }, `ID: ${this.id}`);

    this.itemInfoNodes = nodesList.children;
    return this;
  };

  build = () => {
    const article = document.createElement('article');
    const itemInfo = document.createElement('section');

    article.classList.add('item');

    const nodesList = document.createDocumentFragment();

    //  Item heading append
    appendToParent(nodesList, this.deleteButton);
    appendToParent(nodesList, this.nameHeading);
    appendToParent(nodesList, itemInfo);

    [...nodesList.children].forEach((node) => {
      appendToParent(article, node);
    });

    // Item info append
    const infoNodes = [...this.itemInfoNodes];

    infoNodes.forEach((node) => {
      appendToParent(itemInfo, node);
    });

    return article;
  };
}

export default ItemBuilder;
