import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import SearchWeather from '@/src/components/SearchWeather';
import { mockSearchOption } from '@/mocks/mockData';
import axios from 'axios';
import React from 'react';

jest.mock('./Suggestions', () => {
    return jest.fn(({ setCity }) => (
        <ul>
            <li>
                <button onClick={() => setCity(mockSearchOption)}>Mocked Search Option</button>
            </li>
        </ul>
    ));
});

const typeIntoForm = (text: string) => {
    const inputElement = screen.getByRole('textbox');
    fireEvent.change(inputElement, { target: { value: text } });
};

describe('SearchWeather', () => {
    beforeEach(() => {
        render(<SearchWeather setForecast={jest.fn()} />);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('renders the input field and the search button', () => {
        const inputElement = screen.getByRole('textbox');
        const searchButton = screen.getByRole('button', { name: 'Search' });

        expect(inputElement).toBeInTheDocument();
        expect(searchButton).toBeInTheDocument();
    });

    it('fetches search options when search term is at least 3 characters long', async () => {
        const fetchSearchOptionsSpy = jest.spyOn(axios, 'get');
        typeIntoForm('Ber');

        await waitFor(() => expect(fetchSearchOptionsSpy).toHaveBeenCalled());
    });

    it('does not fetch search options when search term is less than 3 characters long', async () => {
        const fetchSearchOptionsSpy = jest.spyOn(axios, 'get');
        typeIntoForm('Be');

        await waitFor(() => expect(fetchSearchOptionsSpy).not.toHaveBeenCalled());
    });

    it('fetches forecast when a city is selected and the search button is clicked', async () => {
        const fetchForecastSpy = jest.spyOn(axios, 'get');
        const suggestionButton = screen.getByRole('button', { name: 'Mocked Search Option' });
        const searchButton = screen.getByRole('button', { name: 'Search' });

        fireEvent.click(suggestionButton);
        fireEvent.click(searchButton);

        await waitFor(() => expect(fetchForecastSpy).toHaveBeenCalled());
    });

    it('does not fetch forecast when no city is selected and the search button is clicked', async () => {
        const fetchForecastSpy = jest.spyOn(axios, 'get');
        const searchButton = screen.getByRole('button', { name: 'Search' });
        fireEvent.click(searchButton);

        await waitFor(() => expect(fetchForecastSpy).not.toHaveBeenCalled());
    });
});
