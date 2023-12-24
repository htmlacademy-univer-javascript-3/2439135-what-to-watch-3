import type { FilmType } from '../../types/films.ts';
import { useAppSelector } from '../../hooks';
import { getComments } from '../../store/film-data/selectors.ts';
type TabOverviewProps = {
  film: FilmType;
};
export function GetTextRating(rating: number): string {
  if (rating >= 0 && rating < 3) {
    return 'Bad';
  } else if (rating >= 3 && rating < 5) {
    return 'Normal';
  } else if (rating >= 5 && rating < 8) {
    return 'Good';
  } else if (rating >= 8 && rating < 10) {
    return 'Very good';
  } else {
    return 'Awesome';
  }
}
export function TabOverview({ film }: TabOverviewProps): JSX.Element {
  const comments = useAppSelector(getComments);
  const score = GetTextRating(film.rating);
  return (
    <>
      <div className="film-rating">
        <div className="film-rating__score">{score}</div>
        <p className="film-rating__meta">
          <span className="film-rating__level">{film.rating}</span>
          <span className="film-rating__count">{comments.length} ratings</span>
        </p>
      </div>

      <div className="film-card__text">
        <p>{film.description}</p>

        <p className="film-card__director">
          <strong>Director: {film.director}</strong>
        </p>

        <p className="film-card__starring">
          <strong>Starring: {film.starring}</strong>
        </p>
      </div>
    </>
  );
}
export default TabOverview;
