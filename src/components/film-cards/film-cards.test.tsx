import { render, screen } from '@testing-library/react';
import { expect } from 'vitest';
import FilmCards from './film-cards';
import FilmCard from './film-card';
import { makeFakeFilms } from '../../utils/mocks';
import { withHistory } from '../../utils/mock-component';

describe('Component: FilmCards', () => {
  it('should render correct', () => {
    const expectedFilms = makeFakeFilms();
    const preparedComponent = withHistory(<FilmCards films={expectedFilms} />);
    render(preparedComponent);
    expect(screen.getByTestId('catalog__films-list')).toBeInTheDocument();
    expect(screen.getAllByTestId('film-card').length).toBe(
      expectedFilms.length
    );
  });
});

describe('Component: FilmCard', () => {
  it('should render correct', () => {
    const expectedFilm = makeFakeFilms()[0];
    const preparedComponent = withHistory(<FilmCard film={expectedFilm} />);
    render(preparedComponent);
    expect(screen.getByTestId('film-card')).toBeInTheDocument();
    expect(screen.getByText(expectedFilm.name)).toBeInTheDocument();
  });
});
