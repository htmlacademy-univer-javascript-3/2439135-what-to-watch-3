import { createReducer } from '@reduxjs/toolkit';
import {
  setGenre,
  setCount,
  setFilmsByGenre,
  setFilmsDisplayed,
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
  setSimilarFilmsDisplayed,
  setSimilarFilmsCount,
} from './action';
import { Genre, AuthorizationStatus } from '../const';
import { FilmCardType, FilmType, PromoFilmType } from '../types/films';
import { Comment } from '../types/reviews';

type InitalState = {
  genre: Genre;
  films: FilmCardType[];
  filmsDisplayed: FilmCardType[];
  similarFilmsDisplayed: FilmCardType[];
  filmsByGenre: FilmCardType[];
  count: number;
  similarFilmsCount: number;
  isFilmsDataLoading: boolean;
  promoFilm: PromoFilmType;
  film: FilmType | null;
  authorizationStatus: AuthorizationStatus;
  error: string | null;
  similarFilms: FilmCardType[];
  comments: Comment[];
  userListFilms: FilmCardType[];
};
const initialState: InitalState = {
  genre: Genre.All,
  films: [],
  filmsDisplayed: [],
  similarFilmsDisplayed: [],
  filmsByGenre: [],
  count: 8,
  similarFilmsCount: 8,
  isFilmsDataLoading: false,
  promoFilm: {
    id: '',
    name: '',
    posterImage: '',
    backgroundImage: '',
    videoLink: '',
    genre: Genre.All,
    released: -1,
    isFavorite: false,
  },
  film: null,
  authorizationStatus: AuthorizationStatus.Unknown,
  error: null,
  similarFilms: [],
  comments: [],
  userListFilms: [],
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setCount, (state, action) => {
      const { count } = action.payload;
      state.count = Math.min(state.filmsByGenre.length, count);
    })
    .addCase(setSimilarFilmsCount, (state, action) => {
      state.similarFilmsCount = Math.min(
        state.similarFilms.length,
        action.payload
      );
    })
    .addCase(setGenre, (state, action) => {
      const { genre } = action.payload;
      state.genre = genre;
    })
    .addCase(setFilmsByGenre, (state) => {
      if (state.genre === Genre.All) {
        state.filmsByGenre = state.films;
      } else {
        state.filmsByGenre = state.films.filter(
          (film) => film.genre === state.genre
        );
      }
    })
    .addCase(setFilmsDisplayed, (state) => {
      state.filmsDisplayed = state.filmsByGenre.slice(0, state.count);
    })
    .addCase(setSimilarFilmsDisplayed, (state) => {
      state.filmsDisplayed = state.similarFilms.slice(0, state.count);
    })
    .addCase(loadFilms, (state, action) => {
      const films = action.payload;
      state.films = films;
      state.filmsByGenre = films;
      state.filmsDisplayed = films.slice(0, Math.min(8, films.length));
    })
    .addCase(setFilmsDataLoadingStatus, (state, action) => {
      state.isFilmsDataLoading = action.payload;
    })
    .addCase(loadFilm, (state, action) => {
      state.film = action.payload;
    })
    .addCase(loadPromoFilm, (state, action) => {
      state.promoFilm = action.payload;
    })
    .addCase(requireAuthorization, (state, action) => {
      state.authorizationStatus = action.payload;
    })
    .addCase(setError, (state, action) => {
      state.error = action.payload;
    })

    .addCase(loadSimilarFilms, (state, action) => {
      state.similarFilms = action.payload;
    })
    .addCase(loadComments, (state, action) => {
      state.comments = action.payload;
    })
    .addCase(addComment, (state, action) => {
      state.comments = [...state.comments, action.payload];
    })
    .addCase(loadUserListFilms, (state, action) => {
      state.userListFilms = action.payload;
    });
});

export { reducer };
