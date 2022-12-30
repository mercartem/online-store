import filter from '../views/components/FiltersBlock/Filters';

test('filters products by brand and category', () => {
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
      id: 6,
      title: 'Socks FC Lokomotiv',
      description:
        'The original Lokomotiv socks are presented in three versions. High quality socks, suitable for both men and women. The original design will complement the image of the Loko fan. Soft and pleasant to the touch, thanks to the use of only high-quality materials.',
      price: 890,
      discountPercentage: 15,
      stock: 27,
      brand: 'FC Lokomotiv',
      category: 'souvenirs',
      thumbnail: '../assets/img/products-6-1.png',
      images: ['../assets/img/products-6-1.png', '../assets/img/products-6-2.png', '../assets/img/products-6-3.png'],
    },
    {
      id: 9,
      title: 'Uniform FC Manchester United',
      description:
        'Buying a Manchester United jersey is a great idea to create a stylish sporty look. She will give confidence in the movements. You can also decorate a T-shirt with an alternative design by choosing to apply any number, name. The model is based on a new generation of water-repellent material. Practical and lightweight, it provides comfort and convenience. The innovative material does not absorb moisture, but brings it to the surface, where it gradually evaporates.',
      price: 3250,
      discountPercentage: 15,
      stock: 8,
      brand: 'FC Manchester United',
      category: 'uniforms',
      thumbnail: '../assets/img/products-9-1.png',
      images: [
        '../assets/img/products-9-1.png',
        '../assets/img/products-9-2.png',
        '../assets/img/products-9-3.png',
        '../assets/img/products-9-4.png',
      ],
    },
  ];

  filter.filterBrand = ['FC Dynamo'];
  filter.filterCategory = ['balls'];

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
  ];

  const filteredProducts = filter.filterByBrandAndCategory(products);

  expect(filteredProducts).toEqual(expectedResult);
});
