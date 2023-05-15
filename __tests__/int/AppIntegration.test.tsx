import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import App from '@/src/components/Home';
import { mockForecastForBerlin, mockSearchOptionsForTermBer, mockSearchOptionsForTermHamburg } from '@/mocks/mockData';
import { typeIntoForm, clickSearchButton, waitForNeverToHappen } from '@/__tests__/test-util';

describe('App', () => {
    beforeEach(() => {
        render(<App />);
    });

    it('displays the forecast when a city is selected and the search button is clicked', async () => {
        typeIntoForm('Ber');

        const suggestionButtons = await screen.findAllByText(/Ber/i, { selector: 'button' });
        expect(suggestionButtons.length).toBe(mockSearchOptionsForTermBer.length);

        fireEvent.click(suggestionButtons[0]);
        clickSearchButton();

        await waitFor(() => {
            const cityNameElement = screen.getByText(`${mockForecastForBerlin.name}`);
            const temperatureElement = screen.getByText(`${mockForecastForBerlin.main.temp} °C`);

            expect(cityNameElement).toBeInTheDocument();
            expect(temperatureElement).toBeInTheDocument();
        });
    });

    it('does not display the forecast when no city is selected and the search button is clicked', async () => {
        clickSearchButton();

        await waitForNeverToHappen(() => {
            const temperatureElement = screen.getByText(/°C/);
            expect(temperatureElement).toBeInTheDocument();
        });
    });

    it('does not display suggestions when search term is less than 3 characters long', async () => {
        typeIntoForm('Be');

        await waitForNeverToHappen(() => {
            const suggestionList = screen.getAllByRole('listitem');
            expect(suggestionList.length).toBeGreaterThan(0);
        });
    });

    it('updates suggestions when search term changes', async () => {
        typeIntoForm('Ber');

        let suggestionButtons = await screen.findAllByText(/Ber/i, { selector: 'button' });
        expect(suggestionButtons.length).toBe(mockSearchOptionsForTermBer.length);

        typeIntoForm('Hamburg');
        suggestionButtons = await screen.findAllByText(/Hamburg/i, { selector: 'button' });
        expect(suggestionButtons.length).toBe(mockSearchOptionsForTermHamburg.length);
    });
});
