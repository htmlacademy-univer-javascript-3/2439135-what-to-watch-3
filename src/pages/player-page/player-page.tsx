import { useEffect, useState, useRef, ChangeEvent } from 'react';
import { useParams } from 'react-router';
import { useAppSelector, useAppDispatch } from '../../hooks/index.ts';
import { getFilm } from '../../store/film-data/selectors.ts';
import { fetchFilmAction } from '../../store/api-actions.ts';
import { PlayButton } from '../../components/player-button/play-button.tsx';
import { ExitButton } from '../../components/player-button/exit-button.tsx';
import { Helmet } from 'react-helmet-async';
function PlayerPage(): JSX.Element {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const film = useAppSelector(getFilm);
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [playingProgress, setPlayingProgress] = useState(0);
  const progressRef = useRef(null);
  useEffect(() => {
    if (id) {
      dispatch(fetchFilmAction(id));
    }
  }, [dispatch, id]);

  const handleUpdateProgress = (evt: ChangeEvent<HTMLVideoElement>) => {
    const time = Math.round(
      evt.currentTarget.duration - evt.currentTarget.currentTime
    );
    if (time !== undefined) {
      setCurrentTime(time);
      setPlayingProgress(
        (evt.currentTarget?.currentTime * 100) / evt.currentTarget?.duration
      );
      if (evt.currentTarget?.ended) {
        setIsPlaying(false);
        videoRef.current?.pause();
      }
    }
  };

  useEffect(() => {
    const playerElement = videoRef.current;
    if (!playerElement) {
      return;
    }
    if (!isPlaying) {
      playerElement.pause();
      return;
    }
    playerElement.play();
  }, [isPlaying]);

  const formatTime = () => {
    const padStart = (time: number) => `${Math.floor(time)}`.padStart(2, '0');
    const hours = padStart(currentTime / 360);
    const minutes = padStart(
      currentTime / 60 - Number.parseInt(hours, 10) * 60
    );
    const seconds = padStart(currentTime % 60);
    const minuteSection = `-${minutes}:${seconds}`;
    const hourSection = `-${hours}:${minutes}:${seconds}`;
    if (hours === '00') {
      return minuteSection;
    }
    return hourSection;
  };
  const playHandler = () => {
    if (videoRef.current) {
      setIsPlaying(!isPlaying);
    }
  };

  useEffect(() => {
    if (id) {
      dispatch(fetchFilmAction(id));
    }
  }, [dispatch, id]);

  return (
    <div className="player">
      <Helmet>
        <title>{`What to watch. Movie: ${film?.name || ''}`}</title>
      </Helmet>
      <video
        data-testid="video"
        src={film?.videoLink}
        className="player__video"
        poster={film?.backgroundImage}
        ref={videoRef}
        muted={false}
        onTimeUpdate={handleUpdateProgress}
      >
      </video>

      <ExitButton />

      <div className="player__controls">
        <div className="player__controls-row">
          <div className="player__time">
            <progress
              className="player__progress"
              value={videoRef.current?.currentTime}
              max={videoRef.current?.duration}
              ref={progressRef}
            >
            </progress>
            <div
              className="player__toggler"
              style={{ left: `${playingProgress}%` }}
            >
              Toggler
            </div>
          </div>
          <div className="player__time-value">{formatTime()}</div>
        </div>

        <div className="player__controls-row">
          <PlayButton onClickHandler={playHandler} isPlaying={isPlaying} />
          <div className="player__name">Transpotting</div>

          <button
            type="button"
            className="player__full-screen"
            onClick={() => {
              videoRef.current?.requestFullscreen();
            }}
          >
            <svg viewBox="0 0 27 27" width="27" height="27">
              <use href="#full-screen"></use>
            </svg>
            <span>Full screen</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default PlayerPage;
