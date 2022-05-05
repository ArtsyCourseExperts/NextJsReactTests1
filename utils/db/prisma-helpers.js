//https://github.com/prisma/prisma-examples/blob/latest/typescript/rest-nextjs-api-routes/lib/prisma.ts

//Have to import in 2 steps due to Next.js not have ES6 modules yet.  So target ES2018.
//import { PrismaClient } from '@prisma/client';

//Have to import in 2 steps due to Next.js not have ES6 modules yet.  So target ES2018.
import { Prisma, PrismaClient } from '@prisma/client';
//import Prisma from '@prisma/client';
//const { PrismaClient } = Prisma;

import AppHelpers from 'utils/app/app-helpers';

//==================

//Global Prisma object (optimized) per app session.

//console.log("about to import @prisma/client");
// PrismaClient is attached to the `global` object in development to prevent
// exhausting your database connection limit.
//
// Learn more: 
// https://pris.ly/d/help/next-js-best-practices

let prisma = null;      //: PrismaClient

let prismaGlobalCache =
    {
    prisma : undefined
    }

if ( !AppHelpers.appHasWindow() )
    {
    //Factor out log params.
    if (process.env.NODE_ENV === 'production') 
        {//Create a new one, only when app runs in production.
        prismaGlobalCache.prisma = new PrismaClient(
            {log: ["query", "info", "warn", "error"]} );
        prisma = prismaGlobalCache.prisma;
        } 
    else 
        {//Development
        //https://www.prisma.io/docs/support/help-articles/nextjs-prisma-client-dev-practices

        //In development, the command next dev clears Node.js cache on run. 
        //This in turn initializes a new PrismaClient instance each time due to hot reloading that creates a connection to the database. 
        //This can quickly exhaust the database connections as each PrismaClient instance holds its own connection pool.

        if (!prismaGlobalCache.prisma) 
            {//Only if it doesn't exist...
            //global.prisma = new PrismaClient( ['query'] )
            prismaGlobalCache.prisma = new PrismaClient(
                {
                log: ["query", "info", "warn", "error"]
                } );

            }
        prisma = prismaGlobalCache.prisma;
        }
    }

//=================


//Not async with promise.
function dbGetPrisma() 
    {
    console.log("dbGetPrisma()");

    //console.log("dbGetPrisma, typeof=", typeof(prisma) );
    //Object

    //console.log("dbGetPrisma, instanceof=", prisma instanceof PrismaClient );
    //True

    if ( !prisma || null == prisma )
        {
        console.log("Error no prisma object.");
        }

    if ( ! prisma instanceof PrismaClient )
        {
        console.log("Error invalid prisma object.");
        }

    return ( prisma );
    }

//=================


//In most cases, you do not need to explicitly call these methods. 
//PrismaClient automatically connects when you run your first query, creates a connection pool, and disconnects when the Node.js process ends.
async function dbConnectExplicitly() 
    {
    console.log("dbConnectExplicitly() - Check connection - start");

    if ( !prisma )
        {
        console.log("dbConnectExplicitly() - No prisma object.")
        return ( -1 );
        }

    console.log("dbConnectExplicitly, about to connect");
    try
        {
        await prisma.$connect()
        }
    catch ( e )
        {
        //error - Error: Can't reach database server at `localhost`:`3306`
        //Please make sure your database server is running at `localhost`:`3306`.
        console.log(e);
        //error
        return ( -10 );
        }

    //Success
    return ( 1 );
    }
//=================


async function dbDisconnectExplicitly() 
    {
    console.log("dbDisconnectExplicitly() - Check connection - start");

    if ( !prisma )
        {
        console.log("dbDisconnectExplicitly() - No prisma object.")
        return ( -1 );
        }

    console.log("dbDisconnectExplicitly, about to disconnect");
    await prisma.$disconnect()

    //Success
    return ( 1 );
    }
//=================


async function dbTestDatabaseAccess( tableTestName ) 
    {
    console.log("dbTestDatabaseAccess()");

    let results = {};
    results.records = null;
    results.code = undefined;
    results.status = null;
    results.isValid = false;
    results.dbEngineGood = false;

    let records = null;
    if ( !prisma )
        {
        console.log("dbTestDatabaseAccess() - No Prisma?");
        results.dbEngineGood = false;
        results.status = "No PrismaClient DB global object";
        results.isValid = false;
        return (results);
        }
    else
        {
        //console.log("got prisma", PrismaHelpers.prisma );
        results.dbEngineGood = true;
        }

    //console.log( "prisma= " , PrismaHelpers.prisma );

    //tableTestName

    if ( !prisma[tableTestName] )
    //if ( !PrismaHelpers.prisma.aceTestConn )
        {//Didnt configure this database?
        console.log("dbTestDatabaseAccess() - No test table configured?  ");
        //console.log("No test table configured?  ", PrismaHelpers.prisma._dmmf.modelMap );
        results.status = "Can't see config for table aceTestConn";
        results.isValid = false;
        return (results);
        }

    try 
        {
        //Get the first 5 test records
        records = await prisma[tableTestName].findMany( {skip:0, take:5});
        
        //prisma:query SELECT `ace_saas`.`acetestconn`.`id`, `ace_saas`.`acetestconn`.`email`, `ace_saas`.`acetestconn`.`name`, `ace_saas`.`acetestconn`.`notes` FROM `ace_saas`.`acetestconn` WHERE 1=1 ORDER BY `ace_saas`.`acetestconn`.`id` ASC LIMIT ? OFFSET ?

        //console.log("dbTestDatabaseAccess() - records=", records);
        //records = await PrismaHelpers.prisma.aceTestConn.findMany();
        }
    catch (e)
        {
        if (e instanceof Prisma.PrismaClientKnownRequestError) {
            // The .code property can be accessed in a type-safe manner
            //if (e.code === 'P2002') {
            results.status = "PrismaClientKnownRequestError - " + e.message;
            results.code = e.code;
            results.isValid = false;
            return (results);
            }
        else if (e instanceof Prisma.PrismaClientInitializationError) {
            results.status = "PrismaClientInitializationError - " + e.message;
            results.code = e.errorCode;
            results.isValid = false;
            return (results);
            }
        else if (e instanceof Prisma.PrismaClientValidationError) {
            results.status = "PrismaClientValidationError - " + e.message;
            results.code = -1;  //No error code.
            results.isValid = false;
            return (results);
            }
        
        results.status = "Catch other prisma error - " + e.toString();
        results.isValid = false;
        results.code = -1;
        return ( results );
        }

    if ( !records )
        {
        console.log("isDbConnWorking() - Can't get to DB.  Can't get test records.");
        results.status = "Could not get records";
        return ( results );    
        }
    
    if ( records && records.length )
        {//SUCCESS!!!
        console.log("isDbConnWorking() - Connected & Found test records");
        results.isValid = true;
        results.status = "OK"; 
        results.records = records;
        results.code = 0;
        }

    return ( results );
    }
