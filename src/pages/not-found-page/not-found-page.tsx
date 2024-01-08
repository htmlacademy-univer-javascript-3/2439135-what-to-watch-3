import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import './not-found-page.css';
export function NotFoundPage(): JSX.Element {
  return (
    <section>
      <Helmet>
        <title>What to watch. Not found page</title>
      </Helmet>
      <div className="not-found">
        <h1>404. Page not found</h1>
        <Link to="/">Вернуться на главную</Link>
      </div>
    </section>
  );
}
export default NotFoundPage;
