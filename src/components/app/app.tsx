import MainPage from '../../pages/main-page/main-page.tsx';
import { Route, Routes } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { AppRoute } from '../../const';
import MyListPage from '../../pages/my-list-page/my-list-page';
import SignInPage from '../../pages/sign-in-page/sign-in-page.tsx';
import MoviePage from '../../pages/movie-page/movie-page';
import AddReviewPage from '../../pages/add-review-page/add-review-page';
import PlayerPage from '../../pages/player-page/player-page.tsx';
import NotFoundScreen from '../../pages/not-found-page/not-found-page';
import PrivateRoute from '../private-route/private-route';
import { useAppSelector } from '../../hooks';
import { getAuthorizationStatus } from '../../store/user-process/selectors.ts';
import {
  getPromoFilm,
  getErrorStatus,
} from '../../store/film-data/selectors.ts';
import Error from '../error/error.tsx';
function App(): JSX.Element {
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const promoFilm = useAppSelector(getPromoFilm);
  const hasError = useAppSelector(getErrorStatus);
  if (hasError) {
    return <Error />;
  }
  return (
    <HelmetProvider>
      <Routes>
        <Route
          path={AppRoute.Main}
          element={
            <MainPage
              promoFilm={promoFilm}
              authorizationStatus={authorizationStatus}
            />
          }
        />
        <Route path={AppRoute.Login} element={<SignInPage />} />
        <Route
          path={AppRoute.MyList}
          element={
            <PrivateRoute authorizationStatus={authorizationStatus}>
              <MyListPage authorizationStatus={authorizationStatus} />
            </PrivateRoute>
          }
        />
        <Route
          path={AppRoute.Film}
          element={<MoviePage authorizationStatus={authorizationStatus} />}
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
      </Routes>{' '}
    </HelmetProvider>
  );
}

export default App;