//=================


//Get a 1 or not 1 about DB test.
//call with await...
async function dbTestDatabaseAccessAsBool( tableTestName ) 
    {
    console.log("dbTestDatabaseAccess()");
    
    var results = await dbTestDatabaseAccess( tableTestName );
    //console.log("testDbConnWorking=", results);
    
    if ( !results )
        return ( false )

    if ( results.isValid )
        return ( true );
    
    //other
    return ( false );
    }
//=================



async function dbCountRows( tableName ) 
    {
    console.log("dbTestDatabaseAccess()");

    let recordCount = null;
    if ( !prisma )
        {
        console.log("dbTestDatabaseAccess() - No Prisma?");
        return ( -1 );
        }
    
    if ( !prisma[tableName] )
    //if ( !PrismaHelpers.prisma.aceTestConn )
        {//Didnt configure this database?
        console.log("dbTestDatabaseAccess() - No test table configured?  ");
        return ( -1 );
        }

    try 
        {
        //Get the first 5 test records
        recordCount = await prisma[tableTestName].count( {});
        
        //console.log("dbTestDatabaseAccess() - records=", records);
        //records = await PrismaHelpers.prisma.aceTestConn.findMany();
        }
    catch (e)
        {
        return ( -1 );
        }

    return ( recordCount );
    }
//=================


// Given some params, create a user on the database,
// storing the encrypted password.
//let params = {email:"test@test.com", name: "Aim Cor", password:"pass" };
export async function dbUpdateHelper( tableName, whereParams, dataParams )
    {
    console.log("dbUpdateHelper()");

    if ( !whereParams || Object.keys(whereParams).length < 1 )
        {
        console.log("dbUpdateHelper() - no where params passed");
        return ( null );
        }

    if ( !dataParams || Object.keys(dataParams).length < 1 )
        {
        console.log("dbUpdateHelper() - no data params passed");
        return ( null );
        }

    console.log("dbUpdateHelper() from table="+ tableName + " params="+JSON.stringify(whereParams) );
    
    if ( !prisma[tableName] )
        {//Invalid table?
        console.log("dbUpdateHelper() - Can't find table");
        return ( null );
        }

    let updatedRecord = null;
    
    try 
        {
        updatedRecord = await prisma[tableName].update
            (
                //where: { contentLibraryId: user.content.id }
                { 
                where: { ...whereParams },
                //data: { notes: "updated notes", emailVerified: 1 }
                data: {...dataParams } 
                }
            );
        }
    catch ( e )
        {
        console.log( e );
        if (e instanceof Prisma.PrismaClientKnownRequestError ) 
            {
            // The .code property can be accessed in a type-safe manner
            if (e.code === 'P2002') 
                {
                console.log('There is a unique constraint violation, a new user cannot be created with this email')
                return ( null );
                }
            else if ( e.code === 'P2025')
                {//Record to delete does not exist.'
                console.log("dbDeleteHelper() - record not found, not really an error.");
                return (null )
                }
            }
        }
    
    //Success
    return ( updatedRecord );
    }
//=================


//Delete helper
export async function dbDeleteHelper( tableName , whereParams )
    {
    console.log("dbDeleteHelper() from table="+ tableName + " params="+JSON.stringify(whereParams) );
    
    let deletedRecord = null;

    if ( !prisma[tableName] )
        {//Invalid table?
        console.log("dbDeleteHelper() - Can't find table");
        return ( null );
        }

    try 
        {
        deletedRecord = await prisma[tableName].delete
            (
                
                //{ where: { contentLibraryId: user.content.id } }
                { where: { ...whereParams } }
                
            );
        }
    catch ( e )
        {
        console.log( e );
        if (e instanceof Prisma.PrismaClientKnownRequestError ) 
            {
            // The .code property can be accessed in a type-safe manner
            if (e.code === 'P2002') 
                {
                console.log('There is a unique constraint violation, a new user cannot be created with this email')
                return ( null );
                }
            else if ( e.code === 'P2025')
                {//Record to delete does not exist.'
                console.log("dbDeleteHelper() - record not found, not really an error.");
                return (null )
                }
            }
        }
    
    //Success
    return ( deletedRecord );
    }
//=================



module.exports = {
    prisma,
    dbGetPrisma,                    //Get smart prisma, possibly cached.
    dbConnectExplicitly,
    dbDisconnectExplicitly,
    dbTestDatabaseAccessAsBool,
    dbTestDatabaseAccess,
    dbUpdateHelper,
    dbDeleteHelper,
    dbCountRows    
    };

//export default prisma

