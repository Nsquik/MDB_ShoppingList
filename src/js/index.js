import * as mdb from 'mdb-ui-kit';
import './formBuilder';
import storageFactory from './storage';

const storage = storageFactory();
storage.initializeCategories();

export default mdb;
