import { fireEvent, screen, waitFor } from '@testing-library/react';
import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';
import { createRequest, createResponse, RequestOptions } from 'node-mocks-http';

export const typeIntoForm = (text: string) => {
    const inputElement = screen.getByRole('textbox');
    fireEvent.change(inputElement, { target: { value: text } });
};

export const clickSearchButton = () => {
    const searchButton = screen.getByRole('button', { name: 'Search' });
    fireEvent.click(searchButton);
};

export const clickSuggestionButton = () => {
    const suggestionButton = screen.getByRole('button', { name: 'Mocked Search Option' });
    fireEvent.click(suggestionButton);
};

export const waitForNeverToHappen = async (callable: () => unknown) => {
    await expect(waitFor(callable)).rejects.toEqual(expect.anything());
};

export const testHandler = async (handler: NextApiHandler, options: RequestOptions) => {
    const req = createRequest<NextApiRequest>(options);
    const res = createResponse<NextApiResponse>();

    await handler(req, res);
    return res;
};
