/**
 * @jest-environment node
 */
import handlerWeatherChecks from '@/src/pages/api/weather-checks';
import handlerWeatherCheck from '@/src/pages/api/weather-check';
import waitForExpect from 'wait-for-expect';
import { createHandlerObjects } from '@/__tests__/test-util';

type WeatherCheckEntry = {
    name: string;
    temp: number;
};

describe('API Endpoint /api/weather-checks', () => {
    it('should return a valid response', async () => {
        const testEntry = { name: 'Teststadt', temp: 22 };

        const { req: reqPost, res: resPost } = createHandlerObjects({
            method: 'POST',
            body: testEntry,
        });
        await handlerWeatherCheck(reqPost, resPost);

        await waitForExpect(() => {
            expect(resPost._getStatusCode()).toBe(200);
        });

        const { req: reqGet, res: resGet } = createHandlerObjects({
            method: 'GET',
        });
        await handlerWeatherChecks(reqGet, resGet);

        await waitForExpect(() => {
            const jsonData = JSON.parse(resGet._getData());
            const matchingEntry = jsonData.find((entry: WeatherCheckEntry) => {
                return entry.name === testEntry.name && entry.temp === testEntry.temp;
            });
            expect(matchingEntry).toBeDefined();
        });
    });

    it('should return a 405 if HTTP method is not GET', async () => {
        const { req, res } = createHandlerObjects({ method: 'POST' });
        await handlerWeatherChecks(req, res);

        expect(res.statusCode).toBe(405);
        expect(res._getJSONData()).toEqual({
            error: 'Only GET requests are allowed',
        });
    });
});
