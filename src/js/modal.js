/* eslint-disable camelcase */
import storageFactory from '@js/storage';
import { appendToParent, insertOptions, changeSelected } from '@js/utils';
import UI from '@js/UI';

const store = storageFactory();

const modal = () => {
  const modal = document.querySelector('#myModal');
  const modalInfo = document.querySelector('.modal__info');
  const modalForm = document.querySelector('#modal__form');

  const buildFormInfo = (id, item, quantity, quantity_type) => {
    modalInfo.innerHTML = `${item} (id: ${id}) ${quantity}${quantity_type}`;
    modalInfo.dataset.id = id;
  };
  const createDiv = () => {
    return document.createElement('div');
  };

  const createInput = () => {
    return document.createElement('input');
  };

  const createLabel = () => {
    return document.createElement('label');
  };

  const createFields = () => {
    const fieldName = createDiv();
    const fieldQuantity = createDiv();
    const fieldCategory = createDiv();
    return { fieldName, fieldQuantity, fieldCategory };
  };

  const createInputs = (category) => {
    const nameInput = createInput();
    const quantityInput = createInput();
    const categoryInput = document.createElement('select');
    insertOptions(categoryInput);
    changeSelected([...categoryInput.children], category);

    return { nameInput, quantityInput, categoryInput };
  };

  const createLabels = () => {
    const nameLabel = createLabel();
    const quantityLabel = createLabel();
    const categoryLabel = createLabel();
    return { nameLabel, quantityLabel, categoryLabel };
  };

  const buildFields = (item, category, quantity) => {
    const { fieldName, fieldQuantity, fieldCategory } = createFields();
    const { nameInput, quantityInput, categoryInput } = createInputs(category);
    const { nameLabel, quantityLabel, categoryLabel } = createLabels();

    appendToParent(fieldName, nameLabel, { for: 'modal__name' }, 'Nazwa');
    appendToParent(fieldQuantity, quantityLabel, { for: 'modal__quantity' }, 'Ilość');
    appendToParent(fieldCategory, categoryLabel, { for: 'modal__category' }, 'Kategoria');

    appendToParent(fieldName, nameInput, {
      value: item,
      class: 'form__input',
      type: 'text',
      id: 'modal__name',
      maxlength: 256,
      required: true,
    });
    appendToParent(fieldQuantity, quantityInput, {
      value: quantity,
      class: 'form__input',
      type: 'number',
      id: 'modal__quantity',
      min: 0,
      required: true,
    });
    appendToParent(fieldCategory, categoryInput, {
      class: 'form__select',
      id: 'modal__category',
      required: true,
    });

    const nodes = document.createDocumentFragment();
    appendToParent(nodes, fieldName, { class: 'form__field' });
    appendToParent(nodes, fieldQuantity, { class: 'form__field' });
    appendToParent(nodes, fieldCategory, { class: 'form__field' });
    return nodes.children;
  };

  const buildButtons = () => {
    const approve = document.createElement('button');
    const decline = document.createElement('button');
    const buttons = document.createElement('div');
    appendToParent(buttons, approve, { class: 'modal__approve', type: 'submit' }, 'Edytuj!');
    appendToParent(
      buttons,
      decline,
      {
        class: 'modal__decline',
        type: 'button',
      },
      'Anuluj!'
    );

    approve.onclick = (e) => {
      e.preventDefault();

      const id = document.querySelector('.modal__info').dataset.id;
      const category = document.querySelector('#modal__category').value;
      const currentCategory = store.getCurrentCategory();
      const quantity = document.querySelector('#modal__quantity').value;
      const item = document.querySelector('#modal__name').value;

      const { quantity_type } = store.getItem(currentCategory, parseInt(id, 10));

      store.editItem(currentCategory, id, {
        item,
        quantity,
        category,
      });

      if (category !== currentCategory) {
        store.removeItem(currentCategory, parseInt(id, 10));
        store.addItem(category, {
          item,
          quantity,
          quantity_type,
          category,
          id,
        });
      }

      setInvisible();

      UI().renderWithoutCheck(currentCategory);
    };

    decline.onclick = (e) => {
      e.preventDefault();
      setInvisible();
    };

    appendToParent(modalForm, buttons, { class: 'modal__buttons' });
  };

  const buildForm = ({ category, id, item, quantity, quantity_type }) => {
    buildFormInfo(id, item, quantity, quantity_type);

    const fieldNodes = buildFields(item, category, quantity);
    [...fieldNodes].forEach((node) => {
      appendToParent(modalForm, node);
    });

    buildButtons();
  };

  const setInvisible = () => {
    modal.style.visibility = 'hidden';
    modal.style.display = 'none';
  };

  return {
    buildModal: (id) => {
      modalForm.innerHTML = '';
      const item = store.getItem(store.getCurrentCategory(), id);
      buildForm(item);
    },
    showModal: () => {
      modal.style.visibility = 'visible';
      modal.style.display = 'flex';
    },
    hideModal: () => {
      setInvisible();
    },
  };
};

export default modal;
