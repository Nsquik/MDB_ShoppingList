/* eslint-disable func-style */
/* eslint-disable indent */

import { appendToParent, loopCategory } from '@js/utils';
import storageFactory from '@js/storage';
import ItemBuilder from '@js/item/ItemBuilder';
import { setCategory, setInfo, resetList, getItemsList } from '@js/UI/uiHelpers';

const storage = storageFactory();

const UI = function () {
  const renderList = (category) => {
    // eslint-disable-next-line camelcase
    loopCategory(category, ({ item, id, category, quantity, quantity_type }) => {
      const article = new ItemBuilder(id)
        .withName(item)
        .withInfo(quantity, quantity_type, category, id)
        .withDelete()
        .build();

      appendToParent(getItemsList(), article);
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
