import { insertOptions } from '@js/utils';
import Form from '@js/form/form';
import config from '~/config';

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
    insertOptions(this.fields.category);
    return this;
  }

  withSubmit(submit) {
    this.submit = document.getElementById(submit);
    return this;
  }

  build() {
    return new Form(this.form, this.fields, this.submit);
  }
}

export const newFormWithConfig = new FormBuilder(form.id)
  .withFields(form.fields)
  .withSubmit(form.submit)
  .build();

newFormWithConfig.onSubmit((e) => {
  e.preventDefault();
  newFormWithConfig.validate();
});

export default FormBuilder;
