export const FETCH_HOME_PAGE_DATA = `
  *[_type == 'homePage' && isActive == true] {
    "landingImage": landingImage.asset->url,
     landingHeading,
}`;
