import { createReducer } from '@reduxjs/toolkit';
import { genreChange, countChange, settingFilms } from './action';
import { Genre } from '../const';
import { films } from '../mocks/films';

const initialState = {
  genre: Genre.All,
  films: films.slice(0, 8),
  count: 8,
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(countChange, (state, action) => {
      const { count } = action.payload;
      state.count = count;
    })
    .addCase(genreChange, (state, action) => {
      const { genre } = action.payload;
      state.genre = genre;
    })
    .addCase(settingFilms, (state) => {
      if (state.genre === Genre.All) {
        state.films = films.slice(0, state.count);
      } else {
        state.films = films
          .filter((film) => film.genre === state.genre)
          .slice(0, state.count);
      }
    });
});

export { reducer };
