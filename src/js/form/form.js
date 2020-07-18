import storageFactory from '../storage';

const storage = storageFactory();
class Form {
  constructor(form, fields, submit) {
    this.form = form;
    this.submit = submit;
    this.fields = fields;
  }

  onSubmit = (cb) => {
    this.form.addEventListener('submit', cb);
  };

  showError = () => {};

  addItem = () => {
    const category = this.fields.category.value;
    const quantityType = this.fields.switch.checked ? 'kg' : 'szt';

    storage.addItem(category, {
      item: this.fields.name.value,
      quantity: this.fields.quantity.value,
      quantity_type: quantityType,
      category,
      id: Date.now(),
    });

    this.form.reset();
  };

  validate = () => {
    const messages = [];
    Object.keys(this.fields).forEach((field) => {
      if (!this.fields[field].value) {
        messages.push('Nie wprowadziłeś danych. . .');
      }
    });

    messages.length ? this.showError() : this.addItem();
  };
}

export default Form;