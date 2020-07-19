import config from '~/config';

const { categories } = config;

export const loopCategories = (cb) => {
  return categories.map((category) => {
    return cb(category);
  });
};

export const loopCategory = (category, cb) => {
  const data = JSON.parse(localStorage.getItem(category));

  return data.map((item) => {
    return cb(item);
  });
};

export const appendToParent = (parentNode, node, attributes = {}, text = '') => {
  Object.entries(attributes).forEach((attr) => {
    node.setAttribute(attr[0], attr[1]);
  });
  node.textContent = text;
  parentNode.appendChild(node);
  return node;
};

export const addEvent = (type, cb) => {
  return function (el) {
    el.addEventListener(type, cb);
  };
};

export const checkArray = (cbGood, cbBad) => {
  return function (items) {
    if (items && items.length) {
      cbGood();
    } else {
      cbBad();
    }
  };
};
