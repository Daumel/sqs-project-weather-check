import type { NextApiRequest, NextApiResponse } from 'next';
import logger from '@/src/logger';
import axios from '@/src/axiosBackendConfig';

const GET_SUCCESS_MESSAGE = `Fetched forecast successfully`;
const GET_ERROR_MESSAGE = 'Could not fetch forecast';
const GET_REQUEST_TYPE_ERROR_MESSAGE = 'Only GET requests are allowed';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        const API_KEY = process.env.API_KEY;
        const name = req.query.name;
        const latitude = req.query.lat;
        const longitude = req.query.lon;
        const forecastUrl = `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${API_KEY}`;

        logger.info(`Fetching forecast for ${name} (lat: ${latitude}, lon: ${longitude})`);
        axios
            .get(forecastUrl)
            .then(forecast => {
                logger.info(`${GET_SUCCESS_MESSAGE} for ${name}`);
                res.status(200).json(forecast.data);
            })
            .catch(() => {
                res.status(500).json({ error: GET_ERROR_MESSAGE });
            });
    } else {
        res.status(500).json({ error: GET_REQUEST_TYPE_ERROR_MESSAGE });
    }
}
