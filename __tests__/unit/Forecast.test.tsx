import { render, screen } from '@testing-library/react';
import Forecast from '@/src/components/Forecast';
import { mockForecastForBerlin } from '@/mocks/mockData';

describe('Forecast', () => {
    test('renders the city name and the temperature', () => {
        render(<Forecast forecast={mockForecastForBerlin} />);
        const cityNameElement = screen.getByText(mockForecastForBerlin.name);
        const temperatureElement = screen.getByText(`${mockForecastForBerlin.main.temp} °C`);

        expect(cityNameElement).toBeInTheDocument();
        expect(temperatureElement).toBeInTheDocument();
    });
});
