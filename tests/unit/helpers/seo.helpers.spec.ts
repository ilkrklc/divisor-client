import { TitleBase, TitleSeparator } from '@/helpers/constants';

import { prepareTitle } from '@/helpers/seo.helpers';

describe('prepareTitle', () => {
  it('should return base title when empty page title provided', () => {
    expect(prepareTitle('')).toBe(TitleBase);
  });

  it('should return prepared title when page title provided', () => {
    expect(prepareTitle('About')).toBe(`${TitleBase} ${TitleSeparator} About`);
  });
});
