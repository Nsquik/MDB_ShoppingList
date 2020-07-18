import * as mdb from 'mdb-ui-kit';
import '@js/form/formBuilder';
import storageFactory from '@js/storage';
import categoryPicker from './categoryPicker';
import dropZone from './dropZone';

const storage = storageFactory();
storage.initializeCategories();
const catPicker = categoryPicker();
catPicker.initCategories();

const zone = dropZone();
zone.initDropZone();

export default mdb;
