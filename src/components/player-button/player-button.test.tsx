import { render, screen } from '@testing-library/react';
import PlayButton from './play-button';

describe('Component: PlayButton', () => {
  it('should render correct', () => {
    const playButtonProps = {
      onClickHandler: () => vi.fn(),
      isPlaying: true,
    };
    render(<PlayButton {...playButtonProps} />);
    expect(screen.getByText('Play')).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeInTheDocument();
    expect(screen.getByRole('button')).not.toBeDisabled();
  });
});
