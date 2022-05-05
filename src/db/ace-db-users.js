
//Special helpers just to login users and create users and delete users.


//import { User } from "@prisma/client";
//import prisma from "lib/prisma";
//import { encryptPassword } from "lib/auth/passwordUtils";
import pick from "lodash/pick";
//import { verifyPassword } from "./passwordUtils";
import ArgonHelpers from "/utils/math/argon-helpers";
import PrismaHelpers from '/utils/db/prisma-helpers';
import UuidHelpers from '/utils/math/uuid-helpers';
import AceDbHelpers from '/src/db/ace-db-helpers';

//=================

const emailMinLength = 6;
const passwordMinLength = 6;

//Common way to fetch aceUsers with extra stuff.  use { include : {...aceUsersInclude} }
const aceUsersInclude = { courses: true 
                        , profile: true
                        , settings: true
                        , alerts: true
                        , content: true
                        , plan: true
                        , paymentInfo: true
                        , payments: true
                        , stats: true
                        };

//include: { courses: true },
//=================


//Check if valid plain text password, length, symbols, letters.
export async function dbIsValidPlainPasswordFormat( password )
    {
    if ( !password || password.length < passwordMinLength )
        {
        console.log("invalid password");
        return ( false );
        }
    
    if ( password.length > 25 )
        {//Too long.
        return ( false );
        }

    /*
    if ( password.search(/\d/) == -1) 
        {//No num
        return ( false );
        }
    */

    if ( password.search(/[a-zA-Z]/) == -1) 
        {//No letter
        return( false );
        }

    return ( true );
    }
//=================


// Given some params, create a user on the database,
// storing the encrypted password.
//let params = {email:"test@test.com", name: "Aim Cor", password:"pass" };
export async function dbCreateUser( params )
    {
    console.log("createUser()");

    //Do SQL inject helpers/test outside of this API.

    //But do email format checks here.

    if ( !params.email || params.email.length < emailMinLength )
        {
        console.log("createUser() - invalid email");
        return ( null );
        }

    if ( !params.passwordPlain || params.passwordPlain.length < passwordMinLength )
        {
        console.log("createUser() - invalid password length");
        return ( null );
        }

    if ( !dbIsValidPlainPasswordFormat(params.passwordPlain) )
        {
        console.log("createUser() - invalid password");
        return ( null );
        }

    let filteredParams = params;    //pick(params, ["email", "passwordPlain"]);
    
    //Technically this is not in user table.    
    let profileParams = {};
    //Subset of params
    if ( undefined != params.name && params.name.length >= 1 )
        {//Have name
        profileParams["name"] = params.name;
        }
    delete params.name;
    
    let otherDynamicParams = { };

    //const password = await encryptPassword(filteredParams.password);
    let passwordNewHashed = await ArgonHelpers.createHash( params.passwordPlain );
    otherDynamicParams["passwordHashed"] = passwordNewHashed;
    otherDynamicParams["passwordTechnique"] = "HASHED-ARGON2";

    if ( undefined == params.uniqueUserGuid )
        {
        otherDynamicParams["uniqueUserGuid"] = UuidHelpers.getUuid();
        }
    
    let allUserParams = {...filteredParams, ...otherDynamicParams };

    let aceUser = await PrismaHelpers.dbGetPrisma().aceUser.create(
        {
        data: 
            { //All user fields
            ...allUserParams, 
            
            //Other tables
            profile:
                {
                create: 
                    { ...profileParams }
                }
            },
        
        //Also fetch other tables...
        include : {...aceUsersInclude}

        });
        
    if ( !aceUser )
        {
        console.error("createUser() - couldn't create the user");
        return ( null );
        }

        
    //name is in user.profile   model AceUserProfile {
    


    // Make sure all our lib methods obfuscate the password
    aceUser.passwordPlain = "***HIDDEN-FROM-APP***";
    aceUser.passwordHashed = "***HIDDEN-FROM-APP***";

    console.log("dbCreateUser() - success!");

    return aceUser;
    }
//=================


