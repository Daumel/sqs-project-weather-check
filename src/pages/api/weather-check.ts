import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/src/prismaClient';
import logger from '@/src/logger';

const POST_SUCCESS_MESSAGE = 'Created WeatherCheck entry successfully';
const POST_ERROR_MESSAGE = 'Could not create WeatherCheck entry';
const POST_REQUEST_TYPE_ERROR_MESSAGE = 'Only POST requests are allowed';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const { name, temp } = req.body;

        logger.info(`Creating WeatherCheck entry (name: ${name}, temp: ${temp})`);
        try {
            await prisma.weatherCheck.create({
                data: {
                    name,
                    temp,
                },
            });
            logger.info(POST_SUCCESS_MESSAGE);
            res.statusCode = 200;
            res.end(JSON.stringify({ message: POST_SUCCESS_MESSAGE }));
        } catch (error) {
            logger.error(error);
            res.statusCode = 500;
            res.end(JSON.stringify({ error: POST_ERROR_MESSAGE }));
        }
    } else {
        res.statusCode = 405;
        res.end(JSON.stringify({ error: POST_REQUEST_TYPE_ERROR_MESSAGE }));
    }
}
