import * as mdb from 'mdb-ui-kit';
import '@js/form/formBuilder';
import storageFactory from '@js/storage';

const storage = storageFactory();
storage.initializeCategories();
storage.addItem('Owoce', {
  item: 'gang',
  quantity: 128,
  quantity_type: 'kg',
  category: 'owoce',
  id: 30,
});

storage.editItem('Owoce', 30, {
  item: 'Cola',
  quantity: 15,
  quantity_type: 'szt',
  category: 'Napoje',
  id: 32,
});

export default mdb;
