import { render, screen } from '@testing-library/react';
import ExitButton from './exit-button';
import { expect } from 'vitest';
import { withHistory, withStore } from '../../utils/mock-component';
import { makeFakeStore } from '../../utils/mocks';
describe('Component: ExitButton', () => {
  it('should render correct', () => {
    const withHistoryComponent = withHistory(<ExitButton />);
    const { withStoreComponent } = withStore(
      withHistoryComponent,
      makeFakeStore()
    );
    render(withStoreComponent);
    expect(screen.getByText('Exit')).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeInTheDocument();
    expect(screen.getByRole('button')).toHaveClass('player__exit');
  });
});
