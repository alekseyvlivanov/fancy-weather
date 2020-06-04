import { cloudflareService } from './index';

describe('Cloudflare', () => {
  it('should return correct ip address', async () => {
    expect(cloudflareService.getIP).toBeDefined();

    const ip = await cloudflareService.getIP();

    expect(ip).not.toBeNull();
    expect(ip).toEqual(expect.stringMatching(/([0-9]+(.[0-9]+){3})/));
  });
});
