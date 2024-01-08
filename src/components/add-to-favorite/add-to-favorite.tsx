import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/index';
import { AuthorizationStatus, AppRoute } from '../../const';
import {
  addFilmInFavorite,
  fetchFilmAction,
  fetchPromoFilmAction,
  fetchUserListAction,
} from '../../store/api-actions.ts';
import { getPromoFilm, getUserFilms } from '../../store/film-data/selectors.ts';
import { useEffect } from 'react';
type AddToFavoriteProps = {
  id: string;
  isFavorite: boolean;
  authorizationStatus: AuthorizationStatus;
};

export function AddToFavorite({
  id,
  authorizationStatus,
  isFavorite,
}: AddToFavoriteProps): JSX.Element {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const promoFilm = useAppSelector(getPromoFilm);
  const userFilms = useAppSelector(getUserFilms);

  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      dispatch(fetchUserListAction());
    }
    return () => {
      isMounted = false;
    };
  }, [dispatch, isFavorite]);

  const onCliclMyListHandler = () => {
    if (authorizationStatus === AuthorizationStatus.Auth) {
      dispatch(addFilmInFavorite({ filmId: id, status: !isFavorite }));
      dispatch(fetchFilmAction(id));
      dispatch(fetchUserListAction());

      if (promoFilm && promoFilm.id === id) {
        dispatch(fetchPromoFilmAction());
      }
    } else {
      navigate(AppRoute.Login);
    }
  };

  return (
    <button
      className="btn btn--list film-card__button"
      type="button"
      onClick={onCliclMyListHandler}
    >
      {isFavorite ? (
        <svg viewBox="0 0 18 14" width="18" height="14">
          <use xlinkHref="#in-list"></use>
        </svg>
      ) : (
        <svg viewBox="0 0 19 20" width="19" height="20">
          <use xlinkHref="#add"></use>
        </svg>
      )}
      <span>My list</span>
      <span className="film-card__count">
        {authorizationStatus === AuthorizationStatus.Auth
          ? userFilms.length
          : 0}
      </span>
    </button>
  );
}
export default AddToFavorite;
