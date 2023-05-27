import React from 'react';
import { render, screen } from '@testing-library/react';
import WeatherCheck from '@/src/components/WeatherCheck';
import SearchWeather from '@/src/components/SearchWeather';
import Forecast from '@/src/components/Forecast';
import { mockForecastForBerlin } from '@/mocks/mockData';
import { server } from '@/mocks/mswServer';

jest.mock('../../src/components/SearchWeather', () => {
    return jest.fn(() => <div>Mocked SearchWeather</div>);
});

jest.mock('../../src/components/Forecast', () => {
    return jest.fn(() => <div>Mocked Forecast</div>);
});

describe('WeatherCheck', () => {
    beforeAll(() => {
        server.listen();
    });

    afterAll(() => {
        server.close();
    });

    afterEach(() => {
        jest.clearAllMocks();
        server.resetHandlers();
    });

    it('renders the title', () => {
        render(<WeatherCheck />);
        const titleElement = screen.getByText(/weather check/i);
        expect(titleElement).toBeInTheDocument();
    });

    it('renders the SearchWeather component if forecast is null', () => {
        render(<WeatherCheck />);
        const searchWeatherComponent = screen.getByText('Mocked SearchWeather');

        expect(searchWeatherComponent).toBeInTheDocument();
        expect(Forecast).not.toHaveBeenCalled();
        expect(SearchWeather).toHaveBeenCalled();
    });

    it('renders the ForecastPage component if forecast is set', () => {
        const useStateSpy = jest.spyOn(React, 'useState');
        useStateSpy.mockImplementationOnce(() => [mockForecastForBerlin, jest.fn()]);

        render(<WeatherCheck />);
        const forecastComponent = screen.getByText('Mocked Forecast');

        expect(forecastComponent).toBeInTheDocument();
        expect(Forecast).toHaveBeenCalled();
        expect(SearchWeather).not.toHaveBeenCalled();
    });
});
