/**
 * @jest-environment node
 */
import handlerWeatherChecks from '@/src/pages/api/weather-checks';
import handlerWeatherCheck from '@/src/pages/api/weather-check';
import { createHandlerObjects } from '@/__tests__/test-util';

type WeatherCheckEntry = {
    name: string;
    temp: number;
};

describe('API Endpoint /api/weather-checks', () => {
    const testEntry = { name: 'Teststadt', temp: 22 };

    beforeAll(async () => {
        const { req: reqPost, res: resPost } = createHandlerObjects({
            method: 'POST',
            body: testEntry,
        });
        await handlerWeatherCheck(reqPost, resPost);
    }, 10000);

    it('should handle GET request', async () => {
        const { req: reqGet, res: resGet } = createHandlerObjects({
            method: 'GET',
        });
        await handlerWeatherChecks(reqGet, resGet);

        const jsonData = JSON.parse(resGet._getData());
        const matchingEntry = jsonData.find((entry: WeatherCheckEntry) => {
            return entry.name === testEntry.name && entry.temp === testEntry.temp;
        });

        expect(matchingEntry).toBeDefined();
        expect(resGet._getStatusCode()).toBe(200);
    });

    it('should handle DELETE request', async () => {
        const { req: reqDelete, res: resDelete } = createHandlerObjects({
            method: 'DELETE',
            query: {
                name: testEntry.name,
            },
        });

        await handlerWeatherChecks(reqDelete, resDelete);

        expect(resDelete._getStatusCode()).toBe(200);
        expect(resDelete._getJSONData()).toEqual({ message: 'Deleted WeatherCheck entries successfully' });

        const { req: reqGet, res: resGet } = createHandlerObjects({
            method: 'GET',
        });
        await handlerWeatherChecks(reqGet, resGet);
        const jsonData = JSON.parse(resGet._getData());
        const deletedEntry = jsonData.find((entry: WeatherCheckEntry) => {
            return entry.name === testEntry.name && entry.temp === testEntry.temp;
        });

        expect(deletedEntry).toBeUndefined();
    });

    it('should return a 405 if HTTP method is not GET or DELETE', async () => {
        const { req, res } = createHandlerObjects({ method: 'POST' });
        await handlerWeatherChecks(req, res);

        expect(res.statusCode).toBe(405);
        expect(res._getJSONData()).toEqual({
            error: 'Invalid request type. Only GET and DELETE requests are allowed',
        });
    });
});
