import { films } from '../../mocks/films.ts';
import { Genre } from '../../const';

export function GetCountFilmsByGenre(genre: Genre): number {
  if (genre === Genre.All) {
    return films.length;
  }

  return films.filter((film) => film.genre === genre).length;
}
