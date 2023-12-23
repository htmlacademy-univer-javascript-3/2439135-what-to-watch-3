export const Setting = {
  Name: 'The Grand Budapest Hotel',
  Genre: 'Dramaaaaa',
  ReleaseDate: '2014',
};
export const APIRoute = {
  Films: () => '/films',
  Film: (filmId: string) => `/films/${filmId}`,
  Similar: (filmId: string) => `/films/${filmId}/similar`,
  Promo: () => '/promo',
  Favorite: () => '/favorite',
  Comments: (filmId: string) => `/comments/${filmId}`,
  Login: () => '/login',
  Logout: () => '/logout',
  AddReview: () => '/films/:id/review',
  MyList: () => '/mylist',
  AddInFavorite: (filmId: string, status: string) =>
    `/favorite/${filmId}/${status}`,
};
export const timeoutVideo = 1000;
export const TIMEOUT_SHOW_ERROR = 2000;
export enum AppRoute {
  Main = '/',
  Login = '/login',
  Logout = '/logout',
  MyList = '/mylist',
  Film = '/films/:id',
  AddReview = '/films/:id/review',
  Player = '/player/:id',
}

export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}

export enum Genre {
  All = 'All genres',
  Drama = 'Drama',
  Action = 'Action',
  Comedie = 'Comedy',
  Crime = 'Crime',
  Fantasy = 'Fantasy',
  Documentary = 'Documentary',
  Horror = 'Horror',
  KidsFamily = 'Kids & Family',
  Romance = 'Romance',
  Adventure = 'Adventure',
  Thriller = 'Thriller',
  SciFi = 'Sci-Fi',
}

export const genres: Genre[] = [
  Genre.All,
  Genre.Comedie,
  Genre.Crime,
  Genre.Adventure,
  Genre.Drama,
  Genre.Action,
  Genre.Fantasy,
  Genre.Romance,
  Genre.SciFi,
  Genre.Thriller,
];

export enum TabItem {
  Overview = 'Overview',
  Details = 'Details',
  Reviews = 'Reviews',
}

export const tabItems: TabItem[] = [
  TabItem.Overview,
  TabItem.Details,
  TabItem.Reviews,
];
export enum NameSpace {
  Data = 'DATA',
  Film = 'FILM',
  User = 'USER',
}
