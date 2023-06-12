import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/src/prismaClient';
import logger from '@/src/logger';

const GET_SUCCESS_MESSAGE = 'Fetched WeatherCheck entries successfully';
const GET_ERROR_MESSAGE = 'Could not fetch WeatherCheck entries';
const DELETE_SUCCESS_MESSAGE = 'Deleted WeatherCheck entries successfully';
const DELETE_ERROR_MESSAGE = 'Could not delete WeatherCheck entries';
const INVALID_REQUEST_TYPE_ERROR_MESSAGE = 'Invalid request type. Only GET and DELETE requests are allowed';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    switch (req.method) {
        case 'GET':
            logger.info('Fetching all WeatherCheck entries');
            try {
                const response = await prisma.weatherCheck.findMany();
                logger.info(GET_SUCCESS_MESSAGE);
                res.statusCode = 200;
                res.end(JSON.stringify(response));
            } catch (error) {
                logger.error(error);
                res.statusCode = 500;
                res.end(JSON.stringify({ error: GET_ERROR_MESSAGE }));
            }
            break;
        case 'DELETE':
            const name = req.query.name as string;
            logger.info('Deleting WeatherCheck entries');
            try {
                await prisma.weatherCheck.deleteMany({ where: { name: name } });
                logger.info(DELETE_SUCCESS_MESSAGE);
                res.statusCode = 200;
                res.end(JSON.stringify({ message: DELETE_SUCCESS_MESSAGE }));
            } catch (error) {
                logger.error(error);
                res.statusCode = 500;
                res.end(JSON.stringify({ error: DELETE_ERROR_MESSAGE }));
            }
            break;
        default:
            res.statusCode = 405;
            res.end(JSON.stringify({ error: INVALID_REQUEST_TYPE_ERROR_MESSAGE }));
    }
}
