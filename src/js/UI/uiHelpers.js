const itemsList = document.querySelector('.items__list');
const info = document.querySelector('.items__info');
const categoryInfo = document.querySelector('.items__category');

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
