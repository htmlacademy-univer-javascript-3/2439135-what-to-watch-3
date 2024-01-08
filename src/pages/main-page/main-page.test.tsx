import { render, screen } from '@testing-library/react';
import { withHistory, withStore } from '../../utils/mock-component';
import MainPage from './main-page';
import { makeFakeStore, makeFakePromoFilm } from '../../utils/mocks';
describe('Component: WelcomePage', () => {
  it('should render correctly', () => {
    const store = makeFakeStore();
    const promoFilm = makeFakePromoFilm();
    const { withStoreComponent } = withStore(
      <MainPage
        promoFilm={promoFilm}
        authorizationStatus={store.USER.authorizationStatus}
      />,
      store
    );
    const preparedComponent = withHistory(withStoreComponent);
    const oneAltText = `${promoFilm?.name || ''} poster`;
    const secondAltText = promoFilm?.name;
    const oneText = promoFilm?.released;
    const secondText = 'Catalog';
    render(preparedComponent);

    expect(screen.getByAltText(oneAltText)).toBeInTheDocument();
    expect(screen.getByAltText(secondAltText)).toBeInTheDocument();
    expect(screen.getByText(oneText)).toBeInTheDocument();
    expect(screen.getByText(secondText)).toBeInTheDocument();
  });
});
