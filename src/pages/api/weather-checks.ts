import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/src/persistence/prismaClient';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        await prisma.weatherCheck
            .findMany()
            .then(weatherChecks => {
                res.status(200).json(weatherChecks);
            })
            .catch(error => {
                console.log(error);
                res.status(500).json(error);
            });
    } else {
        res.status(500).json({ error: 'Only GET requests are allowed' });
    }
}
