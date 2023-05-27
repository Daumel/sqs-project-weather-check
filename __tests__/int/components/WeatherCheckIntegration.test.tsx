import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import WeatherCheck from '@/src/components/WeatherCheck';
import { typeIntoForm, clickSearchButton, waitForNeverToHappen } from '@/__tests__/test-util';

describe('WeatherCheck', () => {
    beforeEach(() => {
        render(<WeatherCheck />);
    });

    it('displays the forecast when a city is selected and the search button is clicked', async () => {
        typeIntoForm('Reit im Winkl');

        const suggestionButtons = await screen.findAllByText('Reit im Winkl, DE', { selector: 'button' });
        expect(suggestionButtons.length).toBe(1);

        fireEvent.click(suggestionButtons[0]);
        clickSearchButton();

        await waitFor(() => {
            const cityNameElement = screen.getByText('Reit im Winkl');
            const temperatureElement = screen.getByText(/°C/);

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
        expect(suggestionButtons.length).toBeGreaterThan(1);

        typeIntoForm('Hamburg');
        suggestionButtons = await screen.findAllByText('Hamburg, DE', { selector: 'button' });
        expect(suggestionButtons.length).toBe(1);
    });
});
