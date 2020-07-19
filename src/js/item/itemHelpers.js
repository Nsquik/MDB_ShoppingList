import { addEvent } from '@js/utils';
import storageFactory from '@js/storage';
import UI from '@js/UI';

const storage = storageFactory();

// eslint-disable-next-line import/prefer-default-export
export const createInfoElements = () => {
  const nodesList = document.createDocumentFragment();
  const itemQuan = document.createElement('div');
  const itemQuanType = document.createElement('div');
  const itemCat = document.createElement('div');
  const itemId = document.createElement('div');

  return { nodesList, itemQuan, itemQuanType, itemCat, itemId };
};

export const addDeleteEvent = addEvent('click', (e) => {
  const currCat = storage.getCurrentCategory();
  storage.removeItem(currCat, parseInt(e.target.id, 10));

  currCat && UI().renderWithoutCheck(currCat);
});
