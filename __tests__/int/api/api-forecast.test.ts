/**
 * @jest-environment node
 */
import handler from '@/src/pages/api/api-forecast';
import waitForExpect from 'wait-for-expect';
import { testHandler } from '@/__tests__/test-util';

describe('API Endpoint /api/api-forecast ', () => {
    it('should return a valid response', async () => {
        const res = await testHandler(handler, {
            method: 'GET',
            query: { name: 'Reit im Winkl', lat: '47.6766357', lon: '12.4703473' },
        });

        await waitForExpect(() => {
            const jsonData = res._getJSONData();
            expect(jsonData.name).toBe('Reit im Winkl');
            expect(typeof jsonData.main.temp).toBe('number');
        });
    });

    it('should return a 500 if latitude is invalid', async () => {
        const res = await testHandler(handler, {
            method: 'GET',
            query: { name: 'Berlin', lat: 'invalid_latitude', lon: '13.3888599' },
        });

        await waitForExpect(() => {
            expect(res.statusCode).toBe(500);
            expect(res._getJSONData()).toEqual({ error: 'Could not fetch forecast' });
        });
    });

    it('should return a 500 if longitude is invalid', async () => {
        const res = await testHandler(handler, {
            method: 'GET',
            query: { name: 'Berlin', lat: '47.6766357', lon: 'invalid_longitude' },
        });

        await waitForExpect(() => {
            expect(res.statusCode).toBe(500);
            expect(res._getJSONData()).toEqual({ error: 'Could not fetch forecast' });
        });
    });

    it('should return a 405 if HTTP method is not GET', async () => {
        const res = await testHandler(handler, { method: 'POST' });

        expect(res.statusCode).toBe(405);
        expect(res._getJSONData()).toEqual({
            error: 'Only GET requests are allowed',
        });
    });
});
