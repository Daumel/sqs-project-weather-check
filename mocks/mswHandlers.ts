import { rest } from 'msw';
import { mockForecast, mockSearchOptions } from '@/mocks/mockData';

const BASE_URL = 'http://api.openweathermap.org';

export const handlers = [
    rest.get(`${BASE_URL}/geo/1.0/direct`, (req, res, ctx) => {
        return res(ctx.status(200), ctx.json(mockSearchOptions));
    }),

    rest.get(`${BASE_URL}/data/2.5/weather`, (req, res, ctx) => {
        return res(ctx.status(200), ctx.json(mockForecast));
    }),

    // Fallback handler
    rest.get('*', (req, res, ctx) => {
        console.error(`Please add request handler for ${req.url.toString()}`);
        return res(ctx.status(500), ctx.json({ error: 'You must add request handler.' }));
    }),
];
