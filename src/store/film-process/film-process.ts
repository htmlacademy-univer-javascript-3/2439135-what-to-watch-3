/*import { createSlice } from '@reduxjs/toolkit';
import { Genre, NameSpace } from '../../const.ts';
import { FilmProcess } from '../../types/state.ts';

export const InitialNumberFilms = 8;

const initialState: FilmProcess = {
  genre: Genre.All,
  genreFilmsCount: 8,
  similarFilmsCount: 8,
};

export const filmProcess = createSlice({
  name: NameSpace.Film,
  initialState,
  reducers: {
    showMoreFilms(state) {
      state.genreFilmsCount = state.genreFilmsCount + 8;
    },
    hideFilms(state) {
      state.genreFilmsCount = 8;
    },
    showMoreSimilarFilms(state) {
      state.similarFilmsCount = state.similarFilmsCount + 8;
    },
    hideSimilarFilms(state) {
      state.similarFilmsCount = 8;
    },
    setGenre(state, action) {
      state.genre = action.payload;
    },

  },
});

export const {
  showMoreFilms,
  hideFilms,
  showMoreSimilarFilms,
  hideSimilarFilms,
} = filmProcess.actions;
*/
