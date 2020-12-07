import { TITLE_BASE, TITLE_SEPARATOR } from '@/helpers/constants';

import { prepareTitle } from '@/helpers/seo.helpers';

describe('prepareTitle', () => {
  it('should return base title when empty page title provided', () => {
    expect(prepareTitle('')).toBe(TITLE_BASE);
  });

  it('should return prepared title when page title provided', () => {
    expect(prepareTitle('About')).toBe(
      `${TITLE_BASE} ${TITLE_SEPARATOR} About`,
    );
  });
});
