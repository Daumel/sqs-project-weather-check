import { render, screen, fireEvent } from '@testing-library/react';
import Suggestions from '@/src/components/Suggestions';
import { mockSearchOptionsForTermBer } from '@/mocks/mockData';

describe('Suggestions', () => {
    it('renders a list of suggestions', () => {
        render(<Suggestions searchOptions={mockSearchOptionsForTermBer} setLocation={jest.fn()} />);
        const suggestionList = screen.getAllByRole('listitem');
        expect(suggestionList.length).toBe(mockSearchOptionsForTermBer.length);

        mockSearchOptionsForTermBer.forEach((option, index) => {
            const buttonText = `${option.name}, ${option.country}`;
            expect(screen.getByText(buttonText)).toBeInTheDocument();
            expect(suggestionList[index]).toHaveTextContent(buttonText);
        });
    });

    it('renders no suggestions when search options are null', () => {
        render(<Suggestions searchOptions={null} setLocation={jest.fn()} />);
        const suggestionList = screen.queryAllByRole('listitem');
        expect(suggestionList.length).toBe(0);
    });

    it('calls setLocation with the correct search option when a button is clicked', () => {
        const setLocationMock = jest.fn();
        render(<Suggestions searchOptions={mockSearchOptionsForTermBer} setLocation={setLocationMock} />);

        const suggestionButtons = screen.getAllByRole('button');
        fireEvent.click(suggestionButtons[0]);

        expect(setLocationMock).toHaveBeenCalledTimes(1);
        expect(setLocationMock).toHaveBeenCalledWith(mockSearchOptionsForTermBer[0]);
    });
});
