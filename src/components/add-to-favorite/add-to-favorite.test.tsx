import AddToFavorite from './add-to-favorite';
import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';
import { expect } from 'vitest';
import { withHistory, withStore } from '../../utils/mock-component';
import { makeFakeStore } from '../../utils/mocks';
import { datatype } from 'faker';
import { AuthorizationStatus } from '../../const';
describe('Component: AddReviewForm', () => {
  it('should render correct', () => {
    const id = datatype.uuid();
    const isFavorite = false;
    const authorizationStatus = AuthorizationStatus.Auth;
    const withHistoryComponent = withHistory(
      <AddToFavorite {...{ id, isFavorite, authorizationStatus }} />
    );
    const { withStoreComponent } = withStore(
      withHistoryComponent,
      makeFakeStore()
    );

    render(withStoreComponent);

    expect(screen.getByRole('button')).toBeInTheDocument();
    expect(screen.getByText(/My List/i)).toBeInTheDocument();
  });

  it('should render correctly when user add to favorite', async () => {
    const id = datatype.uuid();
    const isFavorite = false;
    const authorizationStatus = AuthorizationStatus.Auth;
    const withHistoryComponent = withHistory(
      <AddToFavorite {...{ id, isFavorite, authorizationStatus }} />
    );
    const { withStoreComponent } = withStore(
      withHistoryComponent,
      makeFakeStore()
    );

    render(withStoreComponent);
    await userEvent.click(screen.getByRole('button'));

    expect(screen.getByRole('button')).not.toBeDisabled();
  });
});
