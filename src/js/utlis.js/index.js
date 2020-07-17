import config from '../../config';

const { categories } = config;

// eslint-disable-next-line import/prefer-default-export
export const loopCategories = (cb) => {
  categories.forEach((category) => {
    cb(category);
  });
};
