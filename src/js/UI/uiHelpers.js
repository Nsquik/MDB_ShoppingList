import storageFactory from '../storage';

const store = storageFactory();
const itemsList = document.querySelector('.items__list');
const info = document.querySelector('.items__info');
const categoryInfo = document.querySelector('.items__category');
const categoryQuantity = document.querySelector('.category__quantity');
const categoryQuantityKg = document.querySelector('.category__quantity-kg');
const categoryQuantityPieces = document.querySelector('.category__quantity-szt');

export const setCategory = (category) => {
  categoryInfo.textContent = category;
};

export const setInfo = (text) => {
  info.textContent = text;
};
export const resetList = () => {
  itemsList.innerHTML = '';
};

export const getItemsList = () => {
  return itemsList;
};

const filterCategoryItems = (filter) => {
  return function (list) {
    return list.filter(filter);
  };
};

const filterKgOnly = filterCategoryItems((item) => item.quantity_type === 'kg');
const filterPiecesOnly = filterCategoryItems((item) => item.quantity_type === 'szt');

export const setCategoryQuantity = (category) => {
  const items = store.getItems(category);
  categoryQuantity.innerHTML = `Aktualna wszystkich ilość produktów: ${items.length}`;
  const filteredKg = filterKgOnly(items);
  const filteredPieces = filterPiecesOnly(items);
  const valueKg = filteredKg.reduce((accumulator, item) => {
    return accumulator + parseInt(item.quantity, 10);
  }, 0);
  const valuePcs = filteredPieces.reduce((accumulator, item) => {
    return accumulator + parseInt(item.quantity, 10);
  }, 0);
  categoryQuantityKg.innerHTML = `Ilość (kg): ${valueKg} kg.`;
  categoryQuantityPieces.innerHTML = `Ilość (szt): ${valuePcs} szt.`;
};
