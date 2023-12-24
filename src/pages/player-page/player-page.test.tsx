import PlayerPage from './player-page';
import { withHistory, withStore } from '../../utils/mock-component';
import { makeFakeStore } from '../../utils/mocks';
import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
describe('Component: PlayerPage', () => {
  it('should play button enable when data loaded', async () => {
    HTMLMediaElement.prototype.play = vi.fn();

    const withHistoryComponent = withHistory(<PlayerPage />);
    const store = makeFakeStore();

    const { withStoreComponent } = withStore(withHistoryComponent, store);
    render(withStoreComponent);
    fireEvent(screen.getByTestId('video'), new Event('loadeddata'));
    await userEvent.click(screen.getByTestId('player__play'));

    expect(screen.getByTestId('player__play')).not.toBeDisabled();
  });
});
