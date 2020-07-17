const config = {
  categories: [
    {
      id: 0,
      name: 'Warzywa',
    },
    {
      id: 1,
      name: 'Owoce',
    },
    {
      id: 2,
      name: 'Nabiał',
    },
    {
      id: 3,
      name: 'Pieczywo',
    },
    {
      id: 4,
      name: 'Higieniczne',
    },
    {
      id: 5,
      name: 'Napoje',
    },
  ],
  form: {
    id: 'form',
    fields: [
      {
        accessName: 'name',
        id: 'form__name',
      },
      {
        accessName: 'quantity',
        id: 'form__quantity',
      },
      {
        accessName: 'switch',
        id: 'form__quantity-switch',
      },
      {
        accessName: 'category',
        id: 'form__category',
      },
    ],
    submit: 'form__submit',
  },
};

export default config;
