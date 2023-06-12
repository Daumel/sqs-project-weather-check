import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/src/prismaClient';
import logger from '@/src/logger';

const GET_SUCCESS_MESSAGE = `Fetched WeatherCheck entries successfully`;
const GET_ERROR_MESSAGE = 'Could not fetch WeatherCheck entries';
const GET_REQUEST_TYPE_ERROR_MESSAGE = 'Only GET requests are allowed';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        logger.info(`Fetching all WeatherCheck entries`);
        try {
            const response = await prisma.weatherCheck.findMany();
            logger.info(`${GET_SUCCESS_MESSAGE}`);
            res.statusCode = 200;
            res.end(JSON.stringify(response));
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
