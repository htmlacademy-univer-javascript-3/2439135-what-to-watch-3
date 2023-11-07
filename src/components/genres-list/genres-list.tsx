import { genres } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { genreChange, filmsByGenre } from '../../store/action';

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
              dispatch(genreChange({ genre: filmGenre }));
              dispatch(filmsByGenre({ genre: filmGenre }));
            }}
          >
            {filmGenre}
          </div>
        </li>
      ))}
    </ul>
  );
}
