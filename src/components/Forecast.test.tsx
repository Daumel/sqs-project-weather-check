import { render, screen } from '@testing-library/react';
import Forecast from '@/src/components/Forecast';
import { mockForecast } from '@/mocks/mockData';

describe('Forecast', () => {
    test('renders the forecast name and temperature', () => {
        render(<Forecast forecast={mockForecast} />);
        const cityName = screen.getByText(mockForecast.name);
        const temperature = screen.getByText(mockForecast.main.temp);

        expect(cityName).toBeInTheDocument();
        expect(temperature).toBeInTheDocument();
    });
});
