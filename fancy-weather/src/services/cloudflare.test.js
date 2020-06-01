import APIDATA from './api-data';
import CloudflareService from './cloudflare';

const cloudflareService = new CloudflareService(APIDATA.Cloudflare);

describe('Cloudflare', () => {
  it('should return correct ip address', async () => {
    expect(cloudflareService.getIP).toBeDefined();

    const ip = await cloudflareService.getIP();

    expect(ip).not.toBeNull();
    expect(ip).toEqual(expect.stringMatching(/([0-9]+(.[0-9]+){3})/));
  });
});
