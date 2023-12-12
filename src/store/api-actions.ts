import { AxiosInstance } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, State } from '../types/state.js';
import { FilmCardType, FilmType, PromoFilmType } from '../types/films';
import { APIRoute } from '../const';
import { AuthData } from '../types/auth-data';
import { UserData } from '../types/user-data';
import { saveToken, dropToken } from '../services/token';
import { Comment } from '../types/reviews';

export const fetchFilmsAction = createAsyncThunk<
  FilmCardType[],
  undefined,
  {
    dispatch: AppDispatch;
    extra: AxiosInstance;
  }
>('data/fetchFilms', async (_arg, { extra: api }) => {
  const { data } = await api.get<FilmCardType[]>(APIRoute.Films());
  return data;
});

export const fetchPromoFilmAction = createAsyncThunk<
  PromoFilmType,
  undefined,
  {
    dispatch: AppDispatch;
    extra: AxiosInstance;
  }
>('data/fetchPromoFilm', async (_arg, { extra: api }) => {
  const { data } = await api.get<PromoFilmType>('promo');
  return data;
});

export const fetchFilmAction = createAsyncThunk<
  FilmType,
  string,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('data/fetchFilm', async (id, { extra: api }) => {
  const { data } = await api.get<FilmType>(`/films/${id}`);
  return data;
});

export const checkAuthAction = createAsyncThunk<
  void,
  undefined,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('user/checkAuth', async (_arg, { extra: api }) => {
  // try {
  //   await api.get(APIRoute.Login());
  // } catch {}
  //let r = 0;
});

export const loginAction = createAsyncThunk<
  void,
  AuthData,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('user/login', async ({ login: email, password }, { extra: api }) => {
  const {
    data: { token },
  } = await api.post<UserData>(APIRoute.Login(), { email, password });
  saveToken(token);
  // dispatch(redirectToRoute(AppRoute.Result));
});

export const logoutAction = createAsyncThunk<
  void,
  undefined,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('user/logout', async (_arg, { extra: api }) => {
  await api.delete(APIRoute.Logout());
  dropToken();
});

export const fetchSimilarFilmsAction = createAsyncThunk<
  FilmCardType[],
  string,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('loadSimilarFilms', async (_arg, { extra: api }) => {
  const { data } = await api.get<FilmCardType[]>(APIRoute.Similar(_arg));
  return data;
});

export const fetchCommentsAction = createAsyncThunk<
  Comment[],
  string,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('loadComments', async (_arg, { extra: api }) => {
  const { data } = await api.get<Comment[]>(APIRoute.Comments(_arg));
  return data;
});

export const sendCommentAction = createAsyncThunk<
  Comment,
  {
    id: string;
    rating: number;
    comment: string;
  },
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
  >('data/sendComment', async ({ id, rating, comment }, { extra: api }) => {
    const {data} = await api.post<Comment>(APIRoute.Comments(id), {
      rating: rating,
      comment: comment,
    });
    alert('355354');
    return data;
  });



 // alert('api-act');



export const fetchUserListAction = createAsyncThunk<
  FilmCardType[],
  undefined,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('loadUserListFilms', async (_arg, { extra: api }) => {
  const { data } = await api.get<FilmCardType[]>(APIRoute.Favorite());
  return data;
});
