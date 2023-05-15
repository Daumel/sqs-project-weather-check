import { rest } from 'msw';
import { mockForecastForBerlin, mockSearchOptionsForTermBer, mockSearchOptionsForTermHamburg } from '@/mocks/mockData';

export const handlers = [
    rest.get(`/api/api-search-options`, (req, res, ctx) => {
        const termQueryParameter = req.url.searchParams.get('term');

        if (termQueryParameter === 'Ber') {
            return res(ctx.status(200), ctx.json(mockSearchOptionsForTermBer));
        } else if (termQueryParameter === 'Hamburg') {
            return res(ctx.status(200), ctx.json(mockSearchOptionsForTermHamburg));
        } else {
            return res(ctx.status(200), ctx.json([]));
        }
    }),

    rest.get(`/api/api-forecast`, (req, res, ctx) => {
        const nameQueryParameter = req.url.searchParams.get('name');

        if (nameQueryParameter === 'Berlin') {
            return res(ctx.status(200), ctx.json(mockForecastForBerlin));
        } else {
            return res(ctx.status(200), ctx.json([]));
        }
    }),

    rest.post(`/api/weather-check`, (req, res, ctx) => {
        return res(ctx.status(200), ctx.json({ message: 'Weather check created' }));
    }),

    // Fallback handler
    rest.get('*', (req, res, ctx) => {
        console.error(`Please add request handler for ${req.url.toString()}`);
        return res(ctx.status(500), ctx.json({ error: 'You must add request handler.' }));
    }),
];
