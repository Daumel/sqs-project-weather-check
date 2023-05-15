import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/src/prismaClient';
import logger from '@/src/logger';

const POST_SUCCESS_MESSAGE = 'Created WeatherCheck entry successfully';
const POST_ERROR_MESSAGE = 'Could not create WeatherCheck entry';
const POST_REQUEST_TYPE_ERROR_MESSAGE = 'Only POST requests are allowed';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const { name, temp } = req.body;
        logger.info(`Creating WeatherCheck entry (name: ${name}, temp: ${temp})`);
        prisma.weatherCheck
            .create({
                data: {
                    name,
                    temp,
                },
            })
            .then(() => {
                logger.info(POST_SUCCESS_MESSAGE);
                res.status(200).json({ message: POST_SUCCESS_MESSAGE });
            })
            .catch(error => {
                logger.error(`${POST_ERROR_MESSAGE}: ${error.message}`);
                res.status(500).json({ message: POST_ERROR_MESSAGE });
            });
    } else {
        res.status(500).json({ error: POST_REQUEST_TYPE_ERROR_MESSAGE });
    }
}
