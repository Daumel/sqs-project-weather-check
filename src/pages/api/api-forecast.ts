import type { NextApiRequest, NextApiResponse } from 'next';
import logger from '@/src/logger';
import axios from 'axios';

const GET_SUCCESS_MESSAGE = `Fetched forecast successfully`;
const GET_ERROR_MESSAGE = 'Could not fetch forecast';
const GET_REQUEST_TYPE_ERROR_MESSAGE = 'Only GET requests are allowed';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        const API_KEY = process.env.API_KEY;
        const name = req.query.name;
        const latitude = req.query.lat;
        const longitude = req.query.lon;
        const forecastUrl = `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${API_KEY}`;

        logger.info(`Fetching forecast for ${name} (lat: ${latitude}, lon: ${longitude})`);
        try {
            const response = await axios.get(forecastUrl);
            logger.info(`${GET_SUCCESS_MESSAGE} for ${name}`);
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
