// import { loopCategories } from './utlis';

const storageFactory = () => {
  return {
    initializeCategories: () => {
      localStorage.setItem(
        'categories',
        JSON.stringify({
          napoje: ['test'],
        })
      );
    },
  };
};

export default storageFactory;
