import config from '../config';
import Form from './form';
import { loopCategories } from './utlis.js';

const { form } = config;
class FormBuilder {
  constructor(formId) {
    this.form = document.getElementById(formId);
  }

  withFields(fields) {
    this.fields = Object.assign(
      {},
      ...fields.map((field) => ({ [field.accessName]: document.getElementById(field.id) }))
    );

    return this;
  }

  withSubmit(submit) {
    this.submit = document.getElementById(submit);
    return this;
  }

  insertOptions() {
    const select = this.fields.category;

    loopCategories((category) => {
      const option = document.createElement('option');
      option.value = category.name;
      option.text = category.name;
      option.id = category.name.toLowerCase();
      select.appendChild(option);
    });
  }

  build() {
    this.insertOptions();
    return new Form(this.form, this.fields, this.submit);
  }
}

export const newFormWithConfig = new FormBuilder(form.id)
  .withFields(form.fields)
  .withSubmit(form.submit)
  .build();

export default FormBuilder;
