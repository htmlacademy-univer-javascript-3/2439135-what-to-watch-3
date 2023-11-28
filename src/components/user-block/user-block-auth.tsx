import { AppRoute } from '../../const';
import { useAppDispatch } from '../../hooks';
import { requireAuthorization } from '../../store/action.ts';
import { AuthorizationStatus } from '../../const.ts';
import { useNavigate } from 'react-router-dom';

export function UserBlockAuth(): JSX.Element {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const onClickHadler = () => {
    dispatch(requireAuthorization(AuthorizationStatus.Unknown));
    navigate(AppRoute.Main);
  };
  return (
    <ul className="user-block">
      <li className="user-block__item">
        <div className="user-block__avatar">
          <img src="img/avatar.jpg" alt="User avatar" width="63" height="63" />
        </div>
      </li>
      <li className="user-block__item">
        <div className="user-block__link" onClick={onClickHadler}>
          Sign out
        </div>
      </li>
    </ul>
  );
}

export default UserBlockAuth;
