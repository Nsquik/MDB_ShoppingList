import { addEvent, changeSelected } from '@js/utils';
import UI from '@js/UI';

const select = document.querySelector('#form__category');

const dropZone = () => {
  const zone = document.getElementById('holder');
  const ui = UI();

  const addOnDrop = addEvent('drop', (e) => {
    e.preventDefault();
    e.preventDefault();
    const category = e.dataTransfer.getData('text');
    ui.render(category);

    changeSelected([...select.children], category);

    zone.classList.remove('drop__zone--in');
  });

  const addOnDragOver = addEvent('dragover', (e) => {
    e.preventDefault();
    e.stopPropagation();
  });
  const addOnDragEnter = addEvent('dragenter', (e) => {
    e.preventDefault();
    e.stopPropagation();
  });

  const addOnDragLeave = addEvent('dragleave', (e) => {
    e.preventDefault();
    e.stopPropagation();
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
