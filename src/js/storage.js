import { loopCategories } from '@js/utils';

const storageFactory = () => {
  // ======== PRIVATE =========

  const addToLocalStorage = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
    return JSON.stringify(value);
  };

  const getLocalStorage = (category) => {
    return JSON.parse(localStorage.getItem(category));
  };

  const removeFromLocalStorage = (category, itemId) => {
    const store = getLocalStorage(category);
    const foundItem = store.find((item) => {
      return parseInt(item.id, 10) === parseInt(itemId, 10);
    });

    if (foundItem) {
      return addToLocalStorage(category, [
        ...store.filter((item) => parseInt(item.id, 10) !== parseInt(foundItem.id, 10)),
      ]);
    }
    return foundItem;
  };

  const editFromLocalStorage = (category, itemId, payload) => {
    const store = getLocalStorage(category);
    // Tworzy nową tablice. Nie znalazłem bardziej optymalnego rozwiązania. Jeżeli id===itemId zwraca payload, jezeli nie to stary item. Id MUSZĄ BYĆ UNIKALNE.
    const newStore = store.map((item) => {
      return parseInt(item.id, 10) === parseInt(itemId, 10) ? { ...item, ...payload } : item;
    });
    return addToLocalStorage(category, newStore);
  };
  // ========= PUBLIC ==========
  return {
    initialize: () => {
      addToLocalStorage('currentCategory', null);
      loopCategories(({ name }) => {
        !getLocalStorage(name) && addToLocalStorage(name, []);
      });
    },
    addItem: (category, item) => {
      if (category && item) {
        addToLocalStorage(category, [...getLocalStorage(category), item]);
      }
    },
    removeItem: (category, itemId) => {
      if (category && itemId) {
        removeFromLocalStorage(category, itemId);
      } else {
        return;
      }
    },
    editItem: (category, itemId, payload) => {
      if (category && itemId && payload) {
        editFromLocalStorage(category, itemId, payload);
      } else {
        return;
      }
    },
    getItems: (category) => {
      return getLocalStorage(category);
    },
    getItem: (category, id) => {
      const catList = getLocalStorage(category);
      const foundItem = catList.find((item) => {
        return parseInt(item.id, 10) === parseInt(id, 10);
      });
      return foundItem;
    },
    getCurrentCategory: () => {
      return getLocalStorage('currentCategory');
    },
    setCurrentCategory: (category) => {
      addToLocalStorage('currentCategory', category);
    },
    getAllCategories: () => {
      return [...loopCategories((item) => item.name)];
    },
  };
};

export default storageFactory;
