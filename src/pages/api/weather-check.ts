import type {NextApiRequest, NextApiResponse} from 'next';
import {prisma} from '@/src/persistence/prismaClient';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const {name, temp} = req.body;
        await prisma.weatherCheck.create({
            data: {
                name,
                temp,
            }
        }).then(() => {
            res.status(200).json({message: 'Weather check created'});
        }).catch((error) => {
            console.log(error);
            res.status(500).json(error);
        });
    } else {
        res.status(500).json({error: 'Only POST requests are allowed'});
    }
}