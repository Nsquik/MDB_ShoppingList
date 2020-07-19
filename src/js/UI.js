/* eslint-disable indent */

import { appendToParent, loopCategory } from '@js/utils';
import storageFactory from './storage';

const storage = storageFactory();

const UI = () => {
  const items = document.querySelector('.items__list');
  const info = document.querySelector('.items__info');

  const setInfo = (text) => {
    info.textContent = text;
  };
  const resetList = () => {
    items.innerHTML = '';
  };

  const renderList = (category) => {
    loopCategory(category, ({ item }) => {
      const newItem = document.createElement('article');
      appendToParent(items, newItem, { class: 'item' }, item);
    });
  };

  // Resets lists and sets info to "PUSTO....."
  const ArrayEmpty = (category) => {
    resetList();
    storage.setCurrentCategory(category);
    setInfo('Pusto. Dodaj produkty');
  };

  // Renders list and deletes info
  const ArrayGood = (category) => {
    resetList();
    storage.setCurrentCategory(category);
    renderList(category);
    setInfo('');
  };

  const checkArray = (category, cb, cbbad) => {
    const items = storage.getItems(category);

    if (items && items.length) {
      cb();
    } else {
      cbbad();
    }
  };

  const checkAndRender = (category) => {
    let canRender = false;
    const cats = storage.getAllCategories();
    cats.forEach((cat) => {
      if (cat === category) {
        canRender = true;
      }
    });

    if (canRender) {
      storage.getCurrentCategory() === category
        ? null
        : (() => {
            checkArray(
              category,
              () => {
                ArrayGood(category);
              },
              () => {
                ArrayEmpty(category);
              }
            );
          })();
    }
  };

  return {
    // Checks array and dropped element.
    render: (category) => {
      if (category) {
        checkAndRender(category);
      } else {
        return;
      }
    },
    // Checks array only
    renderWithoutCheck: (category) => {
      if (category) {
        checkArray(
          category,
          () => {
            ArrayGood(category);
          },
          () => {
            ArrayEmpty(category);
          }
        );
      }
    },
    reset: () => {
      resetList();
    },
  };
};

export default UI;
