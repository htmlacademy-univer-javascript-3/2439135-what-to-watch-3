import ReactDOM from 'react-dom/client';
import App from './components/app/app';
import { store } from './store';
import { Provider } from 'react-redux';
import {
  fetchFilmsAction,
  fetchPromoFilmAction,
} from './store/api-actions';
import { HelmetProvider } from 'react-helmet-async';
import { ToastContainer } from 'react-toastify';
import React from 'react';
import { checkAuthAction } from './store/api-actions';
import HistoryRouter from './components/history-route/history-route';
import browserHistory from './browser-history';
store.dispatch(checkAuthAction());
store.dispatch(fetchFilmsAction());
store.dispatch(fetchPromoFilmAction());
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <HelmetProvider>
        <HistoryRouter history={browserHistory}>
          <ToastContainer />
          <App />
        </HistoryRouter>
      </HelmetProvider>
    </Provider>
  </React.StrictMode>
);
