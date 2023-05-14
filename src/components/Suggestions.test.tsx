import { render, screen, fireEvent } from '@testing-library/react';
import Suggestions from '@/src/components/Suggestions';
import { mockSearchOptions } from '@/mocks/mockData';

describe('Suggestions', () => {
    it('renders a list of suggestions', () => {
        render(<Suggestions searchOptions={mockSearchOptions} setCity={jest.fn()} />);
        const suggestionList = screen.getAllByRole('listitem');
        expect(suggestionList.length).toBe(mockSearchOptions.length);

        mockSearchOptions.forEach((option, index) => {
            const buttonText = `${option.name}, ${option.country}`;
            expect(screen.getByText(buttonText)).toBeInTheDocument();
            expect(suggestionList[index]).toHaveTextContent(buttonText);
        });
    });

    it('renders no suggestions when search options are empty', () => {
        render(<Suggestions searchOptions={null} setCity={jest.fn()} />);
        const suggestionList = screen.queryAllByRole('listitem');
        expect(suggestionList.length).toBe(0);
    });

    it('calls setCity with the correct search option when a button is clicked', () => {
        const setCityMock = jest.fn();
        render(<Suggestions searchOptions={mockSearchOptions} setCity={setCityMock} />);

        const suggestionButtons = screen.getAllByRole('button');
        fireEvent.click(suggestionButtons[0]);

        expect(setCityMock).toHaveBeenCalledTimes(1);
        expect(setCityMock).toHaveBeenCalledWith(mockSearchOptions[0]);
    });
});
