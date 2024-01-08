import { Genre } from '../../const';
import {} from '../api-actions';
import {
  filmData,
  increaseFilmsCount,
  resetFilmsCount,
  increaseSimilarFilmsCount,
  resetSimilarFilmsCount,
  setGenre,
  setFilmsByGenre,
  setFilmsDisplayed,
  setSimilarFilmsDisplayed,
} from './film-data';
import { makeFakeGenre, makeFakeFilms } from '../../utils/mocks';

describe('Film data ', () => {
  const defaultState = {
    genre: Genre.All,
    films: [],
    filmsDisplayed: [],
    similarFilmsDisplayed: [],
    filmsByGenre: [],
    genreFilmsCount: 8,
    similarFilmsCount: 4,
    promoFilm: null,
    film: null,
    similarFilms: [],
    comments: [],
    userListFilms: [],
    isFilmsLoading: false,
    isSimilarFilmsLoading: false,
    isUserFilmsLoading: false,
    isPromoFilmLoading: false,
    isCommentsLoading: false,
    isFilmLoading: false,
    isCommentSend: false,
    hasError: false,
  };

  it('should return initial state with empty action', () => {
    const emptyAction = { type: '' };
    const expectedState = {
      ...defaultState,
      genreFilmsCount: 16,
      similarFilmsCount: 16,
    };

    const result = filmData.reducer(expectedState, emptyAction);

    expect(result).toEqual(expectedState);
  });

  it('should return default initial state with empty action and undefined state', () => {
    const emptyAction = { type: '' };

    const result = filmData.reducer(undefined, emptyAction);

    expect(result).toEqual(defaultState);
  });

  it('should shange genre with "setGenre" action', () => {
    const genre: Genre = makeFakeGenre();
    const expectedState = { ...defaultState, genre: genre };

    const result = filmData.reducer(undefined, setGenre({ genre }));

    expect(result).toEqual(expectedState);
  });

  it('should reset films count without films with "increaseFilmsCount" action', () => {
    const expectedState = { ...defaultState, genreFilmsCount: 0 };

    const result = filmData.reducer(undefined, increaseFilmsCount());

    expect(result).toEqual(expectedState);
  });

  it('should increase films count with "increaseFilmsCount" action', () => {
    const fakeFilms = makeFakeFilms();
    const expectedState = {
      ...defaultState,
      genreFilmsCount: Math.min(fakeFilms.length, 16),
      films: fakeFilms,
      filmsByGenre: fakeFilms,
    };

    const result = filmData.reducer(
      { ...defaultState, films: fakeFilms, filmsByGenre: fakeFilms },
      increaseFilmsCount()
    );

    expect(result).toEqual(expectedState);
  });

  it('should reset films count with "resetFilmsCount" action', () => {
    const expectedState = { ...defaultState, genreFilmsCount: 0 };

    const result = filmData.reducer(undefined, resetFilmsCount());

    expect(result).toEqual(expectedState);
  });

  it('should reset similar films count without films with "increaseSimilarFilmsCount" action', () => {
    const expectedState = { ...defaultState, similarFilmsCount: 0 };

    const result = filmData.reducer(undefined, increaseSimilarFilmsCount());

    expect(result).toEqual(expectedState);
  });

  it('should increase similar films count with "increaseSimilarFilmsCount" action', () => {
    const fakeFilms = makeFakeFilms();
    const expectedState = {
      ...defaultState,
      similarFilmsCount: Math.min(fakeFilms.length, 8),
      similarFilms: fakeFilms,
    };

    const result = filmData.reducer(
      { ...defaultState, similarFilms: fakeFilms },
      increaseSimilarFilmsCount()
    );

    expect(result).toEqual(expectedState);
  });

  it('should reset similar films count with "resetSimilarFilmsCount" action', () => {
    const expectedState = { ...defaultState, similarFilmsCount: 0 };

    const result = filmData.reducer(undefined, resetSimilarFilmsCount());

    expect(result).toEqual(expectedState);
  });

  it('should set films by genre with "setFilmsByGenre" action', () => {
    const fakeFilms = makeFakeFilms();
    const genre = makeFakeGenre();
    let filmsByGenre = fakeFilms;
    if (genre !== Genre.All) {
      filmsByGenre = fakeFilms.filter((film) => film.genre === genre);
    }
    const expectedState = {
      ...defaultState,
      genre: genre,
      films: fakeFilms,
      filmsByGenre: filmsByGenre,
    };

    const result = filmData.reducer(
      { ...defaultState, genre: genre, films: fakeFilms },
      setFilmsByGenre()
    );

    expect(result).toEqual(expectedState);
  });

  it('should set displayed films with "setFilmsDisplayed" action', () => {
    const fakeFilms = makeFakeFilms();
    const genreFilmsCount = Math.min(8, fakeFilms.length);
    const expectedState = {
      ...defaultState,
      filmsByGenre: fakeFilms,
      filmsDisplayed: fakeFilms.slice(0, genreFilmsCount),
      genreFilmsCount: genreFilmsCount,
    };

    const result = filmData.reducer(
      {
        ...defaultState,
        filmsByGenre: fakeFilms,
        genreFilmsCount: genreFilmsCount,
      },
      setFilmsDisplayed()
    );

    expect(result).toEqual(expectedState);
  });

  it('should set displayed similar films with "setSimilarFilmsDisplayed" action', () => {
    const fakeFilms = makeFakeFilms();
    const similarFilmsCount = Math.min(4, fakeFilms.length);
    const expectedState = {
      ...defaultState,
      similarFilms: fakeFilms,
      similarFilmsDisplayed: fakeFilms.slice(0, similarFilmsCount),
      similarFilmsCount: similarFilmsCount,
    };

    const result = filmData.reducer(
      {
        ...defaultState,
        similarFilms: fakeFilms,
        similarFilmsCount: similarFilmsCount,
      },
      setSimilarFilmsDisplayed()
    );

    expect(result).toEqual(expectedState);
  });
});
