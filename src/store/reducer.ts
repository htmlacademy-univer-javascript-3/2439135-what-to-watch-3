import { createReducer } from '@reduxjs/toolkit';
import { genreChange, filmsByGenre } from './action';
import { Genre } from '../const';
import { films } from '../mocks/films';
import { GetFilmsByGenre } from '../functions/functions.ts';

const initialState = {
  genre: Genre.All,
  films,
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(genreChange, (state, action) => {
      const { genre } = action.payload;
      state.genre = genre;
    })
    .addCase(filmsByGenre, (state, action) => {
      const { genre } = action.payload;
      state.films = GetFilmsByGenre(genre, films);
    });
});

export { reducer };
