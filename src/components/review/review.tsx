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
          <time className="review__date" dateTime="2015-11-18">
            {rewiev.date}
          </time>
        </footer>
      </blockquote>

      <div className="review__rating">{rewiev.rating}</div>
    </div>
  );
}
