import { render, screen } from '@testing-library/react';
import Forecast from '@/src/components/Forecast';
import { mockForecastForBerlin } from '@/mocks/mockData';

describe('Forecast', () => {
    test('renders the location name and the temperature', () => {
        render(<Forecast forecast={mockForecastForBerlin} />);
        const locationNameElement = screen.getByText(mockForecastForBerlin.name);
        const temperatureElement = screen.getByText(`${mockForecastForBerlin.main.temp} °C`);

        expect(locationNameElement).toBeInTheDocument();
        expect(temperatureElement).toBeInTheDocument();
    });
});
