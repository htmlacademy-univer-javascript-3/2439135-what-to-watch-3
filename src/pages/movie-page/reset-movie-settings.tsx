import { useAppDispatch } from '../../hooks';
import {setFilmsByGenre,setGenre, setFilmsDisplayed, resetFilmsCount} from '../../store/film-data/film-data';
import { Genre } from '../../const';
export function ResetMovieSettings() {
  const dispatch = useAppDispatch();
  dispatch(setGenre({ genre: Genre.All }));
  dispatch(resetFilmsCount());
  dispatch(setFilmsByGenre());
  dispatch(setFilmsDisplayed());
}
