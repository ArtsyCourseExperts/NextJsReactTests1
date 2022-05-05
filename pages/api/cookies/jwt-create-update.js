//https://dev.to/finiam/authenticating-things-with-cookies-on-next-js-1e4l

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
    
    let reqPayload = req.body;
    
    console.log("/api/cookies/jwt-create-update.js - payload=", reqPayload );

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
    
    //App specific params
    let otherTokenParams = reqPayload.otherTokenParams;

    //Main key for session id.
    otherTokenParams[jwtHelpersAce.jwtGetKeyFieldName()] = userId;
    
    let jwtToken = jwtHelpers.jwtSetSignedCookieDays
        ( res
        , jwtHelpersAce.jwtGetCookieName()
        , otherTokenParams
        , jwtHelpersAce.jwtGetCookieDays()
        );
    if ( !jwtToken )
        {//Error?
        console.error("/api/cookies/jwt-create-update.js - Could not create signed jwt cookie");
        let result = { jwtToken:null, statusSuccess: false, statusNum: -10, statusCode:"JwtSignErr", statusInfo: "Could not create "};
        res.status(500).json(result);
        return;
        }

    console.log("/api/cookies/jwt-create-update.js - about to return jwttoken=", jwtToken );
    
    let result = 
        { jwtToken:jwtToken
        , statusSuccess: true, statusNum: 1, statusCode:"success", statusInfo: "created and sent jwt token."};
    
    res.json( result );
    return;
    }
//=================

