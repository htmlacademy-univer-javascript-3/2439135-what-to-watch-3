import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';

export function NotFoundPage(): JSX.Element {
  return (
    <section className="game">
      <Helmet>
        <title>Страница не найдена</title>
      </Helmet>
      <h1>404. Page not found</h1>
      <Link to="/">Вернуться на главную</Link>
    </section>
  );
}
export default NotFoundPage;
