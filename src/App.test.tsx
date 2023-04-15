import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
    render(<App />);
    const button = screen.getByRole('button').textContent;
    expect(button).toBe('Search');
});
