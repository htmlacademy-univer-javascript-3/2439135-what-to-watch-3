import { createSlice } from '@reduxjs/toolkit';
import { Genre, NameSpace } from '../../const.ts';
import { FilmData } from '../../types/state.ts';
import { PayloadAction } from '@reduxjs/toolkit';
import {
  sendCommentAction,
  fetchCommentsAction,
  fetchFilmAction,
  fetchFilmsAction,
  fetchPromoFilmAction,
  fetchSimilarFilmsAction,
} from '../api-actions.ts';

export const InitialNumberFilms = 8;

const initialState: FilmData = {
  genre: Genre.All,
  films: [],
  filmsDisplayed: [],
  similarFilmsDisplayed: [],
  filmsByGenre: [],
  genreFilmsCount: 8,
  similarFilmsCount: 8,
  promoFilm: null,
  film: null,
  //error: string | null;
  similarFilms: [],
  comments: [],
  userListFilms: [],
  isFilmsLoading: false,
  isSimilarFilmsLoading: false,
  isUserFilmsLoading: false,
  isPromoFilmLoading: false,
  isCommentsLoading: false,
  isFilmLoading: false,
  isCommentSend: false,
  hasError: false,
};

export const filmData = createSlice({
  name: NameSpace.Data,
  initialState,
  reducers: {
    increaseFilmsCount(state) {
      state.genreFilmsCount = Math.min(
        state.genreFilmsCount + 8,
        state.filmsByGenre.length
      );
    },

    resetFilmsCount(state) {
      state.genreFilmsCount = Math.min(8, state.filmsByGenre.length);
    },

    increaseSimilarFilmsCount(state) {
      state.similarFilmsCount = Math.min(
        state.similarFilmsCount + 8,
        state.similarFilms.length
      );
    },

    resetSimilarFilmsCount(state) {
      state.similarFilmsCount = Math.min(8, state.similarFilms.length);
    },

    setGenre(state, action: PayloadAction<{ genre: Genre }>) {
      const { genre } = action.payload;
      state.genre = genre;
    },

    setFilmsByGenre(state) {
      if (state.genre === Genre.All) {
        state.filmsByGenre = state.films;
      } else {
        state.filmsByGenre = state.films.filter(
          (film) => film.genre === state.genre
        );
      }
    },

    setFilmsDisplayed(state) {
      state.filmsDisplayed = state.filmsByGenre.slice(0, state.genreFilmsCount);
    },

    setSimilarFilmsDisplayed(state) {
      state.similarFilmsDisplayed = state.similarFilms.slice(
        0,
        state.similarFilmsCount
      );
    },
  },
  extraReducers(builder) {
    builder
      // load films
      .addCase(fetchFilmsAction.pending, (state) => {
        state.isFilmsLoading = true;
      })
      .addCase(fetchFilmsAction.fulfilled, (state, action) => {
        const films = action.payload;
        state.films = films;
        state.filmsByGenre = films;
        state.filmsDisplayed = films.slice(0, Math.min(8, films.length));
        state.isFilmsLoading = false;
      })
      .addCase(fetchFilmsAction.rejected, (state) => {
        state.isFilmsLoading = false;
        state.hasError = true;
      })

      // film
      .addCase(fetchFilmAction.pending, (state) => {
        state.isFilmLoading = true;
      })
      .addCase(fetchFilmAction.fulfilled, (state, action) => {
        state.film = action.payload;
        state.isFilmLoading = false;
      })
      .addCase(fetchFilmAction.rejected, (state) => {
        state.isFilmLoading = false;
        state.hasError = true;
      })
      // similar films
      .addCase(fetchSimilarFilmsAction.pending, (state) => {
        state.isSimilarFilmsLoading = true;
      })
      .addCase(fetchSimilarFilmsAction.fulfilled, (state, action) => {
        const films = action.payload;
        state.isSimilarFilmsLoading = false;
        state.similarFilms = films;
        state.similarFilmsDisplayed = films.slice(0, Math.min(8, films.length));
      })
      .addCase(fetchSimilarFilmsAction.rejected, (state) => {
        state.isSimilarFilmsLoading = false;
        state.hasError = true;
      })
      // promo film
      .addCase(fetchPromoFilmAction.pending, (state) => {
        state.isPromoFilmLoading = true;
      })
      .addCase(fetchPromoFilmAction.fulfilled, (state, action) => {
        state.promoFilm = action.payload;
        state.isPromoFilmLoading = false;
      })
      .addCase(fetchPromoFilmAction.rejected, (state) => {
        state.isPromoFilmLoading = false;
        state.hasError = true;
      })
      // comments
      .addCase(fetchCommentsAction.pending, (state) => {
        state.isCommentsLoading = true;
      })
      .addCase(fetchCommentsAction.fulfilled, (state, action) => {
        state.comments = action.payload;
        state.isCommentsLoading = false;
      })
      .addCase(fetchCommentsAction.rejected, (state) => {
        state.isCommentsLoading = false;
        state.hasError = true;
      })

      .addCase(sendCommentAction.pending, (state) => {
        state.isCommentSend = true;
      })
      .addCase(sendCommentAction.rejected, (state) => {
        state.isCommentSend = false;
        state.hasError = true;
      })
      .addCase(sendCommentAction.fulfilled, (state, action) => {
        state.comments = [...state.comments, action.payload];
        state.isCommentSend = false;
      });
  },
});

export const {
  increaseFilmsCount,
  resetFilmsCount,
  increaseSimilarFilmsCount,
  resetSimilarFilmsCount,

  setFilmsDisplayed,
  setGenre,
  setFilmsByGenre,
  setSimilarFilmsDisplayed,
} = filmData.actions;
