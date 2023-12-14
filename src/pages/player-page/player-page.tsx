import { useEffect, useState, useRef, ChangeEvent } from 'react';
import { useParams, useNavigate } from 'react-router';
import { useAppSelector, useAppDispatch } from '../../hooks/index.ts';
import { getFilm } from '../../store/film-data/selectors.ts';
import { fetchFilmAction } from '../../store/api-actions.ts';
import { AppRoute } from '../../const.ts';

function PlayerPage(): JSX.Element {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const film = useAppSelector(getFilm);
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [currentTime, setCurrentTime] = useState(0);
  const navigate = useNavigate();
  const [duration, setDuration] = useState(0);
  useEffect(() => {
    const playerElement = videoRef.current;
    if (!playerElement) {
      return;
    }
    if (!isPlaying) {
      playerElement.load();
      playerElement.pause();
      return;
    }
    playerElement.play();
  }, [isPlaying]);

  useEffect(() => {
    if (id) {
      dispatch(fetchFilmAction(id));
    }
  }, [dispatch, id]);
  const timeLeft = duration - currentTime;
  const handleUpdateProgress = (evt: ChangeEvent<HTMLVideoElement>) => {
    const time = Math.round(evt.currentTarget.currentTime);
    setCurrentTime(time);
  };
  const handleDurationChange = (evt: ChangeEvent<HTMLVideoElement>) => {
    const currentDuration = Math.round(evt.currentTarget.duration);
    setDuration(currentDuration);
  };
  return (
    <div className="player">
      <video
        src={film?.videoLink}
        className="player__video"
        poster={film?.backgroundImage}
        ref={videoRef}
        muted={false}
        onDurationChange={handleDurationChange}
        onTimeUpdate={handleUpdateProgress}
      >
      </video>

      <button
        type="button"
        className="player__exit"
        onClick={() => navigate(AppRoute.Main)}
      >
        Exit
      </button>

      <div className="player__controls">
        <div className="player__controls-row">
          <div className="player__time">
            <progress
              className="player__progress"
              value={videoRef.current?.currentTime}
              max={videoRef.current?.duration}
            >
            </progress>
            <div className="player__toggler" style={{ left: '30%' }}>
              Toggler
            </div>
          </div>
          <div className="player__time-value">{timeLeft}</div>
        </div>

        <div className="player__controls-row">
          <button
            type="button"
            className="player__play"
            onClick={() =>
              setIsPlaying ? setIsPlaying(!isPlaying) : undefined}
          >
            <svg viewBox="0 0 19 19" width="19" height="19">
              <use href="#play-s"></use>
            </svg>
            <span>Play</span>
          </button>
          <div className="player__name">Transpotting</div>

          <button
            type="button"
            className="player__full-screen"

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
