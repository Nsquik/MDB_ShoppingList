import { appendToParent } from '@js/utils';

const UI = () => {
  const items = document.querySelector('.items');
  const renderList = (list) => {
    list.forEach(({ item }) => {
      const newItem = document.createElement('article');
      appendToParent(items, newItem, { class: 'item' }, item);
    });
  };

  const resetList = () => {
    items.innerHTML = '';
  };

  return {
    render: (list) => {
      if (list) {
        renderList(list);
      } else {
        return;
      }
    },
    reset: () => {
      resetList();
    },
  };
};

export default UI;
