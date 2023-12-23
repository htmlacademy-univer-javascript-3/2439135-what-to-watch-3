import { configureMockStore } from '@jedmao/redux-mock-store';
import { createAPI } from '../services/api';
import MockAdapter from 'axios-mock-adapter';
import thunk from 'redux-thunk';
import { Action } from 'redux';
import {
  AppThunkDispatch,
  extractActionsTypes,
  makeFakeFilm,
  makeFakeFilms,
  makeFakeComments,
  makeFakePromoFilm,
  makeFakeUserFilms,
} from '../utils/mocks';
import { State } from '../types/state';
import {
  checkAuthAction,
  loginAction,
  logoutAction,
  fetchFilmsAction,
  fetchPromoFilmAction,
  fetchFilmAction,
  sendCommentAction,
  fetchUserListAction,
  addFilmInFavorite,
} from './api-actions';
import { APIRoute } from '../const';
import { AuthData } from '../types/auth-data';
import * as tokenStorage from '../services/token';

describe('Async actions', () => {
  const axios = createAPI();
  const mockAxiosAdapter = new MockAdapter(axios);
  const middleware = [thunk.withExtraArgument(axios)];
  const mockStoreCreator = configureMockStore<
    State,
    Action<string>,
    AppThunkDispatch
  >(middleware);
  let store: ReturnType<typeof mockStoreCreator>;

  beforeEach(() => {
    store = mockStoreCreator({ DATA: { films: [] } });
  });

  describe('checkAuthAction', () => {
    it('should dispatch "checkAuthAction.pending" and "checkAuthAction.fulfilled" with thunk "checkAuthAction', async () => {
      mockAxiosAdapter.onGet(APIRoute.Login()).reply(200);

      await store.dispatch(checkAuthAction());
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        checkAuthAction.pending.type,
        checkAuthAction.fulfilled.type,
      ]);
    });

    it('should dispatch "checkAuthAction.pending" and "checkAuthAction.rejected" when server response 400', async () => {
      mockAxiosAdapter.onGet(APIRoute.Login()).reply(400);

      await store.dispatch(checkAuthAction());
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        checkAuthAction.pending.type,
        checkAuthAction.rejected.type,
      ]);
    });
  });

  describe('loginAction', () => {
    it('should dispatch "loginAction.pending", "redirectToRoute", "loginAction.fulfilled" when server response 200', async () => {
      const fakeUser: AuthData = { login: 'test@test.ru', password: '123456' };
      const fakeServerReplay = { token: 'secret' };
      mockAxiosAdapter.onPost(APIRoute.Login()).reply(200, fakeServerReplay);

      await store.dispatch(loginAction(fakeUser));
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        loginAction.pending.type,
        loginAction.fulfilled.type,
      ]);
    });

    it('should call "saveToken" once with the received token', async () => {
      const fakeUser: AuthData = { login: 'test@test.ru', password: '123456' };
      const fakeServerReplay = { token: 'secret' };
      mockAxiosAdapter.onPost(APIRoute.Login()).reply(200, fakeServerReplay);
      const mockSaveToken = vi.spyOn(tokenStorage, 'saveToken');

      await store.dispatch(loginAction(fakeUser));

      expect(mockSaveToken).toBeCalledTimes(1);
      expect(mockSaveToken).toBeCalledWith(fakeServerReplay.token);
    });
  });

  describe('logoutAction', () => {
    it('should dispatch "logoutAction.pending", "logoutAction.fulfilled" when server response 204', async () => {
      mockAxiosAdapter.onDelete(APIRoute.Logout()).reply(204);

      await store.dispatch(logoutAction());
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        logoutAction.pending.type,
        logoutAction.fulfilled.type,
      ]);
    });

    it('should one call "dropToken" with "logoutAction"', async () => {
      mockAxiosAdapter.onDelete(APIRoute.Logout()).reply(204);
      const mockDropToken = vi.spyOn(tokenStorage, 'dropToken');

      await store.dispatch(logoutAction());

      expect(mockDropToken).toBeCalledTimes(1);
    });
  });

  describe('fetchFilmAction', () => {
    it('should dispatch "fetchFilmAction.pending", "fetchFilmAction.fulfilled", when server response 200', async () => {
      const film = makeFakeFilm();

      mockAxiosAdapter.onGet(APIRoute.Film(film.id)).reply(200, film);

      await store.dispatch(fetchFilmAction(film.id));

      const emittedActions = store.getActions();
      const extractedActionsTypes = extractActionsTypes(emittedActions);
      const fetchFilmActionFulfilled = emittedActions.at(1) as ReturnType<
        typeof fetchFilmAction.fulfilled
      >;

      expect(extractedActionsTypes).toEqual([
        fetchFilmAction.pending.type,
        fetchFilmAction.fulfilled.type,
      ]);

      expect(fetchFilmActionFulfilled.payload).toEqual(film);
    });

    it('should dispatch "fetchFilmAction.pending", "fetchFilmAction.rejected" when server response 400', async () => {
      mockAxiosAdapter.onGet(APIRoute.Film('unknown')).reply(400, []);

      await store.dispatch(fetchFilmAction('unknown'));
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        fetchFilmAction.pending.type,
        fetchFilmAction.rejected.type,
      ]);
    });
  });

  describe('fetchFilmsAction', () => {
    it('should dispatch "fetchFilmsAction.pending", "fetchFilmsAction.fulfilled", when server response 200', async () => {
      const films = makeFakeFilms();
      mockAxiosAdapter.onGet(APIRoute.Films()).reply(200, films);

      await store.dispatch(fetchFilmsAction());

      const emittedActions = store.getActions();
      const extractedActionsTypes = extractActionsTypes(emittedActions);
      const fetchFilmsActionFulfilled = emittedActions.at(1) as ReturnType<
        typeof fetchFilmsAction.fulfilled
      >;

      expect(extractedActionsTypes).toEqual([
        fetchFilmsAction.pending.type,
        fetchFilmsAction.fulfilled.type,
      ]);

      expect(fetchFilmsActionFulfilled.payload).toEqual(films);
    });

    it('should dispatch "fetchFilmsAction.pending", "fetchFilmsAction.rejected" when server response 400', async () => {
      mockAxiosAdapter.onGet(APIRoute.Films()).reply(400, []);

      await store.dispatch(fetchFilmsAction());
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        fetchFilmsAction.pending.type,
        fetchFilmsAction.rejected.type,
      ]);
    });
  });

  describe('fetchPromoFilmAction', () => {
    it('should dispatch "fetchPromoFilmAction.pending", "fetchPromoFilmAction.fulfilled", when server response 200', async () => {
      const promoFilm = makeFakePromoFilm();
      mockAxiosAdapter.onGet(APIRoute.Promo()).reply(200, promoFilm);

      await store.dispatch(fetchPromoFilmAction());

      const emittedActions = store.getActions();
      const extractedActionsTypes = extractActionsTypes(emittedActions);
      const fetchPromoFilmActionFulfilled = emittedActions.at(1) as ReturnType<
        typeof fetchPromoFilmAction.fulfilled
      >;

      expect(extractedActionsTypes).toEqual([
        fetchPromoFilmAction.pending.type,
        fetchPromoFilmAction.fulfilled.type,
      ]);

      expect(fetchPromoFilmActionFulfilled.payload).toEqual(promoFilm);
    });

    it('should dispatch "fetchPromoFilmAction.pending", "fetchPromoFilmAction.rejected" when server response 400', async () => {
      mockAxiosAdapter.onGet(APIRoute.Promo()).reply(400, []);

      await store.dispatch(fetchPromoFilmAction());
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        fetchPromoFilmAction.pending.type,
        fetchPromoFilmAction.rejected.type,
      ]);
    });
  });

  describe('sendCommentAction', () => {
    it('should dispatch "sendCommentAction.pending", "sendCommentAction.fulfilled", when server response 200', async () => {
      const [comment] = makeFakeComments();
      mockAxiosAdapter
        .onPost(APIRoute.Comments(comment.id), {
          comment: comment.comment,
          rating: comment.rating,
        })
        .reply(200, comment);

      await store.dispatch(
        sendCommentAction({
          id: comment.id,
          comment: comment.comment,
          rating: comment.rating,
        })
      );

      const emittedActions = store.getActions();
      const extractedActionsTypes = extractActionsTypes(emittedActions);
      const sendCommentActionFulfilled = emittedActions.at(1) as ReturnType<
        typeof sendCommentAction.fulfilled
      >;

      expect(extractedActionsTypes).toEqual([
        sendCommentAction.pending.type,
        sendCommentAction.fulfilled.type,
      ]);

      expect(sendCommentActionFulfilled.payload).toEqual(comment);
    });

    it('should dispatch "sendCommentAction.pending", "sendCommentAction.rejected" when server response 400', async () => {
      mockAxiosAdapter.onGet(APIRoute.Promo()).reply(400, []);
      const comment = { id: 'unknow', comment: '', rating: 0 };
      await store.dispatch(sendCommentAction(comment));
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        sendCommentAction.pending.type,
        sendCommentAction.rejected.type,
      ]);
    });
  });

  describe('fetchUserListAction', () => {
    it('should dispatch "fetchUserListAction.pending", "fetchUserListAction.fulfilled", when server response 200', async () => {
      const userFilms = makeFakeUserFilms()[0];
      mockAxiosAdapter.onGet(APIRoute.Favorite()).reply(200, userFilms);

      await store.dispatch(fetchUserListAction());

      const emittedActions = store.getActions();
      const extractedActionsTypes = extractActionsTypes(emittedActions);
      const fetchUserListActionFulfilled = emittedActions.at(1) as ReturnType<
        typeof fetchUserListAction.fulfilled
      >;

      expect(extractedActionsTypes).toEqual([
        fetchUserListAction.pending.type,
        fetchUserListAction.fulfilled.type,
      ]);

      expect(fetchUserListActionFulfilled.payload).toEqual(userFilms);
    });

    it('should dispatch "fetchUserListAction.pending", "fetchUserListAction.rejected" when server response 400', async () => {
      mockAxiosAdapter.onGet(APIRoute.Favorite()).reply(400, []);
      await store.dispatch(fetchUserListAction());
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        fetchUserListAction.pending.type,
        fetchUserListAction.rejected.type,
      ]);
    });
  });

  describe('addFilmInFavorite', () => {
    it('should dispatch "addFilmInFavorite.pending", "addFilmInFavorite.fulfilled", when server response 200', async () => {
      const film = makeFakeFilm();
      mockAxiosAdapter
        .onPost(APIRoute.AddInFavorite(film.id, '1'))
        .reply(200, { ...film, isFavorite: '1' });

      await store.dispatch(
        addFilmInFavorite({ filmId: film.id, status: true })
      );
      const emittedActions = store.getActions();
      const extractedActionsTypes = extractActionsTypes(emittedActions);
      const setFilmStatusFulfilled = emittedActions.at(1) as ReturnType<
        typeof addFilmInFavorite.fulfilled
      >;

      expect(extractedActionsTypes).toEqual([
        addFilmInFavorite.pending.type,
        addFilmInFavorite.fulfilled.type,
      ]);

      expect(setFilmStatusFulfilled.payload).toEqual({
        ...film,
        isFavorite: '1',
      });
    });

    it('should dispatch "addFilmInFavorite.pending", "addFilmInFavorite.rejected" when server response 400', async () => {
      mockAxiosAdapter.onGet(APIRoute.Favorite()).reply(400, []);
      await store.dispatch(
        addFilmInFavorite({ filmId: 'unknow', status: true })
      );
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        addFilmInFavorite.pending.type,
        addFilmInFavorite.rejected.type,
      ]);
    });
  });
});
