import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';

export function UserBlockNoAuth(): JSX.Element {
  return (
    <ul className="user-block" data-testid="user-block-no-auth">
      <li className="user-block__item">
        <Link to={AppRoute.Login} className="user-block__link">
          Sign in
        </Link>
      </li>
    </ul>
  );
}

export default UserBlockNoAuth;
