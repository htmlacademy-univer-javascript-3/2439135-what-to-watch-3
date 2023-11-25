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
} from './action';
import { Genre } from '../const';
import { FilmCardType, FilmType, PromoFilmType } from '../types/films';

type InitalState = {
  genre: Genre;
  films: FilmCardType[];
  filmsDisplayed: FilmCardType[];
  filmsByGenre: FilmCardType[];
  count: number;
  error: string | null;
  isFilmsDataLoading: boolean;
  promoFilm: PromoFilmType;
  film: FilmType | null;
};
const initialState: InitalState = {
  genre: Genre.All,
  films: [],
  filmsDisplayed: [],
  filmsByGenre: [],
  count: 8,
  error: null,
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
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setCount, (state, action) => {
      const { count } = action.payload;
      state.count = Math.min(state.filmsByGenre.length, count);
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
    });
});

export { reducer };
