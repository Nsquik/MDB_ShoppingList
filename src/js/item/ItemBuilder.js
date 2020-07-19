/* eslint-disable camelcase */
import { appendToParent } from '@js/utils';
import { createInfoElements, addDeleteEvent } from '@js/item/itemHelpers';

class ItemBuilder {
  constructor(id) {
    this.id = id;
  }

  withDelete = () => {
    const deleteButton = document.createElement('div');
    deleteButton.classList.add('item__delete');
    deleteButton.id = this.id;
    addDeleteEvent(deleteButton);
    this.deleteButton = deleteButton;
    return this;
  };

  withEdit = () => {
    const editButton = document.createElement('div');
    editButton.classList.add('item__edit');
    editButton.id = this.id;
    editButton.textContent = 'Edytuj';
    this.editButton = editButton;
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
    const { nodesList, itemQuan, itemQuanType, itemCat, itemId } = createInfoElements();
    appendToParent(nodesList, itemQuan, { class: 'item__quantity' }, `Ilość: ${quantity}`);
    appendToParent(
      nodesList,
      itemQuanType,
      { class: 'item__quantity-type' },
      `Jednostka: ${quantity_type}`
    );
    appendToParent(nodesList, itemCat, { class: 'item__category' }, `Kategoria: ${category}`);
    appendToParent(nodesList, itemId, { class: 'item__category' }, `ID: ${this.id}`);

    this.itemInfoNodes = nodesList.children;
    return this;
  };

  build = () => {
    const article = document.createElement('article');
    const itemInfo = document.createElement('section');
    itemInfo.classList.add('item__info');
    itemInfo.id = this.id;

    article.classList.add('item');

    const nodesList = document.createDocumentFragment();

    //  Item heading append
    appendToParent(nodesList, this.deleteButton);
    appendToParent(nodesList, this.nameHeading);
    appendToParent(nodesList, this.editButton);
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