// Given some params, create a user on the database,
// storing the encrypted password.
//let params = {email:"test@test.com", name: "Aim Cor", password:"pass" };
export async function dbUpdateUser( userId, params )
    {
    console.log("dbUpdateUser()");

    if ( undefined != params.passwordPlain )
        {
        let passwordNewHashed = await ArgonHelpers.createHash( params.passwordPlain );
        params["passwordHashed"] = passwordNewHashed;
        params["passwordTechnique"] = "HASHED-ARGON2";
        delete params.passwordPlain;
        }

    let aceUser = await PrismaHelpers.dbUpdateHelper( "aceUser", {id:userId}, params );

    /*
    if ( !params || Object.keys(params).length < 1 )
        {
        console.log("dbUpdateUser() - no params passed");
        return ( null );
        }
    */

    /*
    let aceUser = await PrismaHelpers.dbGetPrisma().aceUser.update(
        {
        where:
            {
            id : userId
            },
        data: 
            { //All user fields
            ...params 
            }
        });
    */
    if ( !aceUser )
        {
        console.error("dbUpdateUser() - couldn't create the user");
        return ( null );
        }
        
    // Make sure all our lib methods obfuscate the password
    aceUser.passwordPlain = "***HIDDEN-FROM-APP***";
    aceUser.passwordHashed = "***HIDDEN-FROM-APP***";

    return aceUser;
    }
//=================


//export interface LoginParams { email, password }
// Given some login params (email and password) 
// return the user if the password is valid
// or null if it's not.
export async function dbLoginUser( email, passwordPlaintextAttempt ) 
    {

    //Do SQL inject helpers/test outside of this API.

    //But do email format checks here.

    if ( ( null != email ) || ( email.length < emailMinLength ) )
        {
        console.log("dbLoginUser() bad email");
        return ( -1 );
        }

    if ( ( null != passwordPlaintextAttempt ) || ( passwordPlaintextAttempt.length <= passwordMinLength ) )
        {
        console.log("dbLoginUser() bad password");
        return ( -2 );
        }
    
    let aceUser = await PrismaHelpers.dbGetPrisma().user.findUnique
        (
        { where: { email: params.email } 
    
        //Also fetch other tables...
        , include : { ...aceUsersInclude }
        
        });
    if ( !aceUser ) 
        {
        console.log("dbLoginUser() - invalid user email - user not found.");
        return ( -3 );
        }

    //let passwordReal = "thePass";       //await ArgonHelpers.createHash("thePass");
    //console.log("getServerSideProps()-real password hash is=",passwordReal);
    
    //let passwordEnteredNow = await ArgonHelpers.createHash("thePass");
    //console.log("getServerSideProps()-real password entered now is=",passwordEnteredNow);

    let passwordGood = await ArgonHelpers.verifyHash( aceUser.passwordHashed , passwordPlaintextAttempt ); 
    console.log("dbLoginUser()- passwordGood=", passwordGood );
    console.log( "passwordGood type=", typeof(passwordGood) );
    if ( !passwordGood )
        {
        console.log("dbLoginUser() - invalid password does not match");
        return ( -5 );
        }

    //----

     // Make sure all our lib methods obfuscate the password
    aceUser.passwordPlain = "***HIDDEN-FROM-APP***";
    aceUser.passwordHashed = "***HIDDEN-FROM-APP***";
    
    console.log("dbLoginUser() - success!");

    return aceUser;
}


//=================


//Log Out.
export async function dbLogoutByGuid( uniqueUserGuid )
    {
    console.log("dbLogoutByGuid()");

    if ( !uniqueUserGuid || uniqueUserGuid.length < 1 )
        {
        let result = { data: null, statusSuccess: false, statusNum: -101, statusCode:"missinguserguid", statusInfo: "no user GUID"};
        return ( result );    
        }

    let userId = dbGetUserIdFromUniqueUserGuid( uniqueUserGuid );
    if ( userId < 0 )
        {
        let result = { data: null, statusSuccess: false, statusNum: -100, statusCode:"invaliduserguid", statusInfo: "invalid Guid user id"};
        return ( result );
        }

    let results = await dbLogout( userId );

    return results;
    }
//=================


