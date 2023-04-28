// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../lib/prisma'

type perfilProps = {
    title: string
    userId: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
    const {title, userId} = req.body; 
    try {
        const data = await prisma.perfil.create({
            data: {
                title: title,
                userId: userId
            }
        })
        res.status(200).json(data)
    } catch (error) {
        res.status(403).json({error})
    }

}
