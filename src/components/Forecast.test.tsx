import { render, screen } from '@testing-library/react';
import Forecast from '@/src/components/Forecast';
import { mockForecast } from '@/mocks/mockData';

describe('Forecast', () => {
    test('renders the city name and the temperature', () => {
        render(<Forecast forecast={mockForecast} />);
        const cityNameElement = screen.getByText(mockForecast.name);
        const temperatureElement = screen.getByText(`${mockForecast.main.temp} °C`);

        expect(cityNameElement).toBeInTheDocument();
        expect(temperatureElement).toBeInTheDocument();
    });
});
