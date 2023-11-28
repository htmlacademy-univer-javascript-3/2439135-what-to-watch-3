import ReactDOM from 'react-dom/client';
import App from './components/app/app';
import { store } from './store';
import { Provider } from 'react-redux';
import { fetchFilmsAction, fetchPromoFilmAction } from './store/api-actions';
import ErrorMessage from './components/error-message/error-message';
import { checkAuthAction } from './store/api-actions';

store.dispatch(checkAuthAction());
store.dispatch(fetchFilmsAction());
store.dispatch(fetchPromoFilmAction());
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <Provider store={store}>
    <ErrorMessage />
    <App />
  </Provider>
);
