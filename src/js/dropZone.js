import { addEvent } from '@js/utils';

const dropZone = () => {
  const zone = document.getElementById('holder');
  console.log(zone);
  const addOnDrop = addEvent('drop', (e) => {
    e.preventDefault();
    e.preventDefault();
    console.log(e);
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