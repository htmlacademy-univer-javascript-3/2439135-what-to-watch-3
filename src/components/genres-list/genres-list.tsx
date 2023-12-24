import { genres } from '../../const';
import { getGenre } from '../../store/film-data/selectors';
import {
  setFilmsByGenre,
  setFilmsDisplayed,
  setGenre,
  resetFilmsCount,
} from '../../store/film-data/film-data';
import { useAppDispatch, useAppSelector } from '../../hooks';
export function GenresList(): JSX.Element {
  const dispatch = useAppDispatch();
  const genre = useAppSelector(getGenre);
  return (
    <ul className="catalog__genres-list">
      {genres.map((filmGenre) => (
        <li
          data-testid="genre"
          className={`catalog__genres-item
                 ${
        (filmGenre === genre && 'catalog__genres-item--active') || ''
        }`}
          key={filmGenre}
        >
          <div
            className="catalog__genres-link"
            onClick={() => {
              dispatch(setGenre({ genre: filmGenre }));
              dispatch(setFilmsByGenre());
              dispatch(resetFilmsCount());
              dispatch(setFilmsDisplayed());
            }}
          >
            {filmGenre}
          </div>
        </li>
      ))}
    </ul>
  );
}
export default GenresList;
