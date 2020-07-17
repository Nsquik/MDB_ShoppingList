import { loopCategories } from './utlis';

const storageFactory = () => {
  // ======== PRIVATE =========
  const addToLocalStorage = (to, value) => {
    localStorage.setItem(to, JSON.stringify(value));
  };

  const getLocalStorage = (item) => {
    return JSON.parse(localStorage.getItem(item));
  };
  // ========= PUBLIC ==========
  return {
    initializeCategories: () => {
      loopCategories(({ name }) => {
        !getLocalStorage(name) && addToLocalStorage(name, []);
      });
    },
    addItem: (category, item) => {
      if (category && item) {
        addToLocalStorage(category, [...getLocalStorage(category), item]);
      } else {
        return;
      }
    },
  };
};

export default storageFactory;
