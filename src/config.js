const config = {
  categoryContainer: 'category__list',
  categories: [
    {
      id: 0,
      name: 'Różne',
    },
    {
      id: 1,
      name: 'Owoce',
      color: '#F3C677',
    },
    {
      id: 2,
      name: 'Warzywa',
      color: '#25DB6E',
    },
    {
      id: 3,
      name: 'Pieczywo',
      color: '#E5FFBD',
    },
    {
      id: 4,
      name: 'Higieniczne',
      color: '#FF4BE1',
    },
    {
      id: 5,
      name: 'Napoje',
      color: '#6D67FF',
    },
    {
      id: 6,
      name: 'Słodycze',
      color: '#EC4A4F',
    },
    {
      id: 7,
      name: 'Ryby',
      color: '#4AE7EC',
    },
    {
      id: 8,
      name: 'Mięso',
      color: '#F5C527',
    },
    {
      id: 9,
      name: 'Przyprawy',
      color: '#96EF5B',
    },
    {
      id: 10,
      name: 'Nabiał',
      color: '#FFFFFF',
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
