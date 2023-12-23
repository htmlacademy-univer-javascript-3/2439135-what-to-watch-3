import { render, screen } from '@testing-library/react';
import UserBlock from './user-block';
import UserBlockNoAuth from './user-block-no-auth';
import { withHistory } from '../../utils/mock-component';
import { AuthorizationStatus } from '../../const';
describe('Component: UserBlock', () => {
  it('should render correct with AuthorizationStatus.NoAuth', () => {
    const preparedComponent = withHistory(
      <UserBlock authorizationStatus={AuthorizationStatus.NoAuth} />
    );
    // render(preparedAuthComponent);
    // expect(screen.getByTestId('user-block-auth')).toBeInTheDocument();
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