//Log Out.
export async function dbLogout( userId )
    {
    console.log("dbLogout()");

    if ( !userId || userId < 1 )
        {
        console.log("dbLogout() - invalid userId");
        let result = { data: null, statusSuccess: false, statusNum: -2, statusCode:"invaliduserid", statusInfo: "invalid user id"};
        return ( result );
        }

    let allUserParams = {};

    // When storing timestamp values, all values are converted from the given timezone to UTC for storage and converted back to the local timezone on retrieval. The datetime type does not do this.
    let serverDateTimeNow = new Date();
    
    let aceUserStats = await PrismaHelpers.dbGetPrisma().aceUserStats.update(
        {
        where: {
            userId: { contains: userId }
            },

        update: 
            { //All user fields
            sessionLastAccess: serverDateTimeNow, 
            
            loggedIn: 0, 
            logoutCount: { increment: 1 },
            logoutLastDateTime: serverDateTimeNow                        
        
            }
        
        });
        

    //Future... Delete SessionUniqueUserId and recreate for each login?


    if ( !aceUserStats )
        {
        console.error("createUser() - couldn't create the user");
        let result = { data: null, statusSuccess: false, statusNum: -1, statusCode:"updatefailed", statusInfo: "update logout info failed"};
        return ( result );
        }

        
    
    let result = { data: aceUserStats, statusSuccess: true, statusNum: 0, statusCode:"success", statusInfo: "updated logout stats"};
    return result;
    }
//=================


//See if user by email is in DB
export async function dbFindUserById( id ) 
    {
    console.log("dbFindUserById()");

    //Do email SQL injection safe check outside of this function.

    const user = await PrismaHelpers.dbGetPrisma().aceUser.findUnique(
        { 
        where: { id: id } 
    
        //Also fetch other tables...
        , include : { ...aceUsersInclude }
        
        });
    if (!user) 
        {
        console.log("dbFindUserById() - user not found.");
        return ( null );
        }

    console.log("dbFindUserById() - user found.");

    return (user);
}
//=================


//See if user by email is in DB
export async function dbFindUserByEmail( email ) 
    {
    console.log("findUserByEmail()");

    //Do email SQL injection safe check outside of this function.

    const user = await PrismaHelpers.dbGetPrisma().aceUser.findUnique(
        { 
        where: { email: email } 
        
        //Also fetch other tables...
        , include : { ...aceUsersInclude }
        });
    if (!user) 
        {
        console.log("findUserByEmail() - user not found.");
        return ( null );
        }

    console.log("findUserByEmail() - user found.");
    return (user);
}
//=================


//See if user by email is in DB
export async function dbFindUserByUniqueUserGuid( uniqueUserGuid ) 
    {
    console.log("dbFindUserByUniqueUserGuid()");

    //Do email SQL injection safe check outside of this function.

    //Requires unique constraint on model.

    let user = await PrismaHelpers.dbGetPrisma().aceUser.findUnique
        (
        { 
        where: { uniqueUserGuid: uniqueUserGuid } 
    
        //Also fetch other tables...
        , include : { ...aceUsersInclude }
        
        });
    if (!user) 
        {
        console.log("dbFindUserByUniqueUserGuid() - user not found.");
        return ( null );
        }

    console.log("dbFindUserByUniqueUserGuid() - user found.");

    return (user);
}
//=================


//See if user by email is in DB
export async function dbGetUserIdFromUniqueUserGuid( uniqueUserGuid ) 
    {
    console.log("dbGetUserIdFromUniqueUserGuid()");

    //Do email SQL injection safe check outside of this function.

    //Requires unique constraint on model.

    let user = await PrismaHelpers.dbGetPrisma().aceUser.findUnique(
        { 
        where: { uniqueUserGuid: uniqueUserGuid } 
    
        //Also fetch other tables...
        , include : { ...aceUsersInclude }
        
        });
    if (!user) 
        {
        console.log("dbGetUserIdFromUniqueUserGuid() - user not found.");
        return ( -1 );
        }

    console.log("dbGetUserIdFromUniqueUserGuid() - user found.");

    return (user.id);
}
//=================


