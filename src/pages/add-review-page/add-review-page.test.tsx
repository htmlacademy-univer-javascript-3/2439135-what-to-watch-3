import AddReviewPage from './add-review-page';
import { withHistory, withStore } from '../../utils/mock-component';
import { render, screen } from '@testing-library/react';
import { makeFakeStore } from '../../utils/mocks';

describe('Component: TabOverview', () => {
  it('should render correct', () => {
    const withHistoryComponent = withHistory(<AddReviewPage />);
    const store = makeFakeStore();
    const film = store.DATA.film;

    const { withStoreComponent } = withStore(withHistoryComponent, store);
    render(withStoreComponent);
    if (film) {
      const firstExpectedText = film.name;
      const secondExpectedText = `${film?.name || ''} poster`;
      expect(screen.getByAltText(firstExpectedText)).toBeInTheDocument();
      expect(screen.getByText(firstExpectedText)).toBeInTheDocument();
      expect(screen.getByText(/Add review/i)).toBeInTheDocument();
      expect(screen.getByAltText(secondExpectedText)).toBeInTheDocument();
      expect(screen.getByText(/Sign out/i)).toBeInTheDocument();
      expect(screen.getByText(/WTW/i)).toBeInTheDocument();
    }
  });
});
