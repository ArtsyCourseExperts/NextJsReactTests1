

import jwtHelpers from "/utils/cookies/jwt-helpers";
import jwtHelpersAce from "/src/cookies/jwt-helpers-ace";

//=================

export default function handler(req, res) 
    {
    if (req.method != 'POST') 
        {//Only accepting POST
        //Dont tell them why...
        res.status(405).send("");
        return
        }
    //res.status(200).json({ name: 'Hi there!' })
    
    jwtHelpers.jwtRefresh
        ( req
        , res
        , jwtHelpersAce.jwtGetCookieName() 
        , jwtHelpersAce.jwtGetCookieDays() 
        ); 

    

    res.send("ok");
    return;


    let reqPayload = req.body;
    
    console.log("/api/cookies/jwt-create-update.js - payload=", reqPayload );
    
    let jwtToken = jwtHelpers.jwtGetToken( req, jwtHelpersAce.jwtGetCookieName() );
    if (!jwtToken) 
        {
        console.log("jwtGetTokenDataVerified() - desired jwt cookie NOT found");
        //Never signed up, or never logged in.
        console.log("/api/cookies/jwt-refresh.js - error no JWT token or not valid anymore.")
        let result = { jwtToken: null, statusSuccess: false, statusNum: -10, statusCode:"nojwttoken", statusInfo: "no JWT cookie found", message:"" };
        res.json(result);
        return;
        }

    jwtToken = jwtHelpers.jwtGetTokenDataVerified( req, jwtHelpersAce.jwtGetCookieName() );
    if ( !jwtToken )
        {
        console.log("/api/cookies/jwt-refresh.js - error no JWT token or not valid anymore.")
        let result = { jwtToken:null, statusSuccess: false, statusNum: -20, statusCode:"novalidjwttoken", statusInfo:"JWT cookie could not get parsed or old", message:"Please login again." };
        res.json(result);
        return;
        }
    
    /*
    let userId = reqPayload[ jwtHelpersAce.jwtGetKeyFieldName() ];
    console.log("/api/cookies/jwt-create-update.js - userId=", userId);
    //const userId = await login(req.body);
    //const user = { name:"angel", email:"a@test.com"};
    if ( !userId )
        {
        let result = { jwtToken:null, statusSuccess: false, statusNum: -1, statusCode:"NoUserId", statusInfo: "no user ID provided"};
        //res.json(jwtToken);
        res.status(500).json(result);
        return;
        }
    */

    let tokenParts = JwtHelpers.jwtParse( jwtToken.data );


    //App specific params
    let otherTokenParams = reqPayload.otherTokenParams;


    /*
    //Main key for session id.
    otherTokenParams[jwtHelpersAce.jwtGetKeyFieldName()] = userId;
    
    let jwtToken = jwtHelpers.jwtSetSignedCookieDays
        ( res
        , jwtHelpersAce.jwtGetCookieName()
        , otherTokenParams
        , 7     //Refresh for another 7 days.
        );
    if ( !jwtToken )
        {//Error?
        console.error("/api/cookies/jwt-create-update.js - Could not create signed jwt cookie");
        let result = { jwtToken:null, statusSuccess: false, statusNum: -10, statusCode:"JwtSignErr", statusInfo: "Could not create "};
        res.status(500).json(result);
        return;
        }

    console.log("/api/cookies/jwt-create-update.js - about to return jwttoken=", jwtToken );
    
    */

    let result = 
        { jwtToken:jwtToken
        , statusSuccess: true, statusNum: 1, statusCode:"success", statusInfo: "created and sent jwt token."};
    
    res.json( result );
    return;
    }
//=================

