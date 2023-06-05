/**
 * @jest-environment node
 */
import handlerApiForecast from '@/src/pages/api/api-forecast';
import waitForExpect from 'wait-for-expect';
import { createHandlerObjects } from '@/__tests__/test-util';

describe('API Endpoint /api/api-forecast ', () => {
    it('should return a valid response', async () => {
        const { req, res } = createHandlerObjects({
            method: 'GET',
            query: { name: 'Reit im Winkl', lat: '47.6766357', lon: '12.4703473' },
        });
        handlerApiForecast(req, res);

        await waitForExpect(() => {
            const jsonData = JSON.parse(res._getData());
            expect(res.statusCode).toBe(200);
            expect(jsonData.name).toBe('Reit im Winkl');
            expect(typeof jsonData.main.temp).toBe('number');
        });
    });

    it('should return a 500 if latitude is invalid', async () => {
        const { req, res } = createHandlerObjects({
            method: 'GET',
            query: { name: 'Berlin', lat: 'invalid_latitude', lon: '13.3888599' },
        });
        handlerApiForecast(req, res);

        await waitForExpect(() => {
            expect(res.statusCode).toBe(500);
            expect(JSON.parse(res._getData())).toEqual({ error: 'Could not fetch forecast' });
        });
    });

    it('should return a 500 if longitude is invalid', async () => {
        const { req, res } = createHandlerObjects({
            method: 'GET',
            query: { name: 'Berlin', lat: '47.6766357', lon: 'invalid_longitude' },
        });
        handlerApiForecast(req, res);

        await waitForExpect(() => {
            expect(res.statusCode).toBe(500);
            expect(JSON.parse(res._getData())).toEqual({ error: 'Could not fetch forecast' });
        });
    });

    it('should return a 405 if HTTP method is not GET', async () => {
        const { req, res } = createHandlerObjects({ method: 'POST' });
        handlerApiForecast(req, res);

        await waitForExpect(() => {
            expect(res.statusCode).toBe(405);
            expect(JSON.parse(res._getData())).toEqual({
                error: 'Only GET requests are allowed',
            });
        });
    });
});
