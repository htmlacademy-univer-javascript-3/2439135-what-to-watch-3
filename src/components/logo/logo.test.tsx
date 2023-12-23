import { render, screen } from '@testing-library/react';
import Logo from './logo';
import { withHistory } from '../../utils/mock-component';

describe('Component: Logo', () => {
  it('should render correct', () => {
    const preparedComponent = withHistory(<Logo />);
    render(preparedComponent);
    expect(screen.getByTestId('logo')).toBeInTheDocument();
    expect(screen.getAllByTestId('letter').length).toEqual(3);
  });
});
