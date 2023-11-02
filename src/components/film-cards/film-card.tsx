import type { Film } from '../../types/films.ts';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { VideoPlayer } from '../../components/video-player/video-player.tsx';
import { FilmImage, timeoutVideo } from '../../const';
import { GetSrcFilmImage } from '../../functions/functions.ts';

type FilmCardProps = {
  film: Film;
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
      className="small-film-card__link small-film-card catalog__films-card"
      to={`/films/${film.id}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <VideoPlayer
        src={film.trailer}
        poster={GetSrcFilmImage(film.title, FilmImage.SmallCard)}
        muted
        isPlaying={isPlaying}
      />
      {!isPlaying && <h3 className="small-film-card__title">{film.title}</h3>}
    </Link>
  );
}
