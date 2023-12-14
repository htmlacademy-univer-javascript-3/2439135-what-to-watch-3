import { NameSpace, Genre } from '../../const';
import { State } from '../../types/state';
import { Comment } from '../../types/reviews';
import { FilmCardType, FilmType, PromoFilmType } from '../../types/films';

export const getFilm = (state: State): FilmType | null =>
  state[NameSpace.Data].film;
export const getFilmDataLoadingStatus = (state: State): boolean =>
  state[NameSpace.Data].isFilmLoading;

export const getFilms = (state: State): FilmCardType[] =>
  state[NameSpace.Data].films;
export const getFilmsDataLoadingStatus = (state: State): boolean =>
  state[NameSpace.Data].isFilmsLoading;

export const getSimilarFilms = (state: State): FilmCardType[] =>
  state[NameSpace.Data].similarFilms;
export const getSimilarFilmsDataLoadingStatus = (state: State): boolean =>
  state[NameSpace.Data].isSimilarFilmsLoading;

//export const getUserFilms = (state: State): FilmCardType[] => state[NameSpace.Data].userListFilms;
//export const getUserFilmsDataLoadingStatus = (state: State): boolean => state[NameSpace.Data].isUserFilmsLoading;

export const getComments = (state: State): Comment[] =>
  state[NameSpace.Data].comments;
export const getCommentsDataLoadingStatus = (state: State): boolean =>
  state[NameSpace.Data].isCommentsLoading;

export const getPromoFilm = (state: State): PromoFilmType | null =>
  state[NameSpace.Data].promoFilm;
export const getPromoFilmDataLoadingStatus = (state: State): boolean =>
  state[NameSpace.Data].isPromoFilmLoading;

export const getErrorStatus = (state: State): boolean =>
  state[NameSpace.Data].hasError;

export const getGenre = (state: State): Genre => state[NameSpace.Data].genre;
export const getFilmsCount = (state: State): number =>
  state[NameSpace.Data].genreFilmsCount;
export const getSimilarFilmsCount = (state: State): number =>
  state[NameSpace.Data].similarFilmsCount;

export const getFilmsDisplayed = (state: State): FilmCardType[] =>
  state[NameSpace.Data].filmsDisplayed;

export const getFilmsByGenre = (state: State): FilmCardType[] =>
  state[NameSpace.Data].filmsByGenre;

export const getSimilarFilmsDisplayed = (state: State): FilmCardType[] =>
  state[NameSpace.Data].similarFilmsDisplayed;
