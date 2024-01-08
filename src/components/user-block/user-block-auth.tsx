import { AppRoute } from '../../const';
import { useAppDispatch } from '../../hooks';
import { logoutAction } from '../../store/api-actions.ts';
import { useNavigate } from 'react-router-dom';

export function UserBlockAuth(): JSX.Element {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const signOutClickHadler = () => {
    dispatch(logoutAction());
    navigate(AppRoute.Main);
  };
  const avatarClickHadler = () => {
    navigate(AppRoute.MyList);
  };
  return (
    <ul
      className="user-block"
      data-testid="user-block-auth"
      onClick={avatarClickHadler}
    >
      <li className="user-block__item">
        <div className="user-block__avatar">
          <img src="img/avatar.jpg" alt="User avatar" width="63" height="63" />
        </div>
      </li>
      <li className="user-block__item">
        <div className="user-block__link" onClick={signOutClickHadler}>
          Sign out
        </div>
      </li>
    </ul>
  );
}

export default UserBlockAuth;
