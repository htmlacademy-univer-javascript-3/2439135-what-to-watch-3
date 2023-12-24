import { fireEvent, render, screen } from '@testing-library/react';
import VideoPlayer from './video-player';
import { image } from 'faker';

describe('Component: VideoPlayer', () => {
  it('should render correctly', () => {
    render(
      <VideoPlayer
        src={image.imageUrl()}
        poster={image.imageUrl()}
        isPlaying
        muted={false}
      />
    );

    expect(screen.getByTestId('video-player')).toBeInTheDocument();
  });

  it('should data loaded', () => {
    render(
      <VideoPlayer
        src={image.imageUrl()}
        poster={image.imageUrl()}
        isPlaying
        muted={false}
      />
    );
    fireEvent(screen.getByTestId('video-player'), new Event('loadeddata'));
  });
});
