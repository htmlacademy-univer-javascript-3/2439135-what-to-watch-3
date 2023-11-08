import type { Film } from '../../types/films.ts';
import { ReviewCard } from '../../components/review/review.tsx';

type TabReviewsProps = {
  film: Film;
};

export function TabReviews({ film }: TabReviewsProps): JSX.Element {
  const rewievsCount = film.rewievs.length;
  return (
    <div className="film-card__reviews film-card__row">
      <div className="film-card__reviews-col">
        {film.rewievs.slice(0, Math.trunc(rewievsCount / 2)).map((review) => (
          <ReviewCard key={film.id} rewiev={review} />
        ))}
      </div>
      <div className="film-card__reviews-col">
        {film.rewievs
          .slice(Math.trunc(rewievsCount / 2), rewievsCount)
          .map((review) => (
            <ReviewCard key={film.id} rewiev={review} />
          ))}
      </div>
    </div>
  );
}
