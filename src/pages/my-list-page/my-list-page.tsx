import { Link } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../const';
import { FilmCards } from '../../components/film-cards/film-cards';
import { UserBlock } from '../../components/user-block/user-block.tsx';
import {
  getUserFilms,
  getUserFilmsDataLoadingStatus,
} from '../../store/film-data/selectors.ts';
import { useAppSelector, useAppDispatch } from '../../hooks';
import { fetchUserListAction } from '../../store/api-actions.ts';
import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Spinner } from '../../components/spinner/spinner.tsx';
type MyListPageProps = {
  authorizationStatus: AuthorizationStatus;
};
function MyListPage({ authorizationStatus }: MyListPageProps): JSX.Element {
  const films = useAppSelector(getUserFilms);
  const isUserFilmsDataLoading = useAppSelector(getUserFilmsDataLoadingStatus);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchUserListAction());
  }, [dispatch]);

  if (isUserFilmsDataLoading) {
    return <Spinner />;
  }
  return (
    <div className="user-page">
      <Helmet>
        <title>What to watch. My movie list</title>
      </Helmet>
      <header className="page-header user-page__head">
        <div className="logo">
          <Link to={AppRoute.Main} className="logo__link">
            <span className="logo__letter logo__letter--1">W</span>
            <span className="logo__letter logo__letter--2">T</span>
            <span className="logo__letter logo__letter--3">W</span>
          </Link>
        </div>

        <h1 className="page-title user-page__title">
          My list <span className="user-page__film-count">{films.length}</span>
        </h1>
        <UserBlock authorizationStatus={authorizationStatus} />
      </header>

      <section className="catalog">
        <h2 className="catalog__title visually-hidden">Catalog</h2>

        <FilmCards films={films} />
      </section>

      <footer className="page-footer">
        <div className="logo">
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
  );
}

export default MyListPage;
