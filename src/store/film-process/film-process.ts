import { createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../const.ts';
import { FilmProcess } from '../../types/state.ts';
import {fetchFilmAction, fetchCommentsAction, addFilmInFavorite} from '../api-actions.ts';
export const InitialNumberFilms = 8;

const initialState: FilmProcess = {
  film: null,
  comments:[]
};

export const filmProcess = createSlice({
  name: NameSpace.Film,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchFilmAction.fulfilled, (state, action) => {
        state.film = action.payload;
      })
      .addCase(fetchFilmAction.rejected, (state) => {
        state.film = null;
      })
      .addCase(fetchCommentsAction.fulfilled, (state, action) => {
        state.comments = action.payload;
      })
      .addCase(fetchCommentsAction.rejected, (state) => {
        state.comments = [];
      })
      .addCase(addFilmInFavorite.fulfilled, (state, action) => {
        state.film = action.payload;
      });
  },
});
