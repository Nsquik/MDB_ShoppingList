import { loopCategories, appendToParent, addEvent } from '@js/utlis';
import config from '~/config';

const { categoryContainer } = config;

const categoryPicker = () => {
  const categoryList = document.getElementById(categoryContainer);
  const addDragStart = addEvent('dragstart', () => {
    console.log('draguje');
  });
  const addEventsToCategory = (el) => {
    addDragStart(el);
  };

  return {
    initCategories: () => {
      loopCategories((category) => {
        const categoryItem = document.createElement('div');

        const addedNode = appendToParent(categoryList, categoryItem, {
          class: 'category__item',
          draggable: 'true',
          value: category.name,
        });

        addEventsToCategory(addedNode);

        const categoryItemText = document.createElement('span');
        appendToParent(
          addedNode,
          categoryItemText,
          { class: 'category__item-text' },
          category.name
        );
      });
    },
  };
};

export default categoryPicker;
