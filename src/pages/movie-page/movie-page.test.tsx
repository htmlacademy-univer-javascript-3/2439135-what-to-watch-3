import MoviePage from './movie-page';
import { withHistory, withStore } from '../../utils/mock-component';
import { render, screen } from '@testing-library/react';
import { makeFakeStore } from '../../utils/mocks';
import { AuthorizationStatus } from '../../const';

describe('Component: MoviePage', () => {
  it('should render correct', () => {
    const withHistoryComponent = withHistory(
      <MoviePage authorizationStatus={AuthorizationStatus.Auth} />
    );
    const store = makeFakeStore();
    const film = store.DATA.film;

    const { withStoreComponent } = withStore(withHistoryComponent, store);
    render(withStoreComponent);
    if (film) {
      const firstExpectedText = film.genre;
      const secondExpectedText = film.released;
      expect(screen.getByText(/More like this/i)).toBeInTheDocument();
      expect(screen.getByText(firstExpectedText)).toBeInTheDocument();
      expect(screen.getByText(secondExpectedText)).toBeInTheDocument();
    }
  });
});
