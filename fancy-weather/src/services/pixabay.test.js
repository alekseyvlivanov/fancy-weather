import pixabayService from './index';

describe('Pixabay', () => {
  it('should return object with array of photos', async () => {
    expect(pixabayService.getPhotos).toBeDefined();

    const season = 'winter';
    const pod = 'evening';

    const newPhotos = await pixabayService.getPhotos(`${season} ${pod}`);

    expect(newPhotos).not.toBeNull();
    expect(newPhotos.hits.length).toBeGreaterThan(0);
  });
});
