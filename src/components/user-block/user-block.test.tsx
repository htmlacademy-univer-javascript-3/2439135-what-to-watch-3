import { render, screen } from '@testing-library/react';
import UserBlock from './user-block';
import UserBlockNoAuth from './user-block-no-auth';
import UserBlockAuth from './user-block-auth';
import { withHistory, withStore } from '../../utils/mock-component';
import { AuthorizationStatus } from '../../const';
import { makeFakeStore } from '../../utils/mocks';
describe('Component: UserBlock', () => {
  it('should render correct with AuthorizationStatus.NoAuth', () => {
    const preparedComponent = withHistory(
      <UserBlock authorizationStatus={AuthorizationStatus.NoAuth} />
    );

    render(preparedComponent);
    expect(screen.getByTestId('user-block-no-auth')).toBeInTheDocument();
  });

  it('should render correct with AuthorizationStatus.Unknown', () => {
    const preparedComponent = withHistory(
      <UserBlock authorizationStatus={AuthorizationStatus.Unknown} />
    );
    render(preparedComponent);
    expect(screen.getByTestId('user-block-no-auth')).toBeInTheDocument();
  });
});

describe('Component: UserBlockNoAuth', () => {
  it('should render correct', () => {
    const preparedComponent = withHistory(<UserBlockNoAuth />);
    render(preparedComponent);
    expect(screen.getByTestId('user-block-no-auth')).toBeInTheDocument();
    expect(screen.getByText('Sign in')).toBeInTheDocument();
  });
});

describe('Component: UserBlockAuth', () => {
  it('should render correct', () => {
    const withHistoryComponent = withHistory(<UserBlockAuth />);
    const { withStoreComponent } = withStore(
      withHistoryComponent,
      makeFakeStore()
    );
    render(withStoreComponent);

    expect(screen.getByTestId('user-block-auth')).toBeInTheDocument();
    expect(screen.getByText('Sign out')).toBeInTheDocument();
    expect(screen.getByRole('img')).toBeInTheDocument();
    expect(screen.getByAltText('User avatar')).toBeInTheDocument();
  });
});
