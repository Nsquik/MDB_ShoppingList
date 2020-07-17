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

  addItem = () => {};

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
