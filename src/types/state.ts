import {store} from '../store/index';
import {AuthorizationStatus, Genre} from '../const';
import {FilmType, FilmCardType} from '../types/films';
import {Comment} from '../types/reviews';
export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export type GameProcess = {
  mistakes: number;
  step: number;
};

export type UserProcess = {
  authorizationStatus: AuthorizationStatus;
};

export type FilmData = {
  genre: Genre;
  films: FilmCardType[];
  filmsDisplayed: FilmCardType[];
  similarFilmsDisplayed: FilmCardType[];
  filmsByGenre: FilmCardType[];
  genreFilmsCount: number;
  similarFilmsCount: number;
  promoFilm: FilmType | null;
  film: FilmType | null;
  hasError: boolean;
  similarFilms: FilmCardType[];
  comments: Comment[];
  userListFilms: FilmType[];
  isFilmsLoading: boolean;
  isSimilarFilmsLoading: boolean;
  isUserFilmsLoading: boolean;
  isFilmLoading: boolean;
  isPromoFilmLoading: boolean;
  isCommentsLoading: boolean;
  isCommentSend: boolean;
}

export type FilmProcess= {
  film: FilmType | null;
  comments: Comment[];
}
