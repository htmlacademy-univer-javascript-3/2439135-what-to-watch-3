import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';
import { AddReviewForm } from '../../components/add-review-form/add-review-form';
import { useAppSelector } from '../../hooks/index';
import { getFilm } from '../../store/film-data/selectors';
import { Helmet } from 'react-helmet-async';

function AddReviewPage(): JSX.Element {
  const film = useAppSelector(getFilm);
  return (
    <section className="film-card film-card--full">
      <Helmet>
        <title>What to watch. Add Review</title>
      </Helmet>
      <div className="film-card__header">
        <div className="film-card__bg">
          <img src={film?.backgroundImage} alt={film?.name} />
        </div>

        <h1 className="visually-hidden">WTW</h1>

        <header className="page-header">
          <div className="logo" data-testid="logo">
            <Link to="/" className="logo__link">
              {['W', 'T', 'W'].map((ch, index) => (
                <span
                  className={`logo__letter logo__letter--${index + 1}`}
                  data-testid="letter"
                  key={`${ch}`}
                >
                  {ch}{' '}
                </span>
              ))}
            </Link>
          </div>

          <nav className="breadcrumbs">
            <ul className="breadcrumbs__list">
              <li className="breadcrumbs__item">
                <Link to={AppRoute.Film} className="readcrumbs__link">
                  {film?.name}
                </Link>
              </li>
              <li className="breadcrumbs__item">
                <a className="breadcrumbs__link">Add review</a>
              </li>
            </ul>
          </nav>

          <ul className="user-block">
            <li className="user-block__item">
              <div className="user-block__avatar">
                <img
                  src="img/avatar.jpg"
                  alt="User avatar"
                  width="63"
                  height="63"
                />
              </div>
            </li>
            <li className="user-block__item">
              <a className="user-block__link">Sign out</a>
            </li>
          </ul>
        </header>

        <div className="film-card__poster film-card__poster--small">
          <img
            src={film?.posterImage}
            alt={`${film?.name || ''} poster`}
            width="218"
            height="327"
          />
        </div>
      </div>
      <div className="add-review">
        <AddReviewForm />
      </div>
    </section>
  );
}

export default AddReviewPage;
