import { FilmCards } from '../../components/film-cards/film-cards';
import { PromoFilmType } from '../../types/films';
import { useAppSelector, useAppDispatch } from '../../hooks';
import { GenresList } from '../../components/genres-list/genres-list.tsx';
import { AuthorizationStatus, AppRoute } from '../../const';
import { UserBlock } from '../../components/user-block/user-block.tsx';
import { useNavigate } from 'react-router';
import {
  getFilmsCount,
  getFilmsByGenre,
  getFilmsDisplayed,
} from '../../store/film-data/selectors.ts';
import {
  increaseFilmsCount,
  setFilmsDisplayed,
} from '../../store/film-data/film-data.ts';
import { Link } from 'react-router-dom';
type WelcomePageProps = {
  promoFilm: PromoFilmType | null;
  authorizationStatus: AuthorizationStatus;
};

function WelcomePage({
  promoFilm,
  authorizationStatus,
}: WelcomePageProps): JSX.Element {
  const dispatch = useAppDispatch();
  const countDisplayedFilms = useAppSelector(getFilmsCount);
  const filmsByGenre = useAppSelector(getFilmsByGenre);
  const films = useAppSelector(getFilmsDisplayed);
  const navigate = useNavigate();
  const userFilms = []; //useAppSelector(getUserFilms);
  const onCliclMyListHandler = () => {
    if (authorizationStatus === AuthorizationStatus.Auth) {
      navigate(AppRoute.MyList);
    } else {
      navigate(AppRoute.Login);
    }
  };

  return (
    <>
      <section className="film-card">
        <div className="film-card__bg">
          <img src={promoFilm?.backgroundImage} alt={promoFilm?.name} />
        </div>

        <h1 className="visually-hidden">WTW</h1>

        <header className="page-header film-card__head">
          <div className="logo">
            <a className="logo__link">
              <span className="logo__letter logo__letter--1">W</span>
              <span className="logo__letter logo__letter--2">T</span>
              <span className="logo__letter logo__letter--3">W</span>
            </a>
          </div>

          <UserBlock authorizationStatus={authorizationStatus} />
        </header>

        <div className="film-card__wrap">
          <div className="film-card__info">
            <div className="film-card__poster">
              <img
                src={promoFilm?.posterImage}
                alt={`${promoFilm?.name || ''} poster`}
                width="218"
                height="327"
              />
            </div>

            <div className="film-card__desc">
              <h2 className="film-card__title">{promoFilm?.name}</h2>
              <p className="film-card__meta">
                <span className="film-card__genre">{promoFilm?.name}</span>
                <span className="film-card__year">{promoFilm?.released}</span>
              </p>

              <div className="film-card__buttons">
                <Link
                  className="btn btn--play film-card__button"
                  type="button"
                  to={`/player/${promoFilm?.id || ''}`}
                >
                  <svg viewBox="0 0 19 19" width="19" height="19">
                    <use href="#play-s"></use>
                  </svg>
                  <span>Play</span>
                </Link>
                <button
                  className="btn btn--list film-card__button"
                  type="button"
                  onClick={onCliclMyListHandler}
                >
                  <svg viewBox="0 0 19 20" width="19" height="20">
                    <use href="#add"></use>
                  </svg>
                  <span>My list</span>
                  <span className="film-card__count">{userFilms.length}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="page-content">
        <section className="catalog">
          <h2 className="catalog__title visually-hidden">Catalog</h2>
          <ul className="catalog__genres-list">
            <GenresList />
          </ul>

          <FilmCards films={films} />

          {countDisplayedFilms < filmsByGenre.length && (
            <div className="catalog__more">
              <button
                className="catalog__button"
                type="button"
                onClick={() => {
                  dispatch(increaseFilmsCount());
                  dispatch(setFilmsDisplayed());
                }}
              >
                Show more
              </button>
            </div>
          )}
        </section>

        <footer className="page-footer">
          <div className="logo">
            <a className="logo__link logo__link--light">
              <span className="logo__letter logo__letter--1">W</span>
              <span className="logo__letter logo__letter--2">T</span>
              <span className="logo__letter logo__letter--3">W</span>
            </a>
          </div>

          <div className="copyright">
            <p>© 2019 What to watch Ltd.</p>
          </div>
        </footer>
      </div>
    </>
  );
}

export default WelcomePage;
