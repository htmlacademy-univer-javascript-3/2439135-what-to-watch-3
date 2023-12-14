import {store} from '../store/index';
//import {Questions} from './question.js';
import {AuthorizationStatus, Genre} from '../const';
import {FilmType, FilmCardType, PromoFilmType} from '../types/films';
import {Comment} from '../types/reviews';
export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
/*
export type GameData = {
  questions: Questions;
  isQuestionsDataLoading: boolean;
  hasError: boolean;
};
*/

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
  promoFilm: PromoFilmType | null;
  film: FilmType | null;
 // authorizationStatus: AuthorizationStatus;
  hasError: boolean;
  similarFilms: FilmCardType[];
  comments: Comment[];
  userListFilms: FilmCardType[];

  isFilmsLoading: boolean;
  isSimilarFilmsLoading: boolean;
  isUserFilmsLoading: boolean;
  isFilmLoading: boolean;
  isPromoFilmLoading: boolean;
  isCommentsLoading: boolean;
  isCommentSend: boolean;
}

export type FilmProcess= {
  genre: Genre;
  genreFilmsCount: number;
  similarFilmsCount: number;
}
