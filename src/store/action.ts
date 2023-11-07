import { createAction } from '@reduxjs/toolkit';
import { Genre } from '../const';

export const genreChange = createAction<{ genre: Genre }>('game/genreChange');

export const filmsByGenre = createAction<{ genre: Genre }>('game/filmsByGenre');

