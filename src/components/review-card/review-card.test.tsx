import { render, screen } from '@testing-library/react';
import ReviewCard from './review-card';
import { withHistory } from '../../utils/mock-component';
import { makeFakeComments } from '../../utils/mocks';
describe('Component: ReviewCard', () => {
  it('should render correct', () => {
    const comment = makeFakeComments()[0];
    const preparedComponent = withHistory(<ReviewCard rewiev={comment} />);
    render(preparedComponent);
    expect(screen.getByTestId('review')).toBeInTheDocument();
    expect(screen.getByText(`${comment.user}`)).toBeInTheDocument();
    expect(screen.getByText(`${comment.rating}`)).toBeInTheDocument();
    expect(
      screen.getByText(`${comment.date.split('T')[0]}`)
    ).toBeInTheDocument();
  });
});
