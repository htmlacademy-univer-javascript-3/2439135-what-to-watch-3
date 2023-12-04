import { useAppDispatch } from '../../hooks';
import {
  setFilmsDisplayed,
  setCount,
  setGenre,
  setFilmsByGenre,
} from '../../store/action';
import { Genre } from '../../const';
export function ResetMovieSettings() {
  const dispatch = useAppDispatch();
  dispatch(setGenre({ genre: Genre.All }));
  dispatch(setCount({ count: 8 }));
  dispatch(setFilmsByGenre());
  dispatch(setFilmsDisplayed());
}
