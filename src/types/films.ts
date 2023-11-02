import { Genre } from '../const';
import { Review } from './reviews';
export type Film = {
  id: number;
  genre: Genre;
  year: string;
  title: string;
  text: string;
  director: string[];
  starring: string[];
  trailer: string;
  score: number;
  level: string;
  time: string;
  rewievs: Review[];
};
