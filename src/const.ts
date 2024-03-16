export const Settings = {
  maxRating: 5,
  URL_MARKER_DEFAULT: './public/img/pin.svg',
  URL_MARKER_CURRENT: './public/img/pin-active.svg',
};

export enum AppRoute {
  Main = '/',
  Login = '/login',
  Favorites = '/favorites',
  Offer = '/offer/:id',
  OfferPage = '/offer'
}

export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}
