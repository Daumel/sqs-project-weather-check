import type { NextApiRequest, NextApiResponse } from 'next';
import logger from '@/src/logger';
import axios from 'axios';

const GET_SUCCESS_MESSAGE = `Fetched search options successfully`;
const GET_ERROR_MESSAGE = 'Could not fetch search options';
const GET_REQUEST_TYPE_ERROR_MESSAGE = 'Only GET requests are allowed';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        const API_KEY = process.env.API_KEY;
        const searchTerm = req.query.term as string;
        const searchOptionsUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${searchTerm.trim()}&limit=5&lang=en&appid=${API_KEY}`;

        logger.info(`Fetching search options for ${searchTerm}`);
        try {
            const response = await axios.get(searchOptionsUrl);
            logger.info(`${GET_SUCCESS_MESSAGE} for ${searchTerm}`);
            res.statusCode = 200;
            res.end(JSON.stringify(response.data));
        } catch (error) {
            logger.error(error);
            res.statusCode = 500;
            res.end(JSON.stringify({ error: GET_ERROR_MESSAGE }));
        }
    } else {
        res.statusCode = 405;
        res.end(JSON.stringify({ error: GET_REQUEST_TYPE_ERROR_MESSAGE }));
    }
}
