import { createAction } from '@reduxjs/toolkit';
import { Genre } from '../const';

export const genreChange = createAction<{ genre: Genre }>('films/genre');

export const settingFilms = createAction('films/filmsByGenre');

export const countChange = createAction<{ count: number }>('films/count');
