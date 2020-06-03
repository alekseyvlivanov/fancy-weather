import geoIPLookupService from './index';

describe('GeoIPLookup', () => {
  it('should return correct Geo data for IP', async () => {
    expect(geoIPLookupService.getGeoByIP).toBeDefined();

    const testIP = '1.1.1.1';
    const testHostname = 'one.one.one.one';

    const ip = await geoIPLookupService.getGeoByIP('1.1.1.1');

    expect(ip).not.toBeNull();
    expect(ip.ip).toEqual(testIP);
    expect(ip.hostname).toEqual(testHostname);
  });
});
