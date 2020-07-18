import * as mdb from 'mdb-ui-kit';
import '@js/form/formBuilder';
import storageFactory from '@js/storage';
import categoryPicker from './categoryPicker';

const storage = storageFactory();
storage.initializeCategories();
const catPicker = categoryPicker();
catPicker.initCategories();

export default mdb;
