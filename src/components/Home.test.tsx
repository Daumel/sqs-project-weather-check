import { render, screen } from '@testing-library/react';
import Home from './Home';

test('renders Home component without forecast', () => {
    render(<Home />);
    const button = screen.getByRole('button').textContent;
    expect(button).toBe('Search');
});
