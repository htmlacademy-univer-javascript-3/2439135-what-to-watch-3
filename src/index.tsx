import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app';
import { FIRST_MAIN_FILM } from './mocks/films';
import { films } from '../src/mocks/films';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <App mainFilm={FIRST_MAIN_FILM} films={films} />
  </React.StrictMode>
);
