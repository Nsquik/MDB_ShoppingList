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
      addToLocalStorage(category, [...store.filter((item) => item.id !== foundItem.id)]);
    } else {
      return;
    }
  };

  const editFromLocalStorage = (category, itemId, payload) => {
    const store = getLocalStorage(category);

    // Tworzy nową tablice. Nie znalazłem bardziej optymalnego rozwiązania. Jeżeli id===itemId zwraca payload, jezeli nie to stary item. Id MUSZĄ BYĆ UNIKALNE.
    const newStore = store.map((item) => (item.id === itemId ? { ...payload } : item));
    addToLocalStorage(category, newStore);
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
    editItem: (category, itemId, payload) => {
      if (category && itemId && payload) {
        editFromLocalStorage(category, itemId, payload);
      } else {
        return;
      }
    },
  };
};

export default storageFactory;
