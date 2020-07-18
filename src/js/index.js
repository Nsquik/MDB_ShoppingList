import * as mdb from 'mdb-ui-kit';
import '@js/form/formBuilder';
import storageFactory from '@js/storage';

const storage = storageFactory();
storage.initializeCategories();

export default mdb;
