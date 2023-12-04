import WelcomePage from '../../pages/welcome-page/welcome-page';
import { Route, BrowserRouter, Routes } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { AppRoute } from '../../const';
import MyListPage from '../../pages/my-list-page/my-list-page';
import SignInPage from '../../pages/sign-in-pages/sign-in-page/sign-in-page';
import MoviePage from '../../pages/movie-page/movie-page';
import AddReviewPage from '../../pages/add-review-page/add-review-page';
import PlayerPage from '../../pages/player-pages/player-page/player-page';
import NotFoundScreen from '../../pages/not-found-page/not-found-page';
import PrivateRoute from '../private-route/private-route';
import { useAppSelector } from '../../hooks';
import Loading from '../../components/loading/loading';

function App(): JSX.Element {
  const isQuestionsDataLoading = useAppSelector(
    (state) => state.isFilmsDataLoading
  );
  const authorizationStatus = useAppSelector(
    (state) => state.authorizationStatus
  );
  const promoFilm = useAppSelector((state) => state.promoFilm);

  if (isQuestionsDataLoading) {
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
          <Route
            path={AppRoute.Player}
            element={<PlayerPage videoUrl={''} />}
          />
          <Route path="*" element={<NotFoundScreen />} />
        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  );
}

export default App;
