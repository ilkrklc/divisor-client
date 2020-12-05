import { DefaultLocale } from '@/helpers/constants';
import {
  getUserLocale,
  getFormattedDateString,
} from '@/helpers/date-time.helpers';

describe('date time helpers', () => {
  describe('getUserLocale', () => {
    const navigatorLanguagesSpy = jest.spyOn(navigator, 'languages', 'get');
    const navigatorLanguageSpy = jest.spyOn(navigator, 'language', 'get');

    let date = new Date();

    beforeEach(() => {
      navigatorLanguagesSpy.mockClear();
      navigatorLanguageSpy.mockClear();

      date = new Date();
    });

    it('should return default locale when navigator languages empty', () => {
      navigatorLanguagesSpy.mockImplementation(() => []);
      navigatorLanguageSpy.mockImplementation(() => '');

      expect(getUserLocale()).toBe(DefaultLocale);
    });

    it('should return corresponding locale date string', () => {
      navigatorLanguagesSpy.mockImplementation(() => ['en-US']);
      navigatorLanguageSpy.mockImplementation(() => 'en-US');
      expect(getFormattedDateString(date)).toBe(date.toLocaleString('en-US'));

      navigatorLanguagesSpy.mockClear();
      navigatorLanguageSpy.mockClear();

      navigatorLanguagesSpy.mockImplementation(() => ['tr-TR']);
      navigatorLanguageSpy.mockImplementation(() => 'tr-TR');
      expect(getFormattedDateString(date)).toBe(date.toLocaleString('tr-TR'));

      navigatorLanguagesSpy.mockClear();
      navigatorLanguageSpy.mockClear();

      navigatorLanguagesSpy.mockImplementation(() => ['es-ES']);
      navigatorLanguageSpy.mockImplementation(() => 'es-ES');
      expect(getFormattedDateString(date)).toBe(date.toLocaleString('es-ES'));
    });
  });
});
