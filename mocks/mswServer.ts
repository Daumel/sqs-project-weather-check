import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { handlers } from '@/mocks/mswHandlers';

const server = setupServer(...handlers);

beforeAll(() => server.listen());
afterAll(() => server.close());
afterEach(() => server.resetHandlers());

export { server, rest };
