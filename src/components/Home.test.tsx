import React from 'react';
import { render, screen } from '@testing-library/react';
import Home from '@/src/components/Home';
import SearchWeather from '@/src/components/SearchWeather';
import Forecast from '@/src/components/Forecast';
import { mockForecast } from '@/mocks/mockData';

jest.mock('./SearchWeather', () => {
    return jest.fn(() => <div>Mocked SearchWeather</div>);
});

jest.mock('./Forecast', () => {
    return jest.fn(() => <div>Mocked Forecast</div>);
});

describe('Home', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('renders the title', () => {
        render(<Home />);
        const title = screen.getByText(/Weather Check/i);
        expect(title).toBeInTheDocument();
    });

    it('renders the SearchWeather component if forecast is null', () => {
        render(<Home />);
        const searchWeather = screen.getByText(/Mocked SearchWeather/i);

        expect(searchWeather).toBeInTheDocument();
        expect(Forecast).not.toHaveBeenCalled();
        expect(SearchWeather).toHaveBeenCalled();
    });

    // it('renders the Forecast component if forecast is not null', () => {
    //     const useStateSpy = jest.spyOn(React, 'useState');
    //     useStateSpy.mockImplementationOnce(() => [mockForecast, jest.fn()]);
    //
    //     render(<Home />);
    //     const forecast = screen.getByText(/Mocked Forecast/i);
    //
    //     expect(forecast).toBeInTheDocument();
    //     expect(Forecast).toHaveBeenCalled();
    //     expect(SearchWeather).not.toHaveBeenCalled();
    // });
});
