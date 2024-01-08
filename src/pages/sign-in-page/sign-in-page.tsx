import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';
import { useRef, FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { loginAction } from '../../store/api-actions';
import { AuthorizationStatus } from '../../const';
import { getAuthorizationStatus } from '../../store/user-process/selectors';
import { Helmet } from 'react-helmet-async';
function SignInPage(): JSX.Element {
  const [isError, setIsError] = useState(false);
  const [isExist, setIsExist] = useState(false);
  const loginRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    if (loginRef.current !== null && passwordRef.current !== null) {
      if (
        passwordRef.current.value.search(/\d/) !== -1 &&
        !/^\d+$/.test(passwordRef.current.value)
      ) {
        setIsError(false);
        setIsExist(false);
        dispatch(
          loginAction({
            login: loginRef.current.value,
            password: passwordRef.current.value,
          })
        );

        if (authorizationStatus === AuthorizationStatus.Auth) {
          navigate(AppRoute.Main);
        } else {
          setIsExist(true);
        }
      } else {
        setIsError(true);
        setIsExist(false);
      }
    }
  };

  return (
    <div className="user-page">
      <Helmet>
        <title>What to watch. Sign in</title>
      </Helmet>
      <header className="page-header user-page__head">
        <div className="logo">
          <Link to={AppRoute.Main} className="logo__link">
            <span className="logo__letter logo__letter--1">W</span>
            <span className="logo__letter logo__letter--2">T</span>
            <span className="logo__letter logo__letter--3">W</span>
          </Link>
        </div>

        <h1 className="page-title user-page__title">Sign in</h1>
      </header>

      <div className="sign-in user-page__content">
        <form action="#" className="sign-in__form" onSubmit={handleSubmit}>
          {isExist && (
            <div className="sign-in__message">
              <p>
                We can’t recognize this email <br /> and password combination.
                Please try again.
              </p>
            </div>
          )}
          {isError && (
            <div className="sign-in__message">
              <p>Please enter a valid password</p>
            </div>
          )}
          <div className="sign-in__fields">
            <div className="sign-in__field">
              <input
                minLength={1}
                data-testid="loginElement"
                ref={loginRef}
                className="sign-in__input"
                placeholder="Email address"
                type="email"
                name="user-email"
                id="user-email"
                required
              />
              <label
                className="sign-in__label visually-hidden"
                htmlFor="user-email"
              >
                Email address
              </label>
            </div>
            <div className="sign-in__field">
              <input
                minLength={2}
                data-testid="passwordElement"
                ref={passwordRef}
                className="sign-in__input"
                placeholder="Password"
                type="password"
                name="user-password"
                id="user-password"
                required
              />
              <label
                className="sign-in__label visually-hidden"
                htmlFor="user-password"
              >
                Password
              </label>
            </div>
          </div>
          <div className="sign-in__submit">
            <button className="sign-in__btn" type="submit">
              Sign in
            </button>
          </div>
        </form>
      </div>

      <footer className="page-footer">
        <div className="logo">
          <Link to={AppRoute.Main} className="logo__link logo__link--light">
            <span className="logo__letter logo__letter--1">W</span>
            <span className="logo__letter logo__letter--2">T</span>
            <span className="logo__letter logo__letter--3">W</span>
          </Link>
        </div>

        <div className="copyright">
          <p>© 2019 What to watch Ltd.</p>
        </div>
      </footer>
    </div>
  );
}

export default SignInPage;
