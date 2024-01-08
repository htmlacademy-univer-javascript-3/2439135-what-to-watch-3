import type { Comment } from '../../types/reviews.ts';
type RewievProps = {
  review: Comment;
};

export function ReviewCard({ review }: RewievProps): JSX.Element {
  const d = new Date(review.date);
  const locale = 'en-us';
  const date = `${d.toLocaleString(locale, {
    month: 'long',
  })} ${d.getDate()}, ${d.getFullYear()}`;

  return (
    <div className="review" data-testid="review">
      <blockquote className="review__quote">
        <p className="review__text">{review.comment}</p>
        <footer className="review__details">
          <cite className="review__author">{review.user}</cite>
          <time className="review__date" dateTime={date}>
            {date}
          </time>
        </footer>
      </blockquote>
      <div className="review__rating">{review.rating}</div>
    </div>
  );
}
export default ReviewCard;
