import { FilmCards } from '../../components/film-cards/film-cards';
import { Film } from '../../types/films';
import { FilmImage, genres, Genre } from '../../const';
import { GetSrcFilmImage } from '../../functions/functions.ts';
import { useState } from 'react';

type WelcomePageProps = {
  mainFilm: Film;
  films: Film[];
};

function WelcomePage({ mainFilm, films }: WelcomePageProps): JSX.Element {
  const [selectedGenre, setSelectedGenre] = useState<Genre>(Genre.All);
  return (
    <>
      <section className="film-card">
        <div className="film-card__bg">
          <img
            src={GetSrcFilmImage(mainFilm.title, FilmImage.BgImage)}
            alt={mainFilm.title}
          />
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

        <div className="film-card__wrap">
          <div className="film-card__info">
            <div className="film-card__poster">
              <img
                src={GetSrcFilmImage(mainFilm.title, FilmImage.Poster)}
                alt={`${mainFilm.title} poster`}
                width="218"
                height="327"
              />
            </div>

            <div className="film-card__desc">
              <h2 className="film-card__title">{mainFilm.title}</h2>
              <p className="film-card__meta">
                <span className="film-card__genre">{mainFilm.title}</span>
                <span className="film-card__year">{mainFilm.year}</span>
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
            {genres.map((filmGenre) => (
              <li
                className={`catalog__genres-item
                ${
              (filmGenre === selectedGenre &&
                    'catalog__genres-item--active') ||
                  ''
              }`}
                key={filmGenre}
              >
                <div
                  className="catalog__genres-link"
                  onClick={() => setSelectedGenre(filmGenre)}
                >
                  {filmGenre}
                </div>
              </li>
            ))}
          </ul>

          <FilmCards
            mainFilmId={mainFilm.id}
            films={films}
            genre={selectedGenre}
          />

          <div className="catalog__more">
            <button className="catalog__button" type="button">
              Show more
            </button>
          </div>
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
