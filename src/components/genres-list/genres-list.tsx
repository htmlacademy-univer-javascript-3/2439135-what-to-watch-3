import { genres } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks';
import {
  setGenre,
  setCount,
  setFilmsByGenre,
  setFilmsDisplayed,
} from '../../store/action.ts';

export function GenresList(): JSX.Element {
  const dispatch = useAppDispatch();
  const genre = useAppSelector((state) => state.genre);
  return (
    <ul className="catalog__genres-list">
      {genres.map((filmGenre) => (
        <li
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
              dispatch(setCount({ count: 8 }));
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
