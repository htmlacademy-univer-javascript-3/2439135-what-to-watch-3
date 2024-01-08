import { FadeLoader } from 'react-spinners';
import './spinner.css';

export function Spinner(): JSX.Element {
  return (
    <div className="spinner">
      <FadeLoader color="#DFCF77" data-testid="fade-loader" />
    </div>
  );
}
export default Spinner;
