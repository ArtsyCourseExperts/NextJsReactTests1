//Ace saas specific helpers

import PrismaHelpers from '/utils/db/prisma-helpers'

//=================

function dbGetTestConnTableName() 
    {
    return ( "aceTestConn" );
    }
//=================


module.exports = 
    {
    dbGetTestConnTableName
    };

//=================
