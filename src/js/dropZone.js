/* eslint-disable indent */
import { addEvent } from '@js/utils';
import UI from '@js/UI';
import storageFactory from './storage';

const dropZone = () => {
  const zone = document.getElementById('holder');
  const ui = UI();
  const storage = storageFactory();

  const renderUI = (category) => {
    const items = storageFactory().getItems(category);

    storage.getCurrentCategory() === category
      ? null
      : (() => {
          if (items.length) {
            ui.reset();
            storage.setCurrentCategory(category);
            ui.render(items);
          } else {
            ui.reset();
            console.log('no items');
          }
        })();
  };

  const addOnDrop = addEvent('drop', (e) => {
    e.preventDefault();
    e.preventDefault();
    renderUI(e.dataTransfer.getData('text'));
    zone.classList.remove('drop__zone--in');
  });

  const addOnDragOver = addEvent('dragover', (e) => {
    e.preventDefault();
    e.stopPropagation();
  });
  const addOnDragEnter = addEvent('dragenter', (e) => {
    e.preventDefault();
    e.stopPropagation();

    zone.classList.add('drop__zone--in');
  });

  const addOnDragLeave = addEvent('dragleave', (e) => {
    e.preventDefault();
    e.stopPropagation();

    zone.classList.remove('drop__zone--in');
  });

  return {
    initDropZone: () => {
      addOnDragEnter(zone);
      addOnDrop(zone);
      addOnDragOver(zone);
      addOnDragLeave(zone);
    },
  };
};

export default dropZone;
