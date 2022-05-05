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
    
    const userId = await login(req.body);
    
    //const user = { name:"angel", email:"a@test.com"};
    
    if (userId) 
        {
        //authenticateUser(res, user);

        jwtHelpers.jwtAuthenticateUser
            ( jwtHelpersAce.jwtGetCookieName()
            , res
            , jwtHelpersAce.jwtGetKeyFieldName()
            , userId
            , null 
            );

        //Return full user profile.
        res.json(user);
        } 
    else 
        {
        res.status(404).send("");
        }
}

