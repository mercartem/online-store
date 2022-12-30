import sort from '../views/components/SortBlock/Sort';

describe('sort', () => {
  const products = [
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
      id: 7,
      title: 'Ball FC Manchester United',
      description:
        'Adidas Manchester United amateur soccer ball. Colour: Black with gray accents and orange club crest and Adidas logo. Material: TPU. Machine stitching. Size 5. Official products of the Manchester United club.',
      price: 2490,
      discountPercentage: 15,
      stock: 21,
      brand: 'FC Manchester United',
      category: 'balls',
      thumbnail: '../assets/img/products-7-1.png',
      images: [
        '../assets/img/products-7-1.png',
        '../assets/img/products-7-2.png',
        '../assets/img/products-7-3.png',
        '../assets/img/products-7-4.png',
      ],
    },
    {
      id: 8,
      title: 'Keychain FC Manchester United',
      description:
        'Metal keychain with the emblem of the football club Manchester United. Gold-colored metal, enamel coating - yellow-red. The size of the keychain is 4.5 cm. The keychain is one-sided, the color emblem is only on one side of the keychain. Official licensed product of Manchester United FC.',
      price: 830,
      discountPercentage: 20,
      stock: 17,
      brand: 'FC Manchester United',
      category: 'souvenirs',
      thumbnail: '../assets/img/products-8-1.png',
      images: ['../assets/img/products-8-1.png', '../assets/img/products-8-2.png'],
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

  it('sorts by priceLow', () => {
    const result = sort.sort('priceLow', products);
    expect(result).toEqual([
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
      {
        id: 7,
        title: 'Ball FC Manchester United',
        description:
          'Adidas Manchester United amateur soccer ball. Colour: Black with gray accents and orange club crest and Adidas logo. Material: TPU. Machine stitching. Size 5. Official products of the Manchester United club.',
        price: 2490,
        discountPercentage: 15,
        stock: 21,
        brand: 'FC Manchester United',
        category: 'balls',
        thumbnail: '../assets/img/products-7-1.png',
        images: [
          '../assets/img/products-7-1.png',
          '../assets/img/products-7-2.png',
          '../assets/img/products-7-3.png',
          '../assets/img/products-7-4.png',
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
        id: 8,
        title: 'Keychain FC Manchester United',
        description:
          'Metal keychain with the emblem of the football club Manchester United. Gold-colored metal, enamel coating - yellow-red. The size of the keychain is 4.5 cm. The keychain is one-sided, the color emblem is only on one side of the keychain. Official licensed product of Manchester United FC.',
        price: 830,
        discountPercentage: 20,
        stock: 17,
        brand: 'FC Manchester United',
        category: 'souvenirs',
        thumbnail: '../assets/img/products-8-1.png',
        images: ['../assets/img/products-8-1.png', '../assets/img/products-8-2.png'],
      },
    ]);
  });

  it('sorts by priceHigh', () => {
    const result = sort.sort('priceHigh', products);
    expect(result).toEqual([
      {
        id: 8,
        title: 'Keychain FC Manchester United',
        description:
          'Metal keychain with the emblem of the football club Manchester United. Gold-colored metal, enamel coating - yellow-red. The size of the keychain is 4.5 cm. The keychain is one-sided, the color emblem is only on one side of the keychain. Official licensed product of Manchester United FC.',
        price: 830,
        discountPercentage: 20,
        stock: 17,
        brand: 'FC Manchester United',
        category: 'souvenirs',
        thumbnail: '../assets/img/products-8-1.png',
        images: ['../assets/img/products-8-1.png', '../assets/img/products-8-2.png'],
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
        id: 7,
        title: 'Ball FC Manchester United',
        description:
          'Adidas Manchester United amateur soccer ball. Colour: Black with gray accents and orange club crest and Adidas logo. Material: TPU. Machine stitching. Size 5. Official products of the Manchester United club.',
        price: 2490,
        discountPercentage: 15,
        stock: 21,
        brand: 'FC Manchester United',
        category: 'balls',
        thumbnail: '../assets/img/products-7-1.png',
        images: [
          '../assets/img/products-7-1.png',
          '../assets/img/products-7-2.png',
          '../assets/img/products-7-3.png',
          '../assets/img/products-7-4.png',
        ],
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
    ]);
  });

  it('sorts by nameAZ', () => {
    const result = sort.sort('nameAZ', products);
    expect(result).toEqual([
      {
        id: 7,
        title: 'Ball FC Manchester United',
        description:
          'Adidas Manchester United amateur soccer ball. Colour: Black with gray accents and orange club crest and Adidas logo. Material: TPU. Machine stitching. Size 5. Official products of the Manchester United club.',
        price: 2490,
        discountPercentage: 15,
        stock: 21,
        brand: 'FC Manchester United',
        category: 'balls',
        thumbnail: '../assets/img/products-7-1.png',
        images: [
          '../assets/img/products-7-1.png',
          '../assets/img/products-7-2.png',
          '../assets/img/products-7-3.png',
          '../assets/img/products-7-4.png',
        ],
      },
      {
        id: 8,
        title: 'Keychain FC Manchester United',
        description:
          'Metal keychain with the emblem of the football club Manchester United. Gold-colored metal, enamel coating - yellow-red. The size of the keychain is 4.5 cm. The keychain is one-sided, the color emblem is only on one side of the keychain. Official licensed product of Manchester United FC.',
        price: 830,
        discountPercentage: 20,
        stock: 17,
        brand: 'FC Manchester United',
        category: 'souvenirs',
        thumbnail: '../assets/img/products-8-1.png',
        images: ['../assets/img/products-8-1.png', '../assets/img/products-8-2.png'],
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
    ]);
  });

  it('sorts by nameZA', () => {
    const result = sort.sort('nameZA', products);
    expect(result).toEqual([
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
        id: 8,
        title: 'Keychain FC Manchester United',
        description:
          'Metal keychain with the emblem of the football club Manchester United. Gold-colored metal, enamel coating - yellow-red. The size of the keychain is 4.5 cm. The keychain is one-sided, the color emblem is only on one side of the keychain. Official licensed product of Manchester United FC.',
        price: 830,
        discountPercentage: 20,
        stock: 17,
        brand: 'FC Manchester United',
        category: 'souvenirs',
        thumbnail: '../assets/img/products-8-1.png',
        images: ['../assets/img/products-8-1.png', '../assets/img/products-8-2.png'],
      },
      {
        id: 7,
        title: 'Ball FC Manchester United',
        description:
          'Adidas Manchester United amateur soccer ball. Colour: Black with gray accents and orange club crest and Adidas logo. Material: TPU. Machine stitching. Size 5. Official products of the Manchester United club.',
        price: 2490,
        discountPercentage: 15,
        stock: 21,
        brand: 'FC Manchester United',
        category: 'balls',
        thumbnail: '../assets/img/products-7-1.png',
        images: [
          '../assets/img/products-7-1.png',
          '../assets/img/products-7-2.png',
          '../assets/img/products-7-3.png',
          '../assets/img/products-7-4.png',
        ],
      },
    ]);
  });
});
