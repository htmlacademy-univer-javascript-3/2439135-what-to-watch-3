import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';
import { FilmCards } from '../../components/film-cards/film-cards';
import { Tabs } from '../../components/tabs/tabs';
import { useParams, useNavigate } from 'react-router';
import { useAppSelector, useAppDispatch } from '../../hooks';
import {
  fetchFilmAction,
  fetchCommentsAction,
  fetchSimilarFilmsAction,
} from '../../store/api-actions';
import { useEffect } from 'react';
import { NotFoundPage } from '../not-found-page/not-found-page';
import { ResetMovieSettings } from './reset-movie-settings';

import { AuthorizationStatus } from '../../const';
import { UserBlock } from '../../components/user-block/user-block.tsx';
type MoviePageProps = {
  authorizationStatus: AuthorizationStatus;
};
import {
  getFilm,
  getSimilarFilms,
  getComments,
  getSimilarFilmsCount,
} from '../../store/film-data/selectors.ts';

import {
  setSimilarFilmsDisplayed,
  increaseSimilarFilmsCount,
} from '../../store/film-data/film-data.ts';
function MoviePage({ authorizationStatus }: MoviePageProps): JSX.Element {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const mainFilm = useAppSelector(getFilm);
  const similarFilms = useAppSelector(getSimilarFilms);
  const comments = useAppSelector(getComments);
  const countDisplayedFilms = useAppSelector(getSimilarFilmsCount);
  const userListFilms = []; //useAppSelector(getUserFilms);
  const navigate = useNavigate();
  const onCliclMyListHandler = () => {
    if (authorizationStatus === AuthorizationStatus.Auth) {
      navigate(AppRoute.MyList);
    } else {
      navigate(AppRoute.Login);
    }
  };
  useEffect(() => {
    if (id) {
      dispatch(fetchFilmAction(id));
      dispatch(fetchCommentsAction(id));
      dispatch(fetchSimilarFilmsAction(id));
    }
  }, [dispatch, id]);

  if (!mainFilm) {
    return <NotFoundPage />;
  }
  return (
    <>
      <section className="film-card film-card--full">
        <div className="film-card__hero">
          <div className="film-card__bg">
            <img src={mainFilm?.backgroundImage} alt={mainFilm?.name} />
          </div>

          <h1 className="visually-hidden">WTW</h1>

          <header className="page-header film-card__head">
            <div className="logo">
              <Link
                to={AppRoute.Main}
                className="logo__link"
                onClick={() => {
                  ResetMovieSettings();
                }}
              >
                <span className="logo__letter logo__letter--1">W</span>
                <span className="logo__letter logo__letter--2">T</span>
                <span className="logo__letter logo__letter--3">W</span>
              </Link>
            </div>

            <UserBlock authorizationStatus={authorizationStatus} />
          </header>

          <div className="film-card__wrap">
            <div className="film-card__desc">
              <h2 className="film-card__title">{mainFilm?.name}</h2>
              <p className="film-card__meta">
                <span className="film-card__genre">{mainFilm?.genre}</span>
                <span className="film-card__year">{mainFilm?.released}</span>
              </p>

              <div className="film-card__buttons">
                <Link
                  className="btn btn--play film-card__button"
                  type="button"
                  to={`/player/${mainFilm.id}`}
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
                  <span className="film-card__count">
                    {userListFilms.length}
                  </span>
                </button>
                {authorizationStatus === AuthorizationStatus.Auth && (
                  <Link
                    to={AppRoute.AddReview}
                    className="btn film-card__button"
                  >
                    Add review
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="film-card__wrap film-card__translate-top">
          <div className="film-card__info">
            <div className="film-card__poster film-card__poster--big">
              <img
                src={mainFilm?.backgroundImage}
                alt={mainFilm?.name}
                width="218"
                height="327"
              />
            </div>

            <Tabs film={mainFilm} comments={comments} />
          </div>
        </div>
      </section>

      <div className="page-content">
        <section className="catalog catalog--like-this">
          <h2 className="catalog__title">More like this</h2>

          <FilmCards films={similarFilms} />
          {countDisplayedFilms < similarFilms.length && (
            <div className="catalog__more">
              <button
                className="catalog__button"
                type="button"
                onClick={() => {
                  dispatch(increaseSimilarFilmsCount());
                  dispatch(setSimilarFilmsDisplayed());
                }}
              >
                Show more
              </button>
            </div>
          )}
        </section>

        <footer className="page-footer">
          <div
            className="logo"
            onClick={() => {
              ResetMovieSettings();
            }}
          >
            <Link to={AppRoute.Main} className="logo__link logo__link--light">
              <span className="logo__letter logo__letter--1">W</span>
              <span className="logo__letter logo__letter--2">T</span>
              <span className="logo__letter logo__letter--3">W</span>
            </Link>
          </div>

          <div className="copyright">
            <p>© 2019 What to watch Ltd.</p>
          </div>
        </footer>
      </div>
    </>
  );
}

export default MoviePage;
