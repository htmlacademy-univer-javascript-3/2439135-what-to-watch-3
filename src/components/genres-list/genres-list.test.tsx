import GenresList from './genres-list';
import { render, screen } from '@testing-library/react';
import { expect } from 'vitest';
import { withHistory, withStore } from '../../utils/mock-component';
import { makeFakeStore } from '../../utils/mocks';
import { genres } from '../../const';
describe('Component: GenresList', () => {
  it('should render correct', () => {
    const withHistoryComponent = withHistory(<GenresList />);
    const { withStoreComponent } = withStore(
      withHistoryComponent,
      makeFakeStore()
    );

    render(withStoreComponent);
    genres.map((filmGenre) =>
      expect(screen.getByText(filmGenre)).toBeInTheDocument()
    );
    expect(screen.getAllByTestId('genre').length).toBe(genres.length);
  });
});
