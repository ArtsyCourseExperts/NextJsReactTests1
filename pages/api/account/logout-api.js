import jwtHelpers from "/utils/cookies/jwt-helpers";
import jwtHelpersAce from "/src/cookies/jwt-helpers-ace";
import AceAccountHelpers from '/src/account/ace-account-helpers';
import AceDbHelpers from '/src/db/ace-db-users';
import SqlInjectionHelpers from '/utils/db/sql-injection-helpers.js'


export default async function handler(req, res) {
    
    console.log("logout-api.js");

    if (req.method != 'POST') 
        {//Only accepting POST
        //Don't reveal too much info.
        console.log("logout-api.js - method not post");
        let results = { statusSuccess: false, statusNum: -10, statusCode:"private", statusInfo:"private"};
        res.status(405).json(results);  
        return;
        }
        
    let reqPayload = req.body;
    console.log("logout-api.js - payload=", reqPayload );

    //----

    if ( ! SqlInjectionHelpers.hasSafeText( JSON.stringify( reqPayload ) ) )
        {
        console.log("logout-api.js - BAD DATA ???")
        let results = { statusSuccess: false, statusNum: -22, statusCode:"hack", statusInfo:"Hack params."};
        res.status(500).json(results); 
        return;
        }
    console.log("logout-api.js - hasSafeText() pass" );
    //----

    //Update global variables... somehow to update _app.js authenticatedXYZ values.
    //Maybe using subscribe to changes..
    
    //TO DO 



    //----

    //Need to update Header component so it doesn't say Logout, maybe Login instead.

    //Maybe this is handled after logout redirect or Reload?

    //Or maybe I set a global session local variable.
    
    //----

    //Remove JWT
    //Regardless of User GUID or not.
    console.log("logout-api.js - about to call jwtClearData()");
    let clearCode = jwtHelpers.jwtClearData( res, jwtHelpersAce.jwtGetCookieName() );
    //If there is a problem, fail later...
    console.log("logout-api.js - done with call jwtClearData() clearCode=",clearCode );

    //----

    console.log("logout-api.js - about to check authenticatedUserGuid");
    let authenticatedUserGuid = reqPayload[ AceAccountHelpers.getAccountApiGuidParamName() ];
    if ( !authenticatedUserGuid || authenticatedUserGuid.length <= 1 )
        {
        console.log("logout-api.js - no authenticatedUserGuid")
        let results = { statusSuccess: true, statusNum: 2, statusCode:"successNoUserId", statusInfo:"Not logged in."};
        //Not really an internal error, just not logged in.
        res.json(results);   
        return;
        }        

    //----

    //Update Database.
    console.log("logout-api.js - about to AceDbHelpers.dbLogoutByGuid()");
    let dbLogoutResults = await AceDbHelpers.dbLogoutByGuid( authenticatedUserGuid );
    //let result = { data: null, statusSuccess: false, statusNum: -100, statusCode:"invaliduserguid", statusInfo: "invalid Guid user id"};
    
    //-----

    console.log("logout-api.js - about to process any errors.");

    
    console.log("logout-api.js - checking clear jwt errors...");
    //Late check for all failures.
    if ( !clearCode || clearCode < 0 )
        {//Error
        console.log("logout-api did have JWT error");
        let results = { statusSuccess: false, statusNum: -31, statusCode:"errorjwt", statusInfo:"Failed to delete or reset JWT cookie."};
        res.status(500).json(results);
        return;
        }

    //Late check for all failures.
    console.log("logout-api.js - checking db errors...");

    console.log("logout-api.js - checking db errors... =",dbLogoutResults );


    if ( !dbLogoutResults || ( dbLogoutResults && false == dbLogoutResults.statusSuccess ) )
        {//Error
        console.log("logout-api returning db error");
        let results = { statusSuccess: false, statusNum: -41, statusCode:"errordb", statusInfo:"Failed to updated database."};
        res.status(500).json(results);
        return;
        }
    
    console.log("logout-api.js - looks good...");
    //Return full user profile.
    let results = { statusSuccess: true, statusNum: 1, statusCode:"success", statusInfo:"Logged out successfully."};
    res.json(results);
    }

