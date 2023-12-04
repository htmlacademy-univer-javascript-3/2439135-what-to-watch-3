import { createAction } from '@reduxjs/toolkit';
import { Genre } from '../const';
import { PromoFilmType, FilmType, FilmCardType } from '../types/films';
import { Comment } from '../types/reviews';
import { AuthorizationStatus } from '../const';
export const setGenre = createAction<{ genre: Genre }>('films/setFilmsByGenre');
export const setFilmsByGenre = createAction('films/genre');
export const setCount = createAction<{ count: number }>('films/count');
export const setFilmsDisplayed = createAction('films/setFilmsDisplayed');
export const loadPromoFilm = createAction<PromoFilmType>('films/loadPromoFilm');
export const loadFilm = createAction<FilmType | null>('films/loadFilm');
export const loadFilms = createAction<FilmCardType[]>('films/loadFilms');
export const setFilmsDataLoadingStatus = createAction<boolean>(
  'films/setFilmsDataLoadingStatus'
);
export const requireAuthorization = createAction<AuthorizationStatus>(
  'user/requireAuthorization'
);
export const setError = createAction<string | null>('films/setError');

export const loadComments = createAction<Comment[]>('films/loadComments');
export const loadUserListFilms = createAction<FilmCardType[]>(
  'films/loadUserListFilms'
);
export const addComment = createAction<Comment>('films/addComment');
export const loadSimilarFilms = createAction<FilmCardType[]>(
  'films/loadSimilarFilms'
);
export const setSimilarFilmsDisplayed = createAction(
  'films/setSimilarFilmsDisplayed'
);
export const setSimilarFilmsCount = createAction<number>(
  'films/setSimilarFilmsCount'
);
