import { FilmCard } from '../film-cards/film-card';
import { FilmCardType, FilmType } from '../../types/films';

type FilmCardsProps = {
  films: FilmType[] | FilmCardType[];
};

export function FilmCards({ films }: FilmCardsProps): JSX.Element {
  return (
    <div className="catalog__films-list" data-testid="catalog__films-list">
      {films.map((film) => (
        <FilmCard key={film.id} film={film} />
      ))}
    </div>
  );
}

export default FilmCards;
