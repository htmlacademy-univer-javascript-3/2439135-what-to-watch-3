import { createSlice } from '@reduxjs/toolkit';
import { AuthorizationStatus, Genre, NameSpace } from '../../const.ts';
import { FilmData } from '../../types/state.ts';
import { PayloadAction } from '@reduxjs/toolkit';
import {
  sendCommentAction,
  fetchCommentsAction,
  fetchFilmAction,
  fetchFilmsAction,
  fetchPromoFilmAction,
  fetchSimilarFilmsAction,
  fetchUserListAction,
} from '../api-actions.ts';
import {getAuthorizationStatus} from '../user-process/selectors.ts';
import { useAppSelector } from '../../hooks/index.ts';
const initialState: FilmData = {
  genre: Genre.All,
  films: [],
  filmsDisplayed: [],
  similarFilmsDisplayed: [],
  filmsByGenre: [],
  genreFilmsCount: 8,
  similarFilmsCount: 4,
  promoFilm: null,
  film: null,
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
        state.similarFilmsCount + 4,
        state.similarFilms.length
      );
    },

    resetSimilarFilmsCount(state) {
      state.similarFilmsCount = Math.min(4, state.similarFilms.length);
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
      .addCase(fetchFilmsAction.pending, (state) => {
        state.isFilmsLoading = true;
        state.hasError = false;
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
      .addCase(fetchFilmAction.pending, (state) => {
        state.isFilmLoading = true;
        state.hasError = false;
      })
      .addCase(fetchFilmAction.fulfilled, (state, action) => {
        state.film = action.payload;
        state.isFilmLoading = false;
      })
      .addCase(fetchFilmAction.rejected, (state) => {
        state.isFilmLoading = false;
        state.hasError = true;
      })
      .addCase(fetchSimilarFilmsAction.pending, (state) => {
        state.isSimilarFilmsLoading = true;
        state.hasError = false;
      })
      .addCase(fetchSimilarFilmsAction.fulfilled, (state, action) => {
        const films = action.payload;
        state.isSimilarFilmsLoading = false;
        state.similarFilms = films;
        state.similarFilmsDisplayed = films.slice(0, Math.min(4, films.length));
      })
      .addCase(fetchSimilarFilmsAction.rejected, (state) => {
        state.isSimilarFilmsLoading = false;
        state.hasError = true;
      })
      .addCase(fetchPromoFilmAction.pending, (state) => {
        state.isPromoFilmLoading = true;
        state.hasError = false;
      })
      .addCase(fetchPromoFilmAction.fulfilled, (state, action) => {
        state.promoFilm = action.payload;
        state.isPromoFilmLoading = false;
      })
      .addCase(fetchPromoFilmAction.rejected, (state) => {
        state.isPromoFilmLoading = false;
        state.hasError = true;
      })
      .addCase(fetchCommentsAction.pending, (state) => {
        state.isCommentsLoading = true;
        state.hasError = false;
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
        state.hasError = false;
      })
      .addCase(sendCommentAction.rejected, (state) => {
        state.isCommentSend = false;
      })
      .addCase(sendCommentAction.fulfilled, (state, action) => {
        state.comments = [...state.comments, action.payload];
        state.isCommentSend = false;
      })
      .addCase(fetchUserListAction.pending, (state) => {
        state.isUserFilmsLoading = true;
        state.hasError = false;
      })
      .addCase(fetchUserListAction.fulfilled, (state, action) => {
        state.userListFilms = action.payload;
        state.isUserFilmsLoading = false;
      })
      .addCase(fetchUserListAction.rejected, (state) => {
        state.isUserFilmsLoading = false;
        const authorizationStatus = useAppSelector(getAuthorizationStatus);
        if (authorizationStatus === AuthorizationStatus.Auth){
          state.hasError = true;
        }
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
