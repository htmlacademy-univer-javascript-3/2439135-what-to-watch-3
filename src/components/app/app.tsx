import WelcomePage from '../../pages/welcome-page/welcome-page';
import { Route, BrowserRouter, Routes } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { AppRoute } from '../../const';
import MyListPage from '../../pages/my-list-page/my-list-page';
import SignInPage from '../../pages/sign-in-pages/sign-in-page/sign-in-page';
import MoviePage from '../../pages/movie-page/movie-page';
import AddReviewPage from '../../pages/add-review-page/add-review-page';
import PlayerPage from '../../pages/player-page/player-page.tsx';
import NotFoundScreen from '../../pages/not-found-page/not-found-page';
import PrivateRoute from '../private-route/private-route';
import { useAppSelector } from '../../hooks';
import Loading from '../../components/loading/loading';
import { getAuthorizationStatus } from '../../store/user-process/selectors.ts';
import {
  getFilmsDataLoadingStatus,
  getPromoFilm,
  getUserFilms,
} from '../../store/film-data/selectors.ts';
function App(): JSX.Element {
  const userFilms = useAppSelector(getUserFilms);
  const isFilmsDataLoading = useAppSelector(getFilmsDataLoadingStatus);
  const authorizationStatus = useAppSelector(getAuthorizationStatus);

  const promoFilm = useAppSelector(getPromoFilm);

  if (isFilmsDataLoading) {
    return <Loading />;
  }

  return (
    <HelmetProvider>
      <BrowserRouter>
        <Routes>
          <Route
            path={AppRoute.Main}
            element={
              <WelcomePage
                promoFilm={promoFilm}
                authorizationStatus={authorizationStatus}
                userFilms={userFilms}
              />
            }
          />
          <Route path={AppRoute.Login} element={<SignInPage />} />
          <Route
            path={AppRoute.MyList}
            element={
              <PrivateRoute authorizationStatus={authorizationStatus}>
                <MyListPage
                  authorizationStatus={authorizationStatus}
                  userFilms={userFilms}
                />
              </PrivateRoute>
            }
          />
          <Route
            path={AppRoute.Film}
            element={
              <MoviePage
                authorizationStatus={authorizationStatus}
                userFilms={userFilms}
              />
            }
          />
          <Route
            path={AppRoute.AddReview}
            element={
              <PrivateRoute authorizationStatus={authorizationStatus}>
                <AddReviewPage />
              </PrivateRoute>
            }
          />
          <Route path={AppRoute.Player} element={<PlayerPage />} />
          <Route path="*" element={<NotFoundScreen />} />
        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  );
}

export default App;
