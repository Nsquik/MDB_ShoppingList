import { loopCategories } from './utlis';

const storageFactory = () => {
  //   const initialState = Object.assign({}, ...categories.map((item) => ({ [item.name]: [] })));
  const addToLocalStorage = (to, value) => {
    localStorage.setItem(to, JSON.stringify(value));
  };

  const getLocalStorage = (item) => {
    return localStorage.getItem(item);
  };

  return {
    initializeCategories: () => {
      loopCategories(({ name }) => {
        !getLocalStorage(name) && addToLocalStorage(name, []);
      });
    },
  };
};

export default storageFactory;
