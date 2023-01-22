import filter from '../views/components/FiltersBlock/Filters';

test('searchProducts returns correct results', () => {
  const products = [
    {
      id: 1,
      title: 'Ball FC Dynamo',
      description:
        'With this ball, decorated with the logo of FC Dynamo Moscow, every fan has the opportunity to score his golden goal and feel like a part of his favorite team. In professional football leagues and tournaments held under the auspices of FIFA, a size five ball with a circumference of 68–70 cm and a weight of 410–450 grams is mandatory.',
      price: 2790,
      discountPercentage: 15,
      stock: 25,
      brand: 'FC Dynamo',
      category: 'balls',
      thumbnail: '../assets/img/products-1-1.png',
      images: [
        '../assets/img/products-1-1.png',
        '../assets/img/products-1-2.png',
        '../assets/img/products-1-3.png',
        '../assets/img/products-1-4.png',
      ],
    },
    {
      id: 2,
      title: 'Diary FC CSKA',
      description:
        'The corporate blue A5 diary with the logo and the slogan "One life - one team" is a great gift for FC PFC CSKA fans who support the team even at the office or at school. The diary is lined, with a cover made of tactilely pleasant material with a soft-touch coating.',
      price: 1190,
      discountPercentage: 20,
      stock: 9,
      brand: 'PFC CSKA',
      category: 'souvenirs',
      thumbnail: '../assets/img/products-2-1.png',
      images: ['../assets/img/products-2-1.png', '../assets/img/products-2-2.png'],
    },
    {
      id: 3,
      title: 'T-shirt FC Dynamo',
      description:
        'Classic Dynamo T-shirt with a round collar. Colour: White with blue embroidered club emblem and contrasting blue and white piping on the collar and sleeves. Emblem: 3D embroidery. Material: 95% cotton, 5% lycra. Production: Russia. Official products of FC Dynamo Moscow.',
      price: 1590,
      discountPercentage: 15,
      stock: 18,
      brand: 'FC Dynamo',
      category: 'uniforms',
      thumbnail: '../assets/img/products-3-1.png',
      images: ['../assets/img/products-3-1.png', '../assets/img/products-3-2.png', '../assets/img/products-3-3.png'],
    },
  ];
  const searchString = 'dynamo';
  const expectedResult = [
    {
      id: 1,
      title: 'Ball FC Dynamo',
      description:
        'With this ball, decorated with the logo of FC Dynamo Moscow, every fan has the opportunity to score his golden goal and feel like a part of his favorite team. In professional football leagues and tournaments held under the auspices of FIFA, a size five ball with a circumference of 68–70 cm and a weight of 410–450 grams is mandatory.',
      price: 2790,
      discountPercentage: 15,
      stock: 25,
      brand: 'FC Dynamo',
      category: 'balls',
      thumbnail: '../assets/img/products-1-1.png',
      images: [
        '../assets/img/products-1-1.png',
        '../assets/img/products-1-2.png',
        '../assets/img/products-1-3.png',
        '../assets/img/products-1-4.png',
      ],
    },
    {
      id: 3,
      title: 'T-shirt FC Dynamo',
      description:
        'Classic Dynamo T-shirt with a round collar. Colour: White with blue embroidered club emblem and contrasting blue and white piping on the collar and sleeves. Emblem: 3D embroidery. Material: 95% cotton, 5% lycra. Production: Russia. Official products of FC Dynamo Moscow.',
      price: 1590,
      discountPercentage: 15,
      stock: 18,
      brand: 'FC Dynamo',
      category: 'uniforms',
      thumbnail: '../assets/img/products-3-1.png',
      images: ['../assets/img/products-3-1.png', '../assets/img/products-3-2.png', '../assets/img/products-3-3.png'],
    },
  ];

  expect(filter.searchProducts(searchString, products)).toEqual(expectedResult);
});
