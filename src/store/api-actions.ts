import { AxiosInstance } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, State } from '../types/state.js';
import { FilmCardType, FilmType, PromoFilmType } from '../types/films';
import {
  loadFilms,
  setFilmsDataLoadingStatus,
  loadPromoFilm,
  loadFilm,
  requireAuthorization,
  setError,
  loadComments,
  loadSimilarFilms,
  loadUserListFilms,
  addComment,
} from './action';
import { APIRoute, AuthorizationStatus, TIMEOUT_SHOW_ERROR } from '../const';
import { AuthData } from '../types/auth-data';
import { UserData } from '../types/user-data';
import { saveToken, dropToken } from '../services/token';
import { store } from './';
import { Comment } from '../types/reviews';
export const clearErrorAction = createAsyncThunk('game/clearError', () => {
  setTimeout(() => store.dispatch(setError(null)), TIMEOUT_SHOW_ERROR);
});

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

export const checkAuthAction = createAsyncThunk<
  void,
  undefined,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('user/checkAuth', async (_arg, { dispatch, extra: api }) => {
  try {
    await api.get(APIRoute.Login());
    dispatch(requireAuthorization(AuthorizationStatus.Auth));
  } catch {
    dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
  }
});

export const loginAction = createAsyncThunk<
  void,
  AuthData,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>(
  'user/login',
  async ({ login: email, password }, { dispatch, extra: api }) => {
    const {
      data: { token },
    } = await api.post<UserData>(APIRoute.Login(), { email, password });
    saveToken(token);
    dispatch(requireAuthorization(AuthorizationStatus.Auth));
  }
);

export const logoutAction = createAsyncThunk<
  void,
  undefined,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('user/logout', async (_arg, { dispatch, extra: api }) => {
  await api.delete(APIRoute.Logout());
  dropToken();
  dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
});

export const fetchSimilarFilmsAction = createAsyncThunk<
  void,
  string,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('loadSimilarFilms', async (id, { dispatch, extra: api }) => {
  await api
    .get<FilmCardType[]>(APIRoute.Similar(id))
    .then((res) => dispatch(loadSimilarFilms(res.data)));
});

export const fetchCommentsAction = createAsyncThunk<
  void,
  string,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('loadComments', async (id, { dispatch, extra: api }) => {
  await api
    .get<Comment[]>(APIRoute.Comments(id))
    .then((res) => dispatch(loadComments(res.data)));
});

export const sendCommentAction = createAsyncThunk<
  void,
  { id: string; rating: number; comment: string },
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('addComment', async ({ id, rating, comment }, { dispatch, extra: api }) => {
  await api
    .post<Comment>(APIRoute.Comments(id), {
      rating: rating,
      comment: comment,
    })
    .then((res) => dispatch(addComment(res.data)));
});

export const fetchUserListAction = createAsyncThunk<
  void,
  undefined,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('loadUserListFilms', async (_arg, { dispatch, extra: api }) => {
  await api
    .get<FilmCardType[]>(APIRoute.Favorite())
    .then((res) => dispatch(loadUserListFilms(res.data)));
});
