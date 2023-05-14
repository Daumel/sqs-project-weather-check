import { rest } from 'msw';
import { mockForecast, mockSearchOptions } from '@/mocks/mockData';

export const handlers = [
    rest.get(`/api/api-search-options`, (req, res, ctx) => {
        return res(ctx.status(200), ctx.json(mockSearchOptions));
    }),

    rest.get(`/api/api-forecast`, (req, res, ctx) => {
        return res(ctx.status(200), ctx.json(mockForecast));
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
