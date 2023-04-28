// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../lib/prisma'

type userProps = {
    id: string
    email: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
    const {email, id} = req.body; 
    try {
        const data = await prisma.user.create({
            data: {
                id: id,
                email: email
            }
        })
        res.status(200).json(data)
    } catch (error) {
        res.status(403).json({error})
    }
}