//Need to delete user and all related tables.
//Uses real id, not GUID
export async function dbDeleteUserById( id )
    {
    const user = dbFindUserById( id );
    if ( !user )
        {
        console.log("dbDeleteUserById() - user not found");
        return ( 0 );
        }
    
    console.log("dbDeleteUser() - found user.");

    if ( user.content )
        {
        console.log("dbDeleteUser() - checking content library")
        //ContentLibrary.
        //Get user content library.
        //Delete all courses, based on content library...
        let teachingSvc = await PrismaHelpers.dbGetPrisma().aceTeachingService.delete({ where: { contentLibraryId: user.content.id } });
        let course = await PrismaHelpers.dbGetPrisma().aceCourse.delete({ where: { contentLibraryId: user.content.id } });
            
        //let contentOld = await PrismaHelpers.dbGetPrisma().aceContentLibrary.delete({ where: { userId: id } });
        let contentOld = PrismaHelpers.dbDeleteHelper( "aceContentLibrary", { userId: id } ); 
        }
        

    //Delete Embeded data structures, that may not exist
    //let statsOld = await PrismaHelpers.dbGetPrisma().aceUserStats.delete({ where: { userId: id } });
    let statsOld = PrismaHelpers.dbDeleteHelper( "aceUserStats", { userId: id } ); 

    //let profileOld = await PrismaHelpers.dbGetPrisma().aceUserProfile.delete({ where: { userId: id } });
    let profileOld = PrismaHelpers.dbDeleteHelper( "aceUserProfile", { userId: id } ); 

    //let settingsOld = await PrismaHelpers.dbGetPrisma().aceUserSettings.delete({ where: { userId: id } });
    let settingsOld = PrismaHelpers.dbDeleteHelper( "aceUserSettings", { userId: id } );

    //let payOld = await PrismaHelpers.dbGetPrisma().acePaymentInfo.delete({ where: { userId: id } });
    let paymentInfoOld = PrismaHelpers.dbDeleteHelper( "acePaymentInfo", { userId: id } );

    //Delete array items that may be empty.
    //When I do this in transaction, the whole thing fails.
    //Delete 1 to Many, like array []
    let alerts = await PrismaHelpers.dbGetPrisma().aceUserAlert.deleteMany({ where: { userId: id } });


    //Delete
    /*
    const [_, deletedUser] = await PrismaHelpers.dbGetPrisma().$transaction
        ([
        
        //prisma.aceUserStats.deleteMany({ where: { uniqueUserId: userId } }),
        
        //Delete embedded data structures.

        
        
        //Do I delete all foreign key tables?
    
        //TO DO
        
        ]);
    */

    //Do this at end, so there are no more dependencies.
    //let userOld = await PrismaHelpers.dbGetPrisma().aceUser.delete({ where: { id: id } });
    let userOld = PrismaHelpers.dbDeleteHelper( "aceUser", { id: id } );
    if ( !userOld )
        {
        console.log("dbUserDelete() - did not delete.");            
        return ( -1 );
        }


    /*
    TO DO, Use a transaction.

    But how to handle transactions where rows are not available and entire transaction fails?

    https://www.prisma.io/docs/guides/performance-and-optimization/prisma-client-transactions-guide

    const createUserOperation = prisma.user.create({
        data: {
            email: 'ebony@prisma.io',
        },
        })
        
        const createTeamOperation = prisma.team.create({
        data: {
            name: 'Aurora Adventures',
            members: {
            connect: {
                id: createUserOperation.id, // Not possible, ID not yet available
            },
            },
        },
        })
        
        await prisma.$transaction([createUserOperation, createTeamOperation])

        */
        
    console.log("dbUserDelete() - deleted user successfully.");

    //Success
    return ( 1 );
    }
//=================


