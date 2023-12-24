import MyListPage from './my-list-page';
import { withHistory, withStore } from '../../utils/mock-component';
import { render, screen } from '@testing-library/react';
import { makeFakeStore } from '../../utils/mocks';
import { AuthorizationStatus } from '../../const';

describe('Component: MyListPage', () => {
  it('should render correct', () => {
    const withHistoryComponent = withHistory(
      <MyListPage authorizationStatus={AuthorizationStatus.Auth} />
    );
    const store = makeFakeStore();

    const { withStoreComponent } = withStore(withHistoryComponent, store);
    render(withStoreComponent);
    expect(screen.getByText(/My list/i)).toBeInTheDocument();
    expect(screen.getByText(store.DATA.films.length)).toBeInTheDocument();
    expect(screen.getByText(/Catalog/i)).toBeInTheDocument();
  });
});
