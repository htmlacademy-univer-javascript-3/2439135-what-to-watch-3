import { NameSpace, Genre } from '../../const';
import {
  makeFakeFilm,
  makeFakeFilms,
  makeFakePromoFilm,
  makeFakeSimilarFilms,
  makeFakeComments,
  makeFakeUserFilms,
} from '../../utils/mocks';
import {
  getErrorStatus,
  getComments,
  getCommentsDataLoadingStatus,
  getFilm,
  getFilmDataLoadingStatus,
  getFilms,
  getFilmsByGenre,
  getFilmsDataLoadingStatus,
  getGenre,
  getPromoFilm,
  getPromoFilmDataLoadingStatus,
  getSimilarFilms,
  getSimilarFilmsDataLoadingStatus,
  getUserFilms,
  getUserFilmsDataLoadingStatus,
} from './selectors';

describe('Films Data selectors', () => {
  const state = {
    [NameSpace.Data]: {
      genre: Genre.All,
      films: makeFakeFilms(),
      filmsByGenre: [],
      promoFilm: makeFakePromoFilm(),
      film: makeFakeFilm(),
      similarFilms: makeFakeSimilarFilms(),
      comments: makeFakeComments(),
      userListFilms: makeFakeUserFilms(),
      isFilmsLoading: false,
      isSimilarFilmsLoading: false,
      isUserFilmsLoading: false,
      isPromoFilmLoading: false,
      isCommentsLoading: false,
      isFilmLoading: false,
      isCommentSend: false,
      hasError: false,
      filmsDisplayed: [],
      similarFilmsDisplayed: [],
      genreFilmsCount: 8,
      similarFilmsCount: 8,
    },
  };

  it('should return genre from state', () => {
    const { genre } = state[NameSpace.Data];
    const result = getGenre(state);
    expect(result).toEqual(genre);
  });

  it('should return films from state', () => {
    const { films } = state[NameSpace.Data];
    const result = getFilms(state);
    expect(result).toEqual(films);
  });

  it('should return films by genre from state', () => {
    const { filmsByGenre } = state[NameSpace.Data];
    const result = getFilmsByGenre(state);
    expect(result).toEqual(filmsByGenre);
  });

  it('should return promo film from state', () => {
    const { promoFilm } = state[NameSpace.Data];
    const result = getPromoFilm(state);
    expect(result).toEqual(promoFilm);
  });

  it('should return film from state', () => {
    const { film } = state[NameSpace.Data];
    const result = getFilm(state);
    expect(result).toEqual(film);
  });

  it('should return similar films from state', () => {
    const { similarFilms } = state[NameSpace.Data];
    const result = getSimilarFilms(state);
    expect(result).toEqual(similarFilms);
  });
  it('should return comments from state', () => {
    const { comments } = state[NameSpace.Data];
    const result = getComments(state);
    expect(result).toEqual(comments);
  });
  it('should return user films from state', () => {
    const { userListFilms } = state[NameSpace.Data];
    const result = getUserFilms(state);
    expect(result).toEqual(userListFilms);
  });

  it('should return films data loading from state', () => {
    const { isFilmsLoading } = state[NameSpace.Data];
    const result = getFilmsDataLoadingStatus(state);
    expect(result).toEqual(isFilmsLoading);
  });

  it('should return promo film data loading from state', () => {
    const { isPromoFilmLoading } = state[NameSpace.Data];
    const result = getPromoFilmDataLoadingStatus(state);
    expect(result).toEqual(isPromoFilmLoading);
  });

  it('should return film data loading from state', () => {
    const { isFilmLoading } = state[NameSpace.Data];
    const result = getFilmDataLoadingStatus(state);
    expect(result).toEqual(isFilmLoading);
  });

  it('should return similar films data loading from state', () => {
    const { isSimilarFilmsLoading } = state[NameSpace.Data];
    const result = getSimilarFilmsDataLoadingStatus(state);
    expect(result).toEqual(isSimilarFilmsLoading);
  });
  it('should return comments data loading from state', () => {
    const { isCommentsLoading } = state[NameSpace.Data];
    const result = getCommentsDataLoadingStatus(state);
    expect(result).toEqual(isCommentsLoading);
  });
  it('should return user films data loading from state', () => {
    const { isUserFilmsLoading } = state[NameSpace.Data];
    const result = getUserFilmsDataLoadingStatus(state);
    expect(result).toEqual(isUserFilmsLoading);
  });

  it('should return error status from state', () => {
    const { hasError } = state[NameSpace.Data];
    const result = getErrorStatus(state);
    expect(result).toBe(hasError);
  });
});
