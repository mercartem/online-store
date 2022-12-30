import { parseRequestUrl } from '../constans/utils';

test('parseRequestUrl', () => {
  document.location.hash = '#/resource/123?verb=edit';

  const result = parseRequestUrl();

  expect(result).toEqual({
    resource: 'resource',
    id: '123',
    verb: undefined,
    queryParams: { verb: 'edit' },
  });
});
