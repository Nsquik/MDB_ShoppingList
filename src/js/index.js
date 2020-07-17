import * as mdb from 'mdb-ui-kit';
import './formBuilder';
import storageFactory from './storage';

const storage = storageFactory();
storage.initializeCategories();
storage.addItem('Owoce', {
  item: 'gang',
  quantity: 128,
  quantity_type: 'kg',
  category: 'owoce',
  id: 39821983,
});

storage.removeItem('Owoce', 39821983);

export default mdb;
