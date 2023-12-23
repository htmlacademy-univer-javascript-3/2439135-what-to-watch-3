import { Link } from 'react-router-dom';

export function Logo(): JSX.Element {
  return (
    <div className="logo" data-testid="logo">
      <Link to="/" className="logo__link">
        {['W', 'T', 'W'].map((ch, index) =>
          (
            <span className={`logo__letter logo__letter--${index + 1}`} data-testid="letter" key={`${ch}`}>{ch} </span>
          ))}

      </Link>
    </div>
  );
}
export default Logo;
