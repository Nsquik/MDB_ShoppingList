import { loopCategories, appendToParent } from '@js/utlis';
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

      appendToParent(
        select,
        option,
        {
          id: category.name.toLowerCase(),
          value: category.name,
        },
        category.name
      );
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

console.log(newFormWithConfig);

newFormWithConfig.onSubmit((e) => {
  e.preventDefault();
  newFormWithConfig.validate();
});

export default FormBuilder;
