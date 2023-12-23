import { render, screen } from '@testing-library/react';
//import ExitButton from './exit-button';
import PlayButton from './play-button';
describe('Component: PlayButton', () => {
  it('should render correct', () => {
    const playButtonProps = {
      onClickHandler: () => undefined,
      isPlaying: true,
    };
    render(<PlayButton {...playButtonProps} />);
    expect(screen.getByText('Play')).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeInTheDocument();
  });
});
