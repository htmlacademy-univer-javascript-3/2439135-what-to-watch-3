import AddReviewForm from './add-review-form';
import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';
import { expect } from 'vitest';
import { withHistory, withStore } from '../../utils/mock-component';
import { makeFakeStore } from '../../utils/mocks';

describe('Component: AddReviewForm', () => {
  it('should render correct', () => {
    const withHistoryComponent = withHistory(<AddReviewForm />);
    const { withStoreComponent } = withStore(
      withHistoryComponent,
      makeFakeStore()
    );

    render(withStoreComponent);
    expect(screen.getByTestId('form')).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeInTheDocument();
    expect(screen.getAllByTestId('star').length).toBe(10);
    expect(screen.getByText('Post')).toBeInTheDocument();
    [10, 9, 8, 7, 6, 5, 4, 3, 2, 1].map((num) =>
      expect(screen.getByText(`Rating ${num}`)).toBeInTheDocument()
    );
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  it('should render correctly when user filled in the fields', async () => {
    const expectedValue = '12345sdvsdvads';
    const withHistoryComponent = withHistory(<AddReviewForm />);
    const { withStoreComponent } = withStore(
      withHistoryComponent,
      makeFakeStore()
    );

    render(withStoreComponent);
    await userEvent.type(screen.getByTestId('comment'), expectedValue);
    await userEvent.click(screen.getAllByTestId('star')[7]);

    expect(screen.getByDisplayValue(expectedValue)).toBeInTheDocument();
    expect(screen.getByDisplayValue(4)).toBeInTheDocument();
  });
});
