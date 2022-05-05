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
import jwtHelpersAce from "/utils/ace/cookies/jwt-helpers-ace";

export default function handler(req, res) {
    
    //res.status(200).json({ name: 'Hi there!' })
    
    let reqPayload = req.body;
    let userId = reqPayload[ jwtHelpersAce.jwtGetKeyFieldName() ];

    console.log("/api/test/jwt-modify.js - payload=", reqPayload );
    console.log("/api/test/jwt-modify.js - userId=", userId);
    
    //const userId = await login(req.body);
    //const user = { name:"angel", email:"a@test.com"};
    
    if (userId) 
        {
        //authenticateUser(res, user);

        let jwtToken = jwtHelpers.jwtUpdateCookieData
            ( req
            , res
            , jwtHelpersAce.jwtGetCookieName()
            , "fish"
            , "salmon"
            );

        //Return full user profile.
        console.log("/api/test/jwt-modify.js - about to return jwttoken=", jwtToken );
        res.json(jwtToken);
        } 
    else 
        {
        res.status(404).send("");
        }
}

