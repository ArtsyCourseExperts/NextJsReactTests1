//https://dev.to/finiam/authenticating-things-with-cookies-on-next-js-1e4l

//sessions
//POST - logs in a user with a email/password combo
//DELETE - logs out the user

//import { NextApiRequest, NextApiResponse } from "next";
//import { login } from "lib/auth";
//import { authenticateUser, clearUser } from "root/web/tokens";
//import defaultHandler from "./_defaultHandler";

//const handler = defaultHandler<NextApiRequest, NextApiResponse>()

import jwtHelpers from "/utils/cookies/jwt-helpers";
import jwtHelpersAce from "/src/cookies/jwt-helpers-ace";

export default function handler(req, res) {
    
    console.log("/api/cookies/jwt-read.js" );

    if (req.method != 'POST') 
        {//Only accepting POST
        //Dont tell them why...
        res.status(405).send("");
        return
        }
        
    let jwtToken = jwtHelpers.jwtGetToken( req, jwtHelpersAce.jwtGetCookieName() );
    if (!jwtToken) 
        {
        console.log("jwtGetTokenDataVerified() - desired jwt cookie NOT found");
        //Never signed up, or never logged in.
        console.log("/api/cookies/jwt-read.js - error no JWT token or not valid anymore.")
        let result = { jwtToken: null, statusSuccess: false, statusNum: -10, statusCode:"nojwttoken", statusInfo: "no JWT cookie found", message:"Please signup or login." };
        res.json(result);
        return;
        }

    jwtToken = jwtHelpers.jwtGetTokenDataVerified( req, jwtHelpersAce.jwtGetCookieName() );
    if ( !jwtToken )
        {
        console.log("/api/cookies/jwt-read.js - error no JWT token or not valid anymore.")
        let result = { jwtToken:null, statusSuccess: false, statusNum: -20, statusCode:"novalidjwttoken", statusInfo:"JWT cookie could not get parsed or old", message:"Please login again." };
        res.json(result);
        return;
        }

    //Return full user profile.
    //console.log("/api/test/jwt-read.js - about to return jwttoken=", jwtToken );
    
    //jwtToken = "TEST RESPONSE";
    //jwtToken = {"uniqueUserId": '12345', "iat": 1646524425, "exp": 1647129225};
    //{uniqueUserId: '12345', iat: 1646524425, exp: 1647129225}

    let result = 
        { jwtToken: jwtToken
        , statusSuccess: true, statusNum: 1, statusCode:"success", statusInfo: "success reading valid jwt."};
    
    res.json(result);
}

