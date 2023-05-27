import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/src/prismaClient';
import logger from '@/src/logger';

const GET_SUCCESS_MESSAGE = `Fetched WeatherCheck entries successfully`;
const GET_ERROR_MESSAGE = 'Could not fetch WeatherCheck entries';
const GET_REQUEST_TYPE_ERROR_MESSAGE = 'Only GET requests are allowed';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        logger.info(`Fetching all WeatherCheck entries`);
        prisma.weatherCheck
            .findMany()
            .then(weatherChecks => {
                logger.info(GET_SUCCESS_MESSAGE);
                res.status(200).json(weatherChecks);
            })
            .catch(error => {
                logger.error(`${GET_ERROR_MESSAGE}: ${error.message}`);
                res.status(500).json({ error: GET_ERROR_MESSAGE });
            });
    } else {
        res.status(405).json({ error: GET_REQUEST_TYPE_ERROR_MESSAGE });
    }
}
