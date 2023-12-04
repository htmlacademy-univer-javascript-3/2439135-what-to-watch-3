import type { Comment } from '../../types/reviews.ts';
type RewievProps = {
  rewiev: Comment;
};

export function ReviewCard({ rewiev }: RewievProps): JSX.Element {
  return (
    <div className="review">
      <blockquote className="review__quote">
        <p className="review__text">{rewiev.comment}</p>

        <footer className="review__details">
          <cite className="review__author">{rewiev.user}</cite>
          <time className="review__date" dateTime={rewiev.date.split('T')[0]}>
            {rewiev.date.split('T')[0]}
          </time>
        </footer>
      </blockquote>

      <div className="review__rating">{rewiev.rating}</div>
    </div>
  );
}
