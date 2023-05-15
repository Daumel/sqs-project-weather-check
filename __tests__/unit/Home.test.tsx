import React from 'react';
import { render, screen } from '@testing-library/react';
import Home from '@/src/components/Home';
import SearchWeather from '@/src/components/SearchWeather';
import Forecast from '@/src/components/Forecast';
import { mockForecastForBerlin } from '@/mocks/mockData';

jest.mock('../../src/components/SearchWeather', () => {
    return jest.fn(() => <div>Mocked SearchWeather</div>);
});

jest.mock('../../src/components/Forecast', () => {
    return jest.fn(() => <div>Mocked Forecast</div>);
});

describe('Home', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('renders the title', () => {
        render(<Home />);
        const titleElement = screen.getByText(/weather check/i);
        expect(titleElement).toBeInTheDocument();
    });

    it('renders the SearchWeather component if forecast is null', () => {
        render(<Home />);
        const searchWeatherComponent = screen.getByText('Mocked SearchWeather');

        expect(searchWeatherComponent).toBeInTheDocument();
        expect(Forecast).not.toHaveBeenCalled();
        expect(SearchWeather).toHaveBeenCalled();
    });

    it('renders the Forecast component if forecast is set', () => {
        const useStateSpy = jest.spyOn(React, 'useState');
        useStateSpy.mockImplementationOnce(() => [mockForecastForBerlin, jest.fn()]);

        render(<Home />);
        const forecastComponent = screen.getByText('Mocked Forecast');

        expect(forecastComponent).toBeInTheDocument();
        expect(Forecast).toHaveBeenCalled();
        expect(SearchWeather).not.toHaveBeenCalled();
    });
});
