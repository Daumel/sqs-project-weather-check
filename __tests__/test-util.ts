import { fireEvent, screen, waitFor } from '@testing-library/react';

export const typeIntoForm = (text: string) => {
    const inputElement = screen.getByRole('textbox');
    fireEvent.change(inputElement, { target: { value: text } });
};

export const clickSearchButton = () => {
    const searchButton = screen.getByRole('button', { name: 'Search' });
    fireEvent.click(searchButton);
};

export const clickSuggestionButton = () => {
    const suggestionButton = screen.getByRole('button', { name: 'Mocked Search Option' });
    fireEvent.click(suggestionButton);
};

export const waitForNeverToHappen = async (callable: () => unknown) => {
    await expect(waitFor(callable)).rejects.toEqual(expect.anything());
};
