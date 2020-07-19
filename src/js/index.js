import * as mdb from 'mdb-ui-kit';
import '@js/form/formBuilder';
import storageFactory from '@js/storage';
import categoryPicker from '@js/categoryPicker';
import dropZone from '@js/dropZone';

const storage = storageFactory();
storage.initialize();
const catPicker = categoryPicker();
catPicker.initCategories();
const zone = dropZone();
zone.initDropZone();

export default mdb;
