import { FilmCard } from '../film-cards/film-card';
import { Film } from '../../types/films';
import { Genre } from '../../const';

type FilmCardsProps = {
  mainFilmId: number;
  films: Film[];
  genre: Genre;
};

function GetFilmsByGenre(films: Film[], genre: Genre): Film[] {
  switch (genre) {
    case Genre.All:
      return films;
    default:
      return films.filter((film) => film.genre === genre);
  }
}

export function FilmCards({
  mainFilmId,
  films,
  genre,
}: FilmCardsProps): JSX.Element {
  return (
    <div className="catalog__films-list">
      {GetFilmsByGenre(films, genre).map((film) => {
        if (film.id !== mainFilmId) {
          return <FilmCard key={film.id} film={film} />;
        }
      })}
    </div>
  );
}
