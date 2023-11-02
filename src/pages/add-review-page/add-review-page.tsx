import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';
import { AddReviewForm } from '../../components/add-review-form/add-review-form';
import { Logo } from '../../components/logo/logo';
import { Film } from '../../types/films';
import { useState } from 'react';
import { FilmImage } from '../../const';
import { GetSrcFilmImage } from '../../functions/functions.ts';
type AddReviewPageProps = {
  film: Film;
};

function AddReviewPage({ film }: AddReviewPageProps): JSX.Element {
  const [filmRayting, setfilmRayting] = useState(0);
  if (filmRayting !== undefined) {
    //на будущее с отправкой формы
  }
  return (
    <section className="film-card film-card--full">
      <Helmet>
        <title>Карточка фильма</title>
      </Helmet>
      <div className="film-card__header">
        <div className="film-card__bg">
          <img
            src={GetSrcFilmImage(film.title, FilmImage.BgImage)}
            alt={film.title}
          />
        </div>

        <h1 className="visually-hidden">WTW</h1>

        <header className="page-header">
          <Logo />

          <nav className="breadcrumbs">
            <ul className="breadcrumbs__list">
              <li className="breadcrumbs__item">
                <Link to={AppRoute.Film} className="readcrumbs__link">
                  {film.title}
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
            src={GetSrcFilmImage(film.title, FilmImage.Poster)}
            alt={`${film.title} poster`}
            width="218"
            height="327"
          />
        </div>
      </div>
      <div className="add-review">
        <AddReviewForm onAnswer={(raiting) => setfilmRayting(raiting)} />
      </div>
    </section>
  );
}

export default AddReviewPage;
