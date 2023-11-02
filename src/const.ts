export const Setting = {
  Name: 'The Grand Budapest Hotel',
  Genre: 'Dramaaaaa',
  ReleaseDate: '2014',
};

export const timeoutVideo = 1000;

export const idFirstFilm = 0;

export enum AppRoute {
  Main = '/',
  SignIn = '/login',
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
  Drama = 'Drama',
  Comedie = 'Comedie',
  Crime = 'Crime',
  Documentary = 'Documentary',
  Horror = 'Horror',
  KidsFamily = 'Kids & Family',
  Romance = 'Romance',
  SciFi = 'Sci-Fi',
  Thriller = 'Thriller',
  All = 'All genres',
}
export const genres: Genre[] = [
  Genre.All,
  Genre.Comedie,
  Genre.Crime,
  Genre.Documentary,
  Genre.Drama,
  Genre.Horror,
  Genre.KidsFamily,
  Genre.Romance,
  Genre.SciFi,
  Genre.Thriller,
];
export enum FilmImage {
  BgImage,
  Poster,
  SmallCard,
}

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
