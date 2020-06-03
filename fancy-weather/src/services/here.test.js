import hereService from './index';

describe('Here', () => {
  it('should return correct Geo by place', async () => {
    expect(hereService.getGeoByPlace).toBeDefined();

    const lang = 'ru';
    const place = 'Владивосток';

    const geoByPlace = await hereService.getGeoByPlace(lang, place);

    expect(geoByPlace).not.toBeNull();
    expect(geoByPlace.items.length).toBeGreaterThan(0);
    expect(geoByPlace.items[0].address.city).toEqual(place);
  });

  it('should return correct Place by Geo', async () => {
    expect(hereService.getPlaceByGeo).toBeDefined();

    const lang = 'be';
    const geo = { lat: 54.24061, lon: 28.50556 };
    const city = 'Барысаў';

    const placeByGeo = await hereService.getPlaceByGeo(lang, geo);

    expect(placeByGeo).not.toBeNull();
    expect(placeByGeo.items.length).toBeGreaterThan(0);
    expect(placeByGeo.items[0].address.city).toEqual(city);
  });

  it('should return Map by Geo', async () => {
    expect(hereService.getMapByGeo).toBeDefined();

    const lang = 'ru';
    const geo = { lat: 50, lon: 5 };

    const mapByGeo = await hereService.getMapByGeo(lang, geo);

    expect(mapByGeo).not.toBeNull();
    expect(mapByGeo.constructor.name).toEqual('Blob');
    expect(mapByGeo.size).toBeGreaterThan(0);
  });
});
