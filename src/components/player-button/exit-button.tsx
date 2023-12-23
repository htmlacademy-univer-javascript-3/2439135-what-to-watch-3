import { useNavigate } from 'react-router';
import { AppRoute } from '../../const.ts';
export function ExitButton(): JSX.Element {
  const navigate = useNavigate();
  return (
    <button
      type="button"
      className="player__exit"
      onClick={() => navigate(AppRoute.Main)}
    >
      Exit
    </button>
  );
}
export default ExitButton;
