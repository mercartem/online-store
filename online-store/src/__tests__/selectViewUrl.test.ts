import sort from '../views/components/SortBlock/Sort';

it('the URL hash to view list"', () => {
  const item = { id: 'list' } as HTMLButtonElement;
  sort.selectView(item);
  expect(document.location.hash).toEqual('#/?category=&brand=&price=350+5890&qty=1+45&search=&sort=&view=list');
});

it('the URL hash to view block', () => {
  const item = { id: 'block' } as HTMLButtonElement;
  sort.selectView(item);
  expect(document.location.hash).toEqual('#/?category=&brand=&price=350+5890&qty=1+45&search=&sort=&view=block');
});
