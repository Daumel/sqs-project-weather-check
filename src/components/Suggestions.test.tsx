import { render, screen, fireEvent } from '@testing-library/react';
import Suggestions from '@/src/components/Suggestions';
import { mockSearchOptions } from '@/mocks/mockData';

describe('Suggestions', () => {
    it('renders a list of suggestions', () => {
        render(<Suggestions searchOptions={mockSearchOptions} setCity={jest.fn()} />);
        const suggestions = screen.getAllByRole('listitem');
        expect(suggestions.length).toBe(mockSearchOptions.length);

        mockSearchOptions.forEach((option, index) => {
            const text = `${option.name}, ${option.country}`;
            expect(screen.getByText(text)).toBeInTheDocument();
            expect(suggestions[index]).toHaveTextContent(text);
        });
    });

    it('renders no suggestions when searchOptions is null', () => {
        render(<Suggestions searchOptions={null} setCity={jest.fn()} />);
        const suggestions = screen.queryAllByRole('listitem');
        expect(suggestions.length).toBe(0);
    });

    it('calls setCity with the correct searchOption when a button is clicked', () => {
        const setCity = jest.fn();
        render(<Suggestions searchOptions={mockSearchOptions} setCity={setCity} />);

        const buttons = screen.getAllByRole('button');
        fireEvent.click(buttons[0]);

        expect(setCity).toHaveBeenCalledTimes(1);
        expect(setCity).toHaveBeenCalledWith(mockSearchOptions[0]);
    });
});
