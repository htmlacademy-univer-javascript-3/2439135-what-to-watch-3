import { createAction } from '@reduxjs/toolkit';
import { Genre } from '../const';
import { PromoFilmType, FilmType, FilmCardType } from '../types/films';
export const setGenre = createAction<{ genre: Genre }>('films/setFilmsByGenre');
export const setFilmsByGenre = createAction('films/genre');
export const setCount = createAction<{ count: number }>('films/count');
export const setFilmsDisplayed = createAction('films/setFilmsDisplayed');
export const loadPromoFilm = createAction<PromoFilmType>('films/loadPromoFilm');
export const loadFilm = createAction<FilmType | null>('films/loadFilm');
export const loadFilms = createAction<FilmCardType[]>('data/loadFilms');
export const setFilmsDataLoadingStatus = createAction<boolean>(
  'data/setFilmsDataLoadingStatus'
);
