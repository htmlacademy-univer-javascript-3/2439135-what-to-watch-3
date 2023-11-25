import type { FilmType } from '../../types/films.ts';
import type { Comment } from '../../types/reviews.ts';
import { ReviewCard } from '../../components/review/review.tsx';

type TabReviewsProps = {
  film: FilmType;
  // comments: Comment[];
};

export function TabReviews({ film }: TabReviewsProps): JSX.Element {
  const comments: Comment[] = [];
  const rewievsCount = comments.length;
  return (
    <div className="film-card__reviews film-card__row">
      <div className="film-card__reviews-col">
        {comments.slice(0, Math.trunc(rewievsCount / 2)).map((review) => (
          <ReviewCard key={film.id} rewiev={review} />
        ))}
      </div>
      <div className="film-card__reviews-col">
        {comments
          .slice(Math.trunc(rewievsCount / 2), rewievsCount)
          .map((review) => (
            <ReviewCard key={film.id} rewiev={review} />
          ))}
      </div>
    </div>
  );
}
