import { render, screen } from '@testing-library/react';
import { AppRoute, AuthorizationStatus } from '../../const';
import App from './app';
import { withHistory, withStore } from '../../utils/mock-component';
import { makeFakeStore } from '../../utils/mocks';
import { MemoryHistory, createMemoryHistory } from 'history';

describe('Application Routing', () => {
  let mockHistory: MemoryHistory;

  beforeEach(() => {
    mockHistory = createMemoryHistory();
  });
  it('should render "MainPage" when user navigate to "/"', () => {
    const withHistoryComponent = withHistory(<App />, mockHistory);
    const { withStoreComponent } = withStore(
      withHistoryComponent,
      makeFakeStore()
    );
    mockHistory.push(AppRoute.Main);

    render(withStoreComponent);

    expect(screen.getByText(/Play/i)).toBeInTheDocument();
    expect(screen.getByText(/WTW/i)).toBeInTheDocument();
    expect(screen.getByText(/Catalog/i)).toBeInTheDocument();
  });

  it('should render "AuthPage" when user navigate to "/login"', () => {
    const withHistoryComponent = withHistory(<App />, mockHistory);
    const { withStoreComponent } = withStore(
      withHistoryComponent,
      makeFakeStore()
    );
    mockHistory.push(AppRoute.Login);

    render(withStoreComponent);

    expect(screen.getByText(/Email address/i)).toBeInTheDocument();
    expect(screen.getByText(/Password/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email address/i)).toBeInTheDocument();
  });

  it('should render "FilmPage" when user navigate to "/film"', () => {
    const withHistoryComponent = withHistory(<App />, mockHistory);
    const { withStoreComponent } = withStore(
      withHistoryComponent,
      makeFakeStore({
        USER: { authorizationStatus: AuthorizationStatus.Auth },
      })
    );
    mockHistory.push(AppRoute.MyList);

    render(withStoreComponent);

    expect(screen.getByText(/Catalog/i)).toBeInTheDocument();
    expect(screen.getByText(/My list/i)).toBeInTheDocument();
  });

  it('should render "AddReviewPage" when user navigate to "/addReview"', () => {
    const withHistoryComponent = withHistory(<App />, mockHistory);
    const { withStoreComponent } = withStore(
      withHistoryComponent,
      makeFakeStore({
        USER: { authorizationStatus: AuthorizationStatus.Auth },
      })
    );
    mockHistory.push(AppRoute.AddReview);

    render(withStoreComponent);

    expect(screen.getByText(/Add review/i)).toBeInTheDocument();
    expect(screen.getByText(/WTW/i)).toBeInTheDocument();
    expect(screen.getByText(/Sign out/i)).toBeInTheDocument();
  });

  it('should render "PlayerPage" when user navigate to "/player"', () => {
    const withHistoryComponent = withHistory(<App />, mockHistory);
    const { withStoreComponent } = withStore(
      withHistoryComponent,
      makeFakeStore({
        USER: { authorizationStatus: AuthorizationStatus.Auth },
      })
    );
    mockHistory.push(AppRoute.Player);

    render(withStoreComponent);

    expect(screen.getByText(/Toggler/i)).toBeInTheDocument();
    expect(screen.getByText(/Full screen/i)).toBeInTheDocument();
    expect(screen.getByText(/Transpotting/i)).toBeInTheDocument();
  });

  it('should render "NotFoundPage" when user navigate to non-existent route', () => {
    const withHistoryComponent = withHistory(<App />, mockHistory);
    const { withStoreComponent } = withStore(
      withHistoryComponent,
      makeFakeStore()
    );
    const unknownRoute = '/unknown-route';
    mockHistory.push(unknownRoute);

    render(withStoreComponent);

    expect(screen.getByText('404. Page not found')).toBeInTheDocument();
    expect(screen.getByText('Вернуться на главную')).toBeInTheDocument();
  });
});
