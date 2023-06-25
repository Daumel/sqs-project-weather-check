import { render, screen, waitFor } from '@testing-library/react';
import SearchWeather from '@/src/components/SearchWeather';
import { mockSearchOptionForBerlin } from '@/mocks/mockData';
import { typeIntoForm, clickSuggestionButton, clickSearchButton, waitForNeverToHappen } from '@/__tests__/test-util';
import axios from 'axios';
import React from 'react';
import { server } from '@/mocks/mswServer';

jest.mock('../../src/components/Suggestions', () => {
    return jest.fn(({ setLocation: setLocation }) => (
        <ul>
            <li>
                <button onClick={() => setLocation(mockSearchOptionForBerlin)}>Mocked Search Option</button>
            </li>
        </ul>
    ));
});

describe('SearchWeather', () => {
    beforeAll(() => {
        server.listen();
    });

    afterAll(() => {
        server.close();
    });

    beforeEach(() => {
        render(<SearchWeather setForecast={jest.fn()} />);
    });

    afterEach(() => {
        jest.clearAllMocks();
        server.resetHandlers();
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

        await waitForNeverToHappen(() => expect(fetchSearchOptionsSpy).toHaveBeenCalled());
    });

    it('fetches forecast when a location is selected and the search button is clicked', async () => {
        const fetchForecastSpy = jest.spyOn(axios, 'get');

        clickSuggestionButton();
        clickSearchButton();

        await waitFor(() => expect(fetchForecastSpy).toHaveBeenCalled());
    });

    it('does not fetch forecast when no location is selected and the search button is clicked', async () => {
        const fetchForecastSpy = jest.spyOn(axios, 'get');
        clickSearchButton();

        await waitForNeverToHappen(() => expect(fetchForecastSpy).toHaveBeenCalled());
    });
});
