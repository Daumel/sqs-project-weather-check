import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import SearchWeather from './SearchWeather';
import Suggestions from './Suggestions';
import { mockSearchOption } from '@/mocks/mockData';
import React from 'react';

jest.mock('./Suggestions', () => {
    return jest.fn(() => <div>Mocked Suggestions</div>);
});

const setForecast = jest.fn();

describe('SearchWeather', () => {
    beforeEach(() => {
        render(<SearchWeather setForecast={setForecast} />);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('renders the input field and the search button', () => {
        const input = screen.getByRole('textbox');
        const button = screen.getByRole('button', { name: /search/i });

        expect(input).toBeInTheDocument();
        expect(button).toBeInTheDocument();
    });

    // it('updates the input field value', () => {
    //     const input = screen.getByRole('textbox');
    //     fireEvent.change(input, { target: { value: 'Ber' } });
    //
    //     expect(input).toHaveValue('Ber');
    // });

    it('displays the suggestions when search term length is >= 3', async () => {
        const input = screen.getByRole('textbox');
        fireEvent.change(input, { target: { value: 'Ber' } });

        await waitFor(() => {
            expect(Suggestions).toHaveBeenCalled();
        });
    });

    // it('submits the search when a city is selected and the search button is clicked', async () => {
    //     const useStateSpy = jest.spyOn(React, 'useState');
    //     useStateSpy.mockImplementationOnce(() => [mockSearchOption, jest.fn()]);
    //
    //     const button = screen.getByRole('button', { name: /search/i });
    //     fireEvent.click(button);
    //
    //     await waitFor(() => {
    //         expect(setForecast).toHaveBeenCalled();
    //     });
    // });
});
