import { loopCategories } from './utlis';

const storageFactory = () => {
  // ======== PRIVATE =========
  const addToLocalStorage = (category, value) => {
    localStorage.setItem(category, JSON.stringify(value));
  };

  const getLocalStorage = (category) => {
    return JSON.parse(localStorage.getItem(category));
  };

  const removeFromLocalStorage = (category, itemId) => {
    const store = getLocalStorage(category);
    const foundItem = store.find((item) => item.id === itemId);

    if (foundItem) {
      const newStore = store.filter((item) => item.id !== foundItem.id);
      addToLocalStorage(category, newStore);
    } else {
      return;
    }
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
    removeItem: (category, itemId) => {
      if (category && itemId) {
        removeFromLocalStorage(category, itemId);
      } else {
        return;
      }
    },
  };
};

export default storageFactory;
