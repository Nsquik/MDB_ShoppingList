import { loopCategories, appendToParent, addEvent } from '@js/utils';
import config from '~/config';

const { categoryContainer } = config;

const categoryPicker = () => {
  const categoryList = document.getElementById(categoryContainer);
  const dropZone = document.getElementById('holder');

  const addDragStart = addEvent('dragstart', (e) => {
    e.dataTransfer.setData('text', e.target.id);
    dropZone.classList.add('drop__zone--in');
  });

  const addDragEnd = addEvent('dragend', () => {
    dropZone.classList.remove('drop__zone--in');
  });

  const addEventsToCategory = (el) => {
    addDragStart(el);
    addDragEnd(el);
  };

  return {
    initCategories: () => {
      loopCategories((category) => {
        const categoryItem = document.createElement('div');
        categoryItem.style.background = category.color;

        const addedNode = appendToParent(categoryList, categoryItem, {
          class: 'category__item',
          draggable: 'true',
          id: category.name,
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
