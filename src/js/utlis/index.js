import config from '~/config';

const { categories } = config;

export const loopCategories = (cb) => {
  return categories.map((category) => {
    return cb(category);
  });
};

export const appendToParent = (parentNode, node, attributes = [], text = '') => {
  Object.entries(attributes).forEach((attr) => {
    node.setAttribute(attr[0], attr[1]);
  });
  node.textContent = text;
  parentNode.appendChild(node);
};
