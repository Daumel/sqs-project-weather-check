/**
 * @jest-environment node
 */
import handlerApiSearchOptions from '@/src/pages/api/api-search-options';
import waitForExpect from 'wait-for-expect';
import { createHandlerObjects } from '@/__tests__/test-util';

describe('API Endpoint /api/api-search-options', () => {
    it('should return a valid response', async () => {
        const { req, res } = createHandlerObjects({
            method: 'GET',
            query: { term: 'Geretsried' },
        });
        handlerApiSearchOptions(req, res);

        await waitForExpect(() => {
            const jsonData = res._getJSONData();
            expect(res.statusCode).toBe(200);
            expect(jsonData[0].name).toBe('Geretsried');
            expect(jsonData[0].country).toBe('DE');
        });
    });

    it('should return a 500 if no search term is given', async () => {
        const { req, res } = createHandlerObjects({
            method: 'GET',
            query: { term: '' },
        });
        handlerApiSearchOptions(req, res);

        await waitForExpect(() => {
            expect(res.statusCode).toBe(500);
            expect(res._getJSONData()).toEqual({ error: 'Could not fetch search options' });
        });
    });

    it('should return a 405 if HTTP method is not GET', async () => {
        const { req, res } = createHandlerObjects({ method: 'POST' });
        handlerApiSearchOptions(req, res);

        await waitForExpect(() => {
            expect(res.statusCode).toBe(405);
            expect(res._getJSONData()).toEqual({
                error: 'Only GET requests are allowed',
            });
        });
    });
});
