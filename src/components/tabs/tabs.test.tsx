import { render, screen } from '@testing-library/react';
import TabReviews from './tab-reviews';
import TabDetails from './tab-details';
import { TabOverview, GetTextRating } from './tab-overview';
import { makeFakeComments, makeFakeFilm } from '../../utils/mocks';
import { withHistory, withStore } from '../../utils/mock-component';
import { makeFakeStore } from '../../utils/mocks';
describe('Component: Tabs', () => {
  describe('Component: TabDetails', () => {
    it('should render correct', () => {
      const film = makeFakeFilm();
      const preparedComponent = withHistory(<TabDetails film={film} />);

      render(preparedComponent);

      expect(screen.getByTestId('details')).toBeInTheDocument();
      expect(screen.getByText('Director')).toBeInTheDocument();
      expect(screen.getByText(`${film.director}`)).toBeInTheDocument();
      expect(screen.getByText('Starring')).toBeInTheDocument();
      expect(screen.getByText('Run Time')).toBeInTheDocument();
      expect(screen.getByText(`${film.runTime}`)).toBeInTheDocument();
      expect(screen.getByText('Genre')).toBeInTheDocument();
      expect(screen.getByText(`${film.genre}`)).toBeInTheDocument();
      expect(screen.getByText('Released')).toBeInTheDocument();
    });
  });

  describe('Component: TabReviews', () => {
    it('should render correct', () => {
      const comments = makeFakeComments();
      const film = makeFakeFilm();
      const preparedComponent = withHistory(
        <TabReviews film={film} comments={comments} />
      );

      render(preparedComponent);
      expect(screen.getByTestId('reviews')).toBeInTheDocument();
      expect(screen.getAllByTestId('review').length).toBe(comments.length);
    });
  });
  describe('Component: TabOverview', () => {
    it('should render correct', () => {
      const film = makeFakeFilm();
      const withHistoryComponent = withHistory(<TabOverview film={film} />);
      const score = GetTextRating(film.rating);
      const { withStoreComponent } = withStore(
        withHistoryComponent,
        makeFakeStore()
      );
      render(withStoreComponent);
      expect(screen.getByText(film.rating)).toBeInTheDocument();
      expect(
        screen.getByText(`Director: ${film.director}`)
      ).toBeInTheDocument();
      expect(screen.getByText(/Starring/i)).toBeInTheDocument();
      expect(screen.getByText(score)).toBeInTheDocument();
    });
  });
});
