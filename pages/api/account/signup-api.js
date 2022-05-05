import jwtHelpers from "/utils/cookies/jwt-helpers";
import jwtHelpersAce from "/src/cookies/jwt-helpers-ace";
import aceDbHelpers from "/src/db/ace-db-helpers"
import SqlInjectionHelpers from "/utils/db/sql-injection-helpers";


export default function handler(req, res) {
    
    console.log("signup-api.js");

    if (req.method != 'POST') 
        {//Only accepting POST
        //Don't reveal too much info.
        console.log("signup-api.js - method not post");
        let results = { statusSuccess: false, statusNum: -10, statusCode:"private", statusInfo:"private"};
        res.status(405).json(results); 
        return;
        }

    let reqPayload = req.body;
    console.log("signup-api.js - payload=", reqPayload );

    //-----

    //Check parameters...
    if ( !reqPayload.name )
        {
        let results = { statusSuccess: false, statusNum: -25, statusCode:"errname", statusInfo:"Invalid name."};
        res.status(400).json(results); 
        }

    if ( !reqPayload.email )
        {
        let results = { statusSuccess: false, statusNum: -21, statusCode:"erremail", statusInfo:"Invalid email."};
        res.status(400).json(results); 
        }

    if ( ! SqlInjectionHelpers.hasSafeEmail( reqPayload.email ) )
        {
        let results = { statusSuccess: false, statusNum: -22, statusCode:"hackemail", statusInfo:"Hack email."};
        res.status(500).json(results); 
        }

    if ( !reqPayload.passwordPlain )
        {
        let results = { statusSuccess: false, statusNum: -23, statusCode:"errpassword", statusInfo:"Invalid password."};
        res.status(400).json(results); 
        }

    if ( ! SqlInjectionHelpers.hasSafeText( JSON.stringify( reqPayload ) ) )
        {
        let results = { statusSuccess: false, statusNum: -24, statusCode:"hack", statusInfo:"Hack email."};
        res.status(500).json(results); 
        }
    
    //----

    // * * * TEMP? * * * 
    
    let dbWorking = aceDbHelpers.isDbConnWorking();
    if ( !dbWorking )
        {
        let results = { statusSuccess: false, statusNum: -41, statusCode:"errdb", statusInfo:"database err."};
        res.status(500).json( results );
        return;
        }

    let aceUser = findUserByEmail( req.body.email );
    if ( aceUser )
        {//User already found.
        //Generic err, dont reveal user exists..
        let results = { statusSuccess: false, statusNum: -31, statusCode:"errlogin", statusInfo:"Login error."};
        res.status(403).json( results );
        return;
        }    
    
    let params = 
        { email: reqPayload.password
        , name: reqPayload.name
        , passwordPlain: reqPayload.password
        };
    aceUser = aceDbHelpers.dbCreateUser( params );
    if ( !aceUser )
        {//Failed to create user
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

    //Update globals for componentes like header?

    //Maybe handled after I redirect.

    //----

    //Signup success
    let results = { statusSuccess: true, statusNum: 1, statusCode:"success", statusInfo:"Signed in successfully."};
    res.json(results);

    }
