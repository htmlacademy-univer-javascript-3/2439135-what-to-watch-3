import type { FilmCardType, FilmType } from '../../types/films.ts';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { VideoPlayer } from '../../components/video-player/video-player.tsx';
import { timeoutVideo } from '../../const';

type FilmCardProps = {
  film: FilmType | FilmCardType;
};

export function FilmCard({ film }: FilmCardProps): JSX.Element {
  const [needPlayVideo, setNeedPlayVideo] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  useEffect(() => {
    let isMouseLeave = false;
    if (needPlayVideo) {
      setTimeout(() => {
        if (!isMouseLeave) {
          setIsPlaying(true);
        }
      }, timeoutVideo);
    }
    return () => {
      isMouseLeave = true;
    };
  }, [needPlayVideo]);

  const handleMouseEnter = () => {
    setNeedPlayVideo(true);
  };
  const handleMouseLeave = () => {
    setNeedPlayVideo(false);
    setIsPlaying(false);
  };
  return (
    <Link
      data-testid="film-card"
      className="small-film-card__link small-film-card catalog__films-card"
      to={`/films/${film.id}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <VideoPlayer
        src={film.previewVideoLink}
        poster={film.previewImage}
        muted
        isPlaying={isPlaying}
      />
      {!isPlaying && <h3 className="small-film-card__title">{film.name}</h3>}
    </Link>
  );
}
