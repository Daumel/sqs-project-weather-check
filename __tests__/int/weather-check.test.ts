/**
 * @jest-environment node
 */
import handlerWeatherCheck from '@/src/pages/api/weather-check';
import { createHandlerObjects } from '@/__tests__/test-util';

describe('API Endpoint /api/weather-check', () => {
    it('should return a valid response', async () => {
        const { req, res } = createHandlerObjects({
            method: 'POST',
            body: { name: 'Berlin', temp: 25 },
        });
        await handlerWeatherCheck(req, res);

        expect(res.statusCode).toBe(200);
        expect(res._getJSONData()).toEqual({ message: 'Created WeatherCheck entry successfully' });
    });

    it('should return a 500 if temp parameter is missing', async () => {
        const { req, res } = createHandlerObjects({
            method: 'POST',
            body: { name: 'Berlin' },
        });
        await handlerWeatherCheck(req, res);

        expect(res.statusCode).toBe(500);
        expect(res._getJSONData()).toEqual({ error: 'Could not create WeatherCheck entry' });
    });

    it('should return a 500 if name parameter is missing', async () => {
        const { req, res } = createHandlerObjects({
            method: 'POST',
            body: { temp: 25 },
        });
        await handlerWeatherCheck(req, res);

        expect(res.statusCode).toBe(500);
        expect(res._getJSONData()).toEqual({ error: 'Could not create WeatherCheck entry' });
    });

    it('should return a 405 if HTTP method is not POST', async () => {
        const { req, res } = createHandlerObjects({ method: 'GET' });
        await handlerWeatherCheck(req, res);

        expect(res.statusCode).toBe(405);
        expect(res._getJSONData()).toEqual({
            error: 'Invalid request type. Only POST requests are allowed',
        });
    });
});
