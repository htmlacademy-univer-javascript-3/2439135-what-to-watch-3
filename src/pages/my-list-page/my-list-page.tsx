import { Link } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../const';
import { FilmCards } from '../../components/film-cards/film-cards';
//import { useAppSelector } from '../../hooks';
import { UserBlock } from '../../components/user-block/user-block.tsx';
import { FilmCardType } from '../../types/films.ts';
type MyListPageProps = {
  authorizationStatus: AuthorizationStatus;
};
function MyListPage({ authorizationStatus }: MyListPageProps): JSX.Element {
  const films: FilmCardType[] = []; //useAppSelector((state) => getUserFilms);
  return (
    <div className="user-page">
      <header className="page-header user-page__head">
        <div className="logo">
          <Link to={AppRoute.Main} className="logo__link">
            <span className="logo__letter logo__letter--1">W</span>
            <span className="logo__letter logo__letter--2">T</span>
            <span className="logo__letter logo__letter--3">W</span>
          </Link>
        </div>

        <h1 className="page-title user-page__title">
          My list <span className="user-page__film-count">9</span>
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
