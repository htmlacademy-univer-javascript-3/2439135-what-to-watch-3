import { AxiosInstance } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, State } from '../types/state.js';
import { FilmCardType, FilmType, PromoFilmType } from '../types/films';
import {
  loadFilms,
  setFilmsDataLoadingStatus,
  loadPromoFilm,
  loadFilm,
} from './action';
import { APIRoute } from '../const';

export const fetchFilmsAction = createAsyncThunk<
  void,
  undefined,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('data/fetchFilms', async (_arg, { dispatch, extra: api }) => {
  dispatch(setFilmsDataLoadingStatus(true));
  const data = await api
    .get<FilmCardType[]>(APIRoute.Films())
    .then((res) => res.data);
  dispatch(setFilmsDataLoadingStatus(false));
  dispatch(loadFilms(data));
});

export const fetchPromoFilmAction = createAsyncThunk<
  void,
  undefined,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('data/fetchPromoFilm', async (_arg, { dispatch, extra: api }) => {
  const film = await api
    .get<PromoFilmType>(APIRoute.Promo())
    .then((res) => res.data);
  dispatch(loadPromoFilm(film));
});

export const fetchFilmAction = createAsyncThunk<
  void,
  string,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('data/fetchFilm', async (id, { dispatch, extra: api }) => {
  await api.get<FilmType>(APIRoute.Film(id)).then((res) => {
    dispatch(loadFilm(res.data));
  });
});
