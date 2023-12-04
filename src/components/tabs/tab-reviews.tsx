import type { FilmType } from '../../types/films.ts';
import type { Comment } from '../../types/reviews.ts';
import { ReviewCard } from '../review-card/review-card.tsx';

type TabReviewsProps = {
  film: FilmType;
  comments:Comment[];
};

export function TabReviews({ film, comments }: TabReviewsProps): JSX.Element {
  const rewievsCount = comments.length;
  return (
    <div className="film-card__reviews film-card__row">
      <div className="film-card__reviews-col">
        {comments.slice(0, Math.trunc((rewievsCount + 1) / 2)).map((comment) => (
          <ReviewCard key={film.id} rewiev={comment} />
        ))}
      </div>
      <div className="film-card__reviews-col">
        {comments
          .slice(Math.trunc((rewievsCount + 1) / 2), rewievsCount)
          .map((comment) => (
            <ReviewCard key={film.id} rewiev={comment} />
          ))}
      </div>
    </div>
  );
}
