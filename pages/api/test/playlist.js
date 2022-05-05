import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

//Use sample from playlist seeds

export default async function handler(req, res) 
    {
    const playlists = await prisma.samplePlaylist.findMany();
    res.json(playlists);
    }

