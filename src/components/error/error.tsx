import { useAppDispatch } from '../../hooks';
import {
  fetchCommentsAction,
  fetchFilmAction,
  fetchFilmsAction,
  fetchPromoFilmAction,
  fetchSimilarFilmsAction,
  fetchUserListAction,
} from '../../store/api-actions';
type ErrorProps = {
  id?: string;
};
function Error({ id }: ErrorProps): JSX.Element {
  const dispatch = useAppDispatch();
  return (
    <>
      <p className="error__text">Failed to load movie</p>
      <button
        onClick={() => {
          if (id) {
            dispatch(fetchCommentsAction(id));
            dispatch(fetchFilmAction(id));
            dispatch(fetchSimilarFilmsAction(id));
          }
          dispatch(fetchFilmsAction());
          dispatch(fetchPromoFilmAction());
          dispatch(fetchUserListAction());
        }}
        className="replay replay--error"
        type="button"
      >
        Retry
      </button>
    </>
  );
}

export default Error;
