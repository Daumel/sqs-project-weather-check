/**
 * @jest-environment node
 */
import handlerWeatherChecks from '@/src/pages/api/weather-checks';
import handlerWeatherCheck from '@/src/pages/api/weather-check';
import waitForExpect from 'wait-for-expect';
import { testHandler } from '@/__tests__/test-util';

type WeatherCheckEntry = {
    name: string;
    temp: number;
};

describe('API Endpoint /api/weather-checks', () => {
    it('should return a valid response', async () => {
        const testEntry = { name: 'Teststadt', temp: 22 };

        await testHandler(handlerWeatherCheck, {
            method: 'POST',
            body: testEntry,
        });

        const res = await testHandler(handlerWeatherChecks, {
            method: 'GET',
        });

        await waitForExpect(() => {
            const jsonData = res._getJSONData();
            const matchingEntry = jsonData.find((entry: WeatherCheckEntry) => {
                return entry.name === testEntry.name && entry.temp === testEntry.temp;
            });
            expect(matchingEntry).toBeDefined();
        });
    });

    it('should return a 405 if HTTP method is not GET', async () => {
        const res = await testHandler(handlerWeatherChecks, { method: 'POST' });

        expect(res.statusCode).toBe(405);
        expect(res._getJSONData()).toEqual({
            error: 'Only GET requests are allowed',
        });
    });
});
