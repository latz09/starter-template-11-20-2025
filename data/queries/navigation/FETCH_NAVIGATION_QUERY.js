export const FETCH_NAVIGATION_QUERY = `*[_type == "navigation"][0]{
  navLinks[]{
    label,
    url,
    isButton
  }
}`;