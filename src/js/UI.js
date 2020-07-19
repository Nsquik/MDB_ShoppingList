/* eslint-disable indent */

import { appendToParent, loopCategory } from '@js/utils';
import storageFactory from '@js/storage';
import ItemBuilder from '@js/item';

const storage = storageFactory();

const UI = () => {
  const itemsList = document.querySelector('.items__list');
  const info = document.querySelector('.items__info');
  const categoryInfo = document.querySelector('.items__category');

  const setCategory = (category) => {
    categoryInfo.textContent = category;
  };

  const setInfo = (text) => {
    info.textContent = text;
  };
  const resetList = () => {
    itemsList.innerHTML = '';
  };

  const renderList = (category) => {
    // eslint-disable-next-line camelcase
    loopCategory(category, ({ item, id, category, quantity, quantity_type }) => {
      const article = new ItemBuilder(id)
        .withName(item)
        .withInfo(quantity, quantity_type, category, id)
        .withDelete()
        .build();

      appendToParent(itemsList, article);

      // console.log(nodes);
    });
  };

  // Resets lists and sets info to "PUSTO....."
  const ArrayEmpty = (category) => {
    resetList();
    storage.setCurrentCategory(category);
    setCategory(category);
    setInfo('Pusto. Dodaj produkty');
  };

  // Renders list and deletes info
  const ArrayGood = (category) => {
    resetList();
    storage.setCurrentCategory(category);
    setCategory(category);
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
