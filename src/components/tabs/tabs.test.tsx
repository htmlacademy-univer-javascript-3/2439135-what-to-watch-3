import { render, screen } from '@testing-library/react';
import TabReviews from './tab-reviews';
import TabDetails from './tab-details';
import { withHistory } from '../../utils/mock-component';
import { makeFakeComments, makeFakeFilm } from '../../utils/mocks';
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
