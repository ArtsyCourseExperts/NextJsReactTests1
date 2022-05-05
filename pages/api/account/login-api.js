import jwtHelpers from "/utils/cookies/jwt-helpers";
import jwtHelpersAce from "/utils/ace/cookies/jwt-helpers-ace";
import SqlInjectionHelpers from "/utils/db/sql-injection-helpers";


export default function handler(req, res) {
    
    if (req.method != 'POST') 
        {//Only accepting POST
        //Don't reveal too much info.
        console.log("login-api.js - method not post");
        let results = { statusSuccess: false, statusNum: -10, statusCode:"private", statusInfo:"private"};
        res.status(405).json(results);  
        return;
        }

    let reqPayload = req.body;
    console.log("login-api.js - payload=", reqPayload );

    //----
        
    //Check parameters...
    if ( !reqPayload.email )
        {
        let results = { statusSuccess: false, statusNum: -21, statusCode:"erremail", statusInfo:"Invalid email."};
        res.status(400).json(results); 
        }

    if ( ! SqlInjectionHelpers.hasSafeEmail( reqPaylod.email ) )
        {
        let results = { statusSuccess: false, statusNum: -22, statusCode:"hackemail", statusInfo:"Hack email."};
        res.status(500).json(results); 
        }

    if ( !reqPayload.password )
        {
        let results = { statusSuccess: false, statusNum: -23, statusCode:"errpassword", statusInfo:"Invalid password."};
        res.status(400).json(results); 
        }

    if ( ! SqlInjectionHelpers.hasSafeText( JSON.stringify( reqPaylod ) ) )
        {
        let results = { statusSuccess: false, statusNum: -24, statusCode:"hack", statusInfo:"Hack data."};
        res.status(500).json(results); 
        }
    
    //----

    const aceUser = await dbLoginUser( reqPaylod.email, reqPayload.password );
    if ( !aceUser )
        {//Failed to login...
        let results = { statusSuccess: false, statusNum: -31, statusCode:"loginerrapierror1", statusInfo:"Login error."};
        res.status(500).json(results); 
        }

    let uniqueUserGuid = aceUser.uniqueUserGuid;

    //----

    let jwtResult = jwtHelpers.jwtAuthenticateUser
        ( res
        , jwtHelpersAce.jwtGetCookieName()
        , jwtHelpersAce.jwtGetKeyFieldName()
        , uniqueUserGuid
        , null 
        );
    if ( !jwtResult || jwtResult.statusSuccess )
        {//Error
        //let result = { jwtToken: cookieToken, statusSuccess: true, statusNum: 1, statusCode:"success", statusInfo: "created signed jwt token"};
        let results = { statusSuccess: false, statusNum: -41, statusCode:"jwterror", statusInfo:"Could not create signed jwt token."};
        res.status(500).json(results); 
        }

    //----

    //Set global values for components?
    //Or maybe this is handled after redirect.

    //Or maybe I set a global session local variable.

    //----

    //Login success
    let results = { statusSuccess: true, statusNum: 1, statusCode:"success", statusInfo:"Logged in successfully."};
    res.json(results);
    }
