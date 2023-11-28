import { FilmCards } from '../../components/film-cards/film-cards';
import { PromoFilmType } from '../../types/films';
import { useAppSelector, useAppDispatch } from '../../hooks';
import { GenresList } from '../../components/genres-list/genres-list.tsx';
import { setCount, setFilmsDisplayed } from '../../store/action.ts';
import { AuthorizationStatus } from '../../const';
import { UserBlockAuth } from '../../components/user-block/user-block-auth.tsx';
import { UserBlockNoAuth } from '../../components/user-block/user-block-no-auth.tsx';
type WelcomePageProps = {
  promoFilm: PromoFilmType;
  authorizationStatus: AuthorizationStatus;
};

function WelcomePage({
  promoFilm,
  authorizationStatus,
}: WelcomePageProps): JSX.Element {
  const dispatch = useAppDispatch();
  const countDisplayedFilms = useAppSelector((state) => state.count);
  const countFilmsByGenres = useAppSelector((state) => state.filmsByGenre);
  const films = useAppSelector((state) => state.filmsDisplayed);
  return (
    <>
      <section className="film-card">
        <div className="film-card__bg">
          <img src={promoFilm.backgroundImage} alt={promoFilm.name} />
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

          {authorizationStatus === AuthorizationStatus.Auth ? (
            <UserBlockAuth />
          ) : (
            <UserBlockNoAuth />
          )}
        </header>

        <div className="film-card__wrap">
          <div className="film-card__info">
            <div className="film-card__poster">
              <img
                src={promoFilm.posterImage}
                alt={`${promoFilm.name} poster`}
                width="218"
                height="327"
              />
            </div>

            <div className="film-card__desc">
              <h2 className="film-card__title">{promoFilm.name}</h2>
              <p className="film-card__meta">
                <span className="film-card__genre">{promoFilm.name}</span>
                <span className="film-card__year">{promoFilm.released}</span>
              </p>

              <div className="film-card__buttons">
                <button
                  className="btn btn--play film-card__button"
                  type="button"
                >
                  <svg viewBox="0 0 19 19" width="19" height="19">
                    <use href="#play-s"></use>
                  </svg>
                  <span>Play</span>
                </button>
                <button
                  className="btn btn--list film-card__button"
                  type="button"
                >
                  <svg viewBox="0 0 19 20" width="19" height="20">
                    <use href="#add"></use>
                  </svg>
                  <span>My list</span>
                  <span className="film-card__count">9</span>
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

          {countDisplayedFilms < countFilmsByGenres.length && (
            <div className="catalog__more">
              <button
                className="catalog__button"
                type="button"
                onClick={() => {
                  dispatch(setCount({ count: countDisplayedFilms + 8 }));
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