//Need to delete user Content and disable user.
//Uses real id, not GUID
export async function dbDeleteContentAndDisableUserById( id )
    {
    const user = dbFindUserById( id );
    if ( !user )
        {
        console.log("user not found");
        return ( -1 );
        }
    
    if ( user.content )
        {
        //ContentLibrary.
        //Get user content library.
        //Delete all courses, based on content library...
        PrismaHelpers.dbGetPrisma().aceTeachingService.delete({ where: { contentLibraryId: user.content.id } });
        PrismaHelpers.dbGetPrisma().aceCourse.delete({ where: { contentLibraryId: user.content.id } });
        }
    PrismaHelpers.dbGetPrisma().aceContentLibrary.delete({ where: { userId: id } });
        
    //Delete Embeded data structures, that may not exist
    PrismaHelpers.dbGetPrisma().aceUserStats.delete({ where: { userId: id } });
    PrismaHelpers.dbGetPrisma().aceUserSettings.delete({ where: { userId: id } });
    
    //ONLY Delete PII, but leave basic name...
    PrismaHelpers.dbGetPrisma().aceUserProfile.delete({ where: { userId: id } });
    
    //Only Delete Current Payment Method like CC #.
    PrismaHelpers.dbGetPrisma().acePaymentInfo.delete({ where: { userId: id } });
    //Do not delete prior payments.

    PrismaHelpers.dbGetPrisma().aceUserAlert.deleteMany({ where: { userId: id } });

    //Update fields...

    // TO DO

    //Update user to be disabled account.

    let userUpdateParams = { deletedStatus: 1 };
    dbUpdateUser( id, userUpdateParams );
    
    //Success
    return ( 0 );
    }


//=================


//=================
//See if user by email is in DB
export async function dbUsersTest() 
    {
    console.log("dbUsersTest() - ===================");
    console.log("dbUsersTest() - START");

    let userGuid = "123456";

    let bDbReady = await PrismaHelpers.dbTestDatabaseAccessAsBool( AceDbHelpers.dbGetTestConnTableName() );
    if ( !bDbReady )
        {
        console.log("dbUsersTest() - db not ready, skipping user tests.");
        return;
        }


    
    //console.log("0a prisma=",PrismaHelpers.prisma );

    //console.log("0b dbGetPrisma()=",PrismaHelpers.dbGetPrisma() );
    //console.log("1a prisma.aceTestConn=",PrismaHelpers.prisma.aceTestConn );
    //console.log("1a2 prisma.aceTestConn.findMany=",PrismaHelpers.prisma.aceTestConn.findMany );


    
    console.log("1b dbGetPrisma().aceTestConn=",PrismaHelpers.dbGetPrisma().aceTestConn );
    
    //ERROR
    //console.log("dbGetPrisma().aceTestConn.findMany=",PrismaHelpers.dbGetPrisma().aceTestConn.findMany );


    //console.log("prisma.aceUser=",PrismaHelpers.dbGetPrisma().aceUser );
    
    //console.log("prisma[\"aceUser\"]=",PrismaHelpers.dbGetPrisma()["aceUser"] );
    
    console.log("find user by Guid");
    let user = await dbFindUserByUniqueUserGuid( userGuid );
    if ( user )
        {
        console.log("found user", user );
        
        console.log("deleting user", user.id);
        let deleteCode = await dbDeleteUserById( user.id );
        
        console.log("deleting user done, code=", deleteCode );
        
        }
    else
        {
        console.log("did not find user.");
        }


    console.log("creating user");
    let email = "auto.test1@test.com";
    let userInfo = {
          email: email
        , name: "first last"
        , passwordPlain: "pass123"
        , uniqueUserGuid: userGuid
        };
    let userCreated = await dbCreateUser( userInfo );
    console.log("created user id=", userCreated.id );
    

    console.log("Find user by email" );
    let userByEmail = await dbFindUserByEmail( email );
    if ( userByEmail )
        {
        console.log("Found user found id=", userCreated.id );
        console.log("user data is=", userByEmail );
        }
    else
        {
        console.log("Did not find user" );
        }

    let updateParams = { notes: "updated notes", emailVerified: 1 };
    let userUpdated = dbUpdateUser( userCreated.id, updateParams );

    console.log("dbUsersTest() - END");
    console.log("dbUsersTest() - ===================");
    
    return (0);
}
//=================


module.exports = {
    dbFindUserByEmail,
    dbCreateUser,
    dbLoginUser,
    dbLogout,
    dbLogoutByGuid,
    dbIsValidPlainPasswordFormat,
    dbDeleteUserById,
    dbDeleteContentAndDisableUserById,
    dbFindUserByUniqueUserGuid,
    dbGetUserIdFromUniqueUserGuid,
    dbUsersTest
    };


//=================
