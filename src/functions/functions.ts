import { FilmImage } from '../const';
import { Film } from '../types/films.ts';
import { Genre } from '../const';

export function GetFilmsByGenre(genre: Genre, films: Film[]): Film[] {
  switch (genre) {
    case Genre.All:
      return films;
    default:
      return films.filter((film) => film.genre === genre);
  }
}

export function GetSrcFilmImage(title: string, filmImage: FilmImage): string {
  let imgName = title.toLowerCase().replace(':', '').replace(/ /gi, '-');
  switch (filmImage) {
    case FilmImage.BgImage:
      imgName = `bg-${imgName}`;
      break;
    case FilmImage.Poster:
      imgName = `${imgName}-poster`;
      break;
    case FilmImage.SmallCard:
      break;
  }
  return `img/${imgName}.jpg`;
}
