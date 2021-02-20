import { multiTranslateService } from './index';

describe('MultiTranslate', () => {
  it('should return correct translation', async () => {
    expect(multiTranslateService.translate).toBeDefined();

    const txtEn = 'Vladivostok';
    const txtRu = 'Владивосток';
    const txtBe = 'Уладзівасток';

    const testBe = await multiTranslateService.translate([txtRu], 'be', 'ru');
    const testEn = await multiTranslateService.translate([txtBe], 'en', 'be');
    const testRu = await multiTranslateService.translate([txtEn], 'ru', 'en');

    expect(testBe).not.toBeNull();
    expect(testBe[0]).toEqual(txtBe);

    expect(testEn).not.toBeNull();
    expect(testEn[0]).toEqual(txtEn);

    expect(testRu).not.toBeNull();
    expect(testRu[0]).toEqual(txtRu);
  });
});
