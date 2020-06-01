import APIDATA from './api-data';
import YandexService from './yandex';

const yandexService = new YandexService(APIDATA.Yandex);

describe('Yandex', () => {
  it('should return correct translation', async () => {
    expect(yandexService.translate).toBeDefined();

    const txtEn = 'Vladivostok';
    const txtRu = 'Владивосток';
    const txtBe = 'Уладзівасток';

    const testBe = await yandexService.translate([txtRu], 'ru-be');
    const testEn = await yandexService.translate([txtBe], 'be-en');
    const testRu = await yandexService.translate([txtEn], 'en-ru');

    expect(testBe).not.toBeNull();
    expect(testBe[0]).toEqual(txtBe);

    expect(testEn).not.toBeNull();
    expect(testEn[0]).toEqual(txtEn);

    expect(testRu).not.toBeNull();
    expect(testRu[0]).toEqual(txtRu);
  });
});
