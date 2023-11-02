import type { Film } from '../../types/films.ts';
import { ReviewCard } from '../../components/review/review.tsx';

type TabReviewsProps = {
  film: Film;
};

export function TabReviews({ film }: TabReviewsProps): JSX.Element {
  return (
    <div className="film-card__reviews film-card__row">
      <div className="film-card__reviews-col">
        {film.rewievs.map((review) => (
          <ReviewCard key={film.id} rewiev={review} />
        ))}
      </div>
    </div>
  );
}
