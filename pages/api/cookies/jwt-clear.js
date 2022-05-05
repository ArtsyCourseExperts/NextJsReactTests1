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

export default function handler(req, res) 
    {
    console.log("/api/cookies/jwt-clear.js" );

    if (req.method != 'POST') 
        {//Only accepting POST
        //Dont tell them why...
        res.status(405).send("");
        return
        }
    
    let jwtToken = jwtHelpers.jwtGetToken( req, jwtHelpersAce.jwtGetCookieName() );
    if (!jwtToken) 
        {
        console.log("/api/cookies/jwt-clear.js() - no JWT token found");
        jwtToken = { statusSuccess: true, statusNum: 1, statusCode:"nojwttoken", statusInfo:"No jwt cookie found."};
        res.json(jwtToken);
        return;
        }
    
    let clearCode = jwtHelpers.jwtClearData( res, jwtHelpersAce.jwtGetCookieName() );
    if ( !clearCode || clearCode < 0 )
        {//Error
        jwtToken = { statusSuccess: false, statusNum: -1, statusCode:"error", statusInfo:"Failed to delete/reset JWT cookie."};
        res.json(jwtToken);
        res.status(500).json(jwtToken);
        return;
        }

    console.log("/api/cookies/jwt-clear.js - success" );
    
    let response = { statusSuccess: true, statusNum: 2, statusCode:"success", statusInfo:"reset or cleared jwt cookie." };
    
    res.json(response);
    return;
    }


