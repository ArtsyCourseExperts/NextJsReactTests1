
//Run this like this.
//npx prisma db seed


//https://stackoverflow.com/questions/66738563/error-importing-prismaclient-in-code-compiled-from-typescript-syntaxerror-name

//Have to import in 2 steps due to Next.js not have ES6 modules yet.  So target ES2018.
//import { PrismaClient } from '@prisma/client';
import Prisma from '@prisma/client';
const { PrismaClient } = Prisma;

//Import this one.
//import { samplePlaylists } from './seeds/samplePlaylists.js';
import { sampleUsers } from './seeds/sampleusers-seed.js';      ///index.js';

const prisma = new PrismaClient( 
    {log: ["query", "info", "warn", "error"]} );

console.log("Top of script");

async function main() 
    {
    console.log(`Start seeding ...`)
    
    //----

    /*
    console.log(`Sample Playlists`);
    const user = await prisma.samplePlaylist.createMany
        ({ data: samplePlaylists });

    */
    //----
    
    console.log(`Sample Users`);

    console.log(`Delete users`);
    await prisma.testUser.deleteMany({})

    console.log(`Create users`);
    for (const u of sampleUsers) {
      const user = await prisma.testUser.create({
        data: u,
      })
      console.log(`Created user with id: ${user.id}`)
    }
    
    console.log(`Seeding finished.`)
    }


main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })

console.log("Bottom of script");