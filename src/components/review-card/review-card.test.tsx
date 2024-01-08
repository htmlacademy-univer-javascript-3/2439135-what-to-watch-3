import { render, screen } from '@testing-library/react';
import ReviewCard from './review-card';
import { withHistory } from '../../utils/mock-component';
import { makeFakeComments } from '../../utils/mocks';
describe('Component: ReviewCard', () => {
  it('should render correct', () => {
    const comment = makeFakeComments()[0];
    const preparedComponent = withHistory(<ReviewCard review={comment} />);
    const d = new Date(comment.date);
    const locale = 'en-us';
    const date = `${d.toLocaleString(locale, {
      month: 'long',
    })} ${d.getDate()}, ${d.getFullYear()}`;

    render(preparedComponent);
    expect(screen.getByTestId('review')).toBeInTheDocument();
    expect(screen.getByText(`${comment.user}`)).toBeInTheDocument();
    expect(screen.getByText(`${comment.rating}`)).toBeInTheDocument();
    expect(screen.getByText(`${date}`)).toBeInTheDocument();
  });
});
