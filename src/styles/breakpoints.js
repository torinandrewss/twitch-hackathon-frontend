import { sizes } from './sizes';

export const breakpoints = {
  sm: sizes.mobileL,
  md: sizes.tablet,
  lg: sizes.laptop,
  xl: sizes.laptopL,
};

const createMinWidthMediaQuery = (size) => {
  return `(min-width: ${size}px)`;
};

export const device = {
  mobileS: createMinWidthMediaQuery(sizes.mobileS),
  mobileM: createMinWidthMediaQuery(sizes.mobileM),
  mobileL: createMinWidthMediaQuery(sizes.mobileL),
  tablet: createMinWidthMediaQuery(sizes.tablet),
  laptop: createMinWidthMediaQuery(sizes.laptop),
  laptopL: createMinWidthMediaQuery(sizes.laptopL),
  desktop: createMinWidthMediaQuery(sizes.laptopL),
};
