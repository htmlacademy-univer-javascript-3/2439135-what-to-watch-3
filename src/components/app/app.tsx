import WelcomePage from '../../pages/welcome-page/welcome-page';
import { Route, BrowserRouter, Routes } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { AppRoute, AuthorizationStatus } from '../../const';
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
  const films = useAppSelector((state) => state.films);
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
            element={<WelcomePage promoFilm={promoFilm} />}
          />
          <Route path={AppRoute.SignIn} element={<SignInPage />} />
          <Route
            path={AppRoute.MyList}
            element={
              <PrivateRoute authorizationStatus={AuthorizationStatus.NoAuth}>
                <MyListPage films={films} />
              </PrivateRoute>
            }
          />
          <Route path={AppRoute.Film} element={<MoviePage />} />
          <Route
            path={AppRoute.AddReview}
            element={<AddReviewPage film={promoFilm} />}
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
