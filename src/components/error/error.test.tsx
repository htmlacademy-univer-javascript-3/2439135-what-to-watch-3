import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Error from './error';
import { withStore } from '../../utils/mock-component';
import {
  fetchFilmsAction,
  fetchPromoFilmAction,
  fetchUserListAction,
} from '../../store/api-actions';
import { extractActionsTypes } from '../../utils/mocks';
import { APIRoute } from '../../const';

describe('Component: Error', () => {
  it('should render correctly', () => {
    const firstExpectedText = 'Failed to load movie';
    const { withStoreComponent } = withStore(<Error />, {});

    render(withStoreComponent);

    expect(screen.getByText(firstExpectedText)).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('should dispatch fetchActions when user clicked retry button', async () => {
    const { withStoreComponent, mockStore, mockAxiosAdapter } = withStore(
      <Error />,
      {}
    );
    mockAxiosAdapter.onGet(APIRoute.Films()).reply(200, []);
    mockAxiosAdapter.onGet(APIRoute.Promo()).reply(200, []);
    mockAxiosAdapter.onGet(APIRoute.MyList()).reply(200, []);

    render(withStoreComponent);
    await userEvent.click(screen.getByRole('button'));
    const actions = extractActionsTypes(mockStore.getActions());

    expect(actions).toEqual([
      fetchFilmsAction.pending.type,
      fetchPromoFilmAction.pending.type,
      fetchUserListAction.pending.type,
      fetchFilmsAction.fulfilled.type,
      fetchPromoFilmAction.fulfilled.type,
      fetchUserListAction.rejected.type,
    ]);
  });
});
