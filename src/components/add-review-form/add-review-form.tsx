import { ChangeEvent, FormEvent, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/index';
import { sendCommentAction } from '../../store/api-actions';
import { NotFoundPage } from '../../pages/not-found-page/not-found-page';
import { getFilm } from '../../store/film-data/selectors.ts';

export function AddReviewForm(): JSX.Element {
  const [userRayting, setUserRayting] = useState(0);
  const commentRef = useRef<HTMLTextAreaElement>(null);
  const navigate = useNavigate();
  const film = useAppSelector(getFilm);
  const dispatch = useAppDispatch();

  if (!film) {
    return <NotFoundPage />;
  }
  const onChangeHandler = (evt: ChangeEvent<HTMLInputElement>) => {
    setUserRayting(Number(evt.target.value));
  };

  const onSubmitHandler = (rating: number, comment: string) => {
    dispatch(sendCommentAction({ comment:comment, rating:rating, id: film.id }));
    navigate(`/films/${film.id}`);
  };

  return (
    <form data-testid="form"
      action="#"
      className="add-review__form"
      onSubmit={(evt: FormEvent<HTMLFormElement>) => {
        evt.preventDefault();
        if (userRayting && commentRef.current?.value) {
          onSubmitHandler(userRayting, commentRef.current.value);
        }
      }}
    >
      <div className="rating">
        <div className="rating__stars">
          {[10, 9, 8, 7, 6, 5, 4, 3, 2, 1].map((num) => (
            <>
              <input data-testid="star"
                className="rating__input"
                id={`star-${num}`}
                type="radio"
                name="rating"
                value={`${num}`}
                onChange={onChangeHandler}
              />
              <label className="rating__label" htmlFor={`star-${num}`}>
                Rating {num}
              </label>
            </>
          ))}
        </div>
      </div>

      <div className="add-review__text">
        <textarea data-testid="comment"
          ref={commentRef}
          className="add-review__textarea"
          name="review-text"
          id="review-text"
          placeholder="Review text"
        >
        </textarea>
        <div className="add-review__submit">
          <button
            className="add-review__btn"
            type="submit"
            disabled={!userRayting || !commentRef.current?.value}
          >
            Post
          </button>
        </div>
      </div>
    </form>
  );
}
export default AddReviewForm;
