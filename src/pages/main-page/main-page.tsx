import { FilmCards } from '../../components/film-cards/film-cards.tsx';
import { FilmType } from '../../types/films.ts';
import { useAppSelector, useAppDispatch } from '../../hooks/index.ts';
import { GenresList } from '../../components/genres-list/genres-list.tsx';
import { AuthorizationStatus } from '../../const.ts';
import { UserBlock } from '../../components/user-block/user-block.tsx';
import { Helmet } from 'react-helmet-async';
import {
  getFilmsCount,
  getFilmsByGenre,
  getFilmsDisplayed,
  getFilmsDataLoadingStatus,
  getPromoFilmDataLoadingStatus,
} from '../../store/film-data/selectors.ts';
import {
  increaseFilmsCount,
  setFilmsDisplayed,
} from '../../store/film-data/film-data.ts';
import { Link } from 'react-router-dom';
import { AddToFavorite } from '../../components/add-to-favorite/add-to-favorite.tsx';
import { Spinner } from '../../components/spinner/spinner.tsx';
type WelcomePageProps = {
  promoFilm: FilmType | null;
  authorizationStatus: AuthorizationStatus;
};

function MainPage({
  promoFilm,
  authorizationStatus,
}: WelcomePageProps): JSX.Element {
  const dispatch = useAppDispatch();
  const countDisplayedFilms = useAppSelector(getFilmsCount);
  const filmsByGenre = useAppSelector(getFilmsByGenre);
  const films = useAppSelector(getFilmsDisplayed);
  const isFilmsDataLoading = useAppSelector(getFilmsDataLoadingStatus);
  const isPromoFilmDataLoading = useAppSelector(getPromoFilmDataLoadingStatus);
  if (isFilmsDataLoading || isPromoFilmDataLoading) {
    return <Spinner />;
  }
  return (
    <>
      <Helmet>
        <title>What to watch. Main page</title>
      </Helmet>
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
                <AddToFavorite
                  authorizationStatus={authorizationStatus}
                  isFavorite={promoFilm?.isFavorite || false}
                  id={promoFilm?.id || ''}
                />
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

export default MainPage;
