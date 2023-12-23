import { NameSpace, Genre } from '../../const';
import { State } from '../../types/state';
import { Comment } from '../../types/reviews';
import { FilmCardType, FilmType } from '../../types/films';

export const getFilm = (state: Pick<State, NameSpace.Data>): FilmType | null =>
  state[NameSpace.Data].film;
export const getFilmDataLoadingStatus = (state: Pick<State, NameSpace.Data>): boolean =>
  state[NameSpace.Data].isFilmLoading;

export const getFilms = (state: Pick<State, NameSpace.Data>): FilmCardType[] =>
  state[NameSpace.Data].films;
export const getFilmsDataLoadingStatus = (state: Pick<State, NameSpace.Data>): boolean =>
  state[NameSpace.Data].isFilmsLoading;

export const getSimilarFilms = (state: Pick<State, NameSpace.Data>): FilmCardType[] =>
  state[NameSpace.Data].similarFilms;
export const getSimilarFilmsDataLoadingStatus = (state: Pick<State, NameSpace.Data>): boolean =>
  state[NameSpace.Data].isSimilarFilmsLoading;

export const getUserFilms = (state: Pick<State, NameSpace.Data>): FilmType[] => state[NameSpace.Data].userListFilms;
export const getUserFilmsDataLoadingStatus = (state: Pick<State, NameSpace.Data>): boolean => state[NameSpace.Data].isUserFilmsLoading;

export const getComments = (state: Pick<State, NameSpace.Data>): Comment[] =>
  state[NameSpace.Data].comments;
export const getCommentsDataLoadingStatus = (state: Pick<State, NameSpace.Data>): boolean =>
  state[NameSpace.Data].isCommentsLoading;

export const getPromoFilm = (state: Pick<State, NameSpace.Data>): FilmType | null =>
  state[NameSpace.Data].promoFilm;
export const getPromoFilmDataLoadingStatus = (state: Pick<State, NameSpace.Data>): boolean =>
  state[NameSpace.Data].isPromoFilmLoading;

export const getErrorStatus = (state: Pick<State, NameSpace.Data>): boolean =>
  state[NameSpace.Data].hasError;

export const getGenre = (state: Pick<State, NameSpace.Data>): Genre => state[NameSpace.Data].genre;
export const getFilmsCount = (state: Pick<State, NameSpace.Data>): number =>
  state[NameSpace.Data].genreFilmsCount;
export const getSimilarFilmsCount = (state: Pick<State, NameSpace.Data>): number =>
  state[NameSpace.Data].similarFilmsCount;

export const getFilmsDisplayed = (state: Pick<State, NameSpace.Data>): FilmCardType[] =>
  state[NameSpace.Data].filmsDisplayed;

export const getFilmsByGenre = (state: Pick<State, NameSpace.Data>): FilmCardType[] =>
  state[NameSpace.Data].filmsByGenre;

export const getSimilarFilmsDisplayed = (state: Pick<State, NameSpace.Data>): FilmCardType[] =>
  state[NameSpace.Data].similarFilmsDisplayed;
