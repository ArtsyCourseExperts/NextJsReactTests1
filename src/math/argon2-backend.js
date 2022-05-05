

import ArgonHelpers from "/utils/math/argon-helpers"
// Server-only code.

//=================

//Page render time
export const handleServerSideProps = async ( {req,res} ) =>
    {
    console.log("handleServerSideProps() for test/math/argon2 page");

    //const res = await fetch('http://localhost:3000/api/feed')

    //AceTestTable

    //const posts = await PrismaHelpers.prisma.aceTest1.findMany();
    //const posts = await PrismaHelpers.prisma.samplePost.findMany();

    //const posts = await PrismaHelpers.prisma.aceTest1.findMany();
    //console.log("got posts=", posts );
    //console.log("posts[0]=", posts[0] );
    
    let passwordReal = "thePass";       //await ArgonHelpers.createHash("thePass");
    console.log("getServerSideProps()-real password hash is=",passwordReal);
    
    let passwordHashed = await ArgonHelpers.createHash( passwordReal );
    console.log("getServerSideProps()-real password entered now is=",passwordHashed);

    //let passwordGood = "xyasdfaf7";
    let passwordGood = await ArgonHelpers.verifyHash( passwordHashed , passwordReal); 
    //console.log("getServerSideProps()- passwordGood=", passwordGood );
    //console.log( "passwordGood type=", typeof(passwordGood) );

    const results = []; // await PrismaHelpers.prisma.aceTest1.findMany();
    
    return {
        props:
            {
            data: 
                {
                test: "hello from server",
                passwordIn: passwordReal,
                passwordHashed: passwordHashed,
                passwordGood: passwordGood
                }
            }
        }

    }
