

//JWT in local storage is not recommended.
//Recommended that JWT in HttpOnly cookie or
//REcommended but not practical due to refreshes Browser memory (React State)
//https://medium.com/@ryanchenkie_40935/react-authentication-how-to-store-jwt-in-a-cookie-346519310e81


//https://dev.to/finiam/authenticating-things-with-cookies-on-next-js-1e4l

//https://www.npmjs.com/package/jsonwebtoken


//import { User } from "@prisma/client";
import jwt from "jsonwebtoken";
import { serialize } from "cookie";
//import { NextApiResponse } from "next";
//import prisma from "lib/prisma";
//import { NextApiRequestCookies } from "next/dist/next-server/server/api-utils";
//import { IncomingMessage } from "http";


// You should really not use the fallback and perhaps
// throw an error if this value is not set!
const JWT_TOKEN_KEY = process.env.JWT_TOKEN_KEY;

//=================

let     jwtDefaultCookieName = "auth";

function jwtGetDefaultCookieName()
    {
    return ( jwtDefaultCookieName );
    }
//=================


function jwtSetCookie(
            res,
            jwtCookieName,
            value,
            options
            ) 
    {
    if ( !res )
        {
        console.eror("jwtSetCookie() - No response");
        return ( null );
        }
    
    if ( !jwtCookieName )
        {
        console.eror("jwtSetCookie() - No name");
        return ( null );
        }


    //TO DO protect from bad value & options
    
    const stringValue = typeof value === "object" ? `j:${JSON.stringify(value)}` : String(value);
    
    const cookieAllData = serialize(jwtCookieName, String(stringValue, options));
    
    res.setHeader("Set-Cookie", cookieAllData );

    //Success
    return ( 1 );
    }
//=================


// Create a signed cookie
// This sets/updates/refreshes the cookie on a response so we can use on API request routes.
export function jwtSetSignedCookieEx( res, jwtCookieName, tokenOtherData, jwtSignMoreOptions={}, jwtCookieMoreOptions={} )
    {
    if ( !res )
        {
        console.eror("jwtSetSignedCookieEx() - No response");
        let result = { jwtToken: null, statusSuccess: false, statusNum: -10, statusCode:"noresponse", statusInfo: "no response"};
        return ( result );
        }

    //----

    if ( !JWT_TOKEN_KEY )
        {
        console.eror("jwtSetSignedCookieEx() - No JWT_TOKEN_KEY defined in environment");
        let result = { jwtToken: null, statusSuccess: false, statusNum: -20, statusCode:"notokenkey", statusInfo: "no JWT token env variable."};
        return ( result );
        }

    if ( !jwtCookieName)
        {
        jwtCookieName = jwtDefaultCookieName;
        }
    
    //let tokenKeyName = "email";
    //let tokenKeyValue = "a@tes.com";
    let tokenData = tokenOtherData;
    
    let jwtSignOptions = {};
    jwtSignOptions.expiresIn = "7d";
    //algorithm: "HS256",  //This is the default algorithm.
    //Other options like iss, aud, sub, iat, exp, prm
    jwtSignOptions = { ...jwtSignOptions, ... jwtSignMoreOptions };

    console.log("jwtSetSignedCookieEx() - merged & overwritten sign options=", jwtSignOptions );


    //JWT api
    const cookieToken = jwt.sign(
          tokenData                         //{ email: user.email } 
        , JWT_TOKEN_KEY
        , jwtSignOptions                    //{ expiresIn: "7d", } 
        );
    if ( !cookieToken )
        {
        console.error("jwtSetSignedCookieEx() - couldn't sign jwt cookie.")
        let result = { jwtToken: null, statusSuccess: false, statusNum: -50, statusCode:"errsign", statusInfo: "Error signing cookie"};
    return ( result );
        }
  
    let jwtCookieUpdateOptions = {
        httpOnly: true,                 //This is important for JWT Security.
        maxAge: 60 * 60 * 24 * 7  * 1,  // 7 days
        path: "/",
        sameSite: "Strict",
        secure: process.env.NODE_ENV === "production"
        };
    jwtCookieUpdateOptions = { ...jwtCookieUpdateOptions, ...jwtCookieMoreOptions };

    let errorCode = jwtSetCookie(res, jwtCookieName, cookieToken, jwtCookieUpdateOptions);
    if ( !errorCode )
        {
        console.error("jwtSetSignedCookieEx() - couldn't set jwt cookie.")
        let result = { jwtToken: null, statusSuccess: false, statusNum: -60, statusCode:"errsetcookie", statusInfo: "Error setting cookie"};
    return ( result );
        }

    let result = { jwtToken: cookieToken, statusSuccess: true, statusNum: 1, statusCode:"success", statusInfo: "created signed jwt token"};
    return ( result );
    }
//=================


// This sets/updates/refreshes the cookie on a response so we can use on API request routes.
export function jwtSetSignedCookie( res, jwtCookieName, tokenOtherData )
    {
    if ( !tokenOtherData )
        {
        tokenOtherData = {};
        }
    tokenOtherData[tokenKeyName] = tokenKeyValue;
    
    let result = jwtSetSignedCookieEx( res, jwtCookieName, tokenOtherData );

    return ( result );
    }
//=================


// This sets/updates/refreshes the cookie on a response so we can use on API request routes.
export function jwtSetSignedCookieDays( res, jwtCookieName, tokenOtherData, nDays )
    {
    if ( !tokenOtherData )
        {
        tokenOtherData = {};
        }
    
    if ( nDays === undefined )
        {
        console.warn("jwtSetSignedCookieDays() - Warning, no days parameter specified.")
        nDays = 0;
        }

    //jwtSignOptions.expiresIn = "7d";
    let signOptionsMore = { expiresIn : `${nDays}d` };

    //maxAge: 60 * 60 * 24 * 7  * 1,  // 7 days  
    let cookieOptionsMore = { maxAge: 60 * 60 * 24 * nDays * 1 };
  
    let result = jwtSetSignedCookieEx
                    ( res
                    , jwtCookieName
                    , tokenOtherData 
                    , signOptionsMore 
                    , cookieOptionsMore 
                    );

    return ( result );
    }
//=================


// This sets/updates/refreshes the cookie on a response so we can use on API request routes.
export function jwtAuthenticateUser( res, jwtCookieName, tokenKeyName, tokenKeyValue, tokenOtherData )
    {
    if ( !tokenOtherData )
        {
        tokenOtherData = {};
        }
    tokenOtherData[tokenKeyName] = tokenKeyValue;

    let result = jwtSetSignedCookieEx( res, jwtCookieName, tokenOtherData );

    return ( result );
    }
//=================


//Update something from the payload
//Also potentially extend expiration date.
export function jwtUpdateCookieData( req, res, jwtCookieName, tokenDataModified, nDays )
    {
    //console.log("-----------START");
    console.log("jwtUpdateCookieData()");

    if ( !req )
        {
        console.eror("jwtSetSignedCookieEx() - No request");
        let result = { jwtToken: null, statusSuccess: false, statusNum: -10, statusCode:"noresponse", statusInfo: "no response"};
        return ( result );
        }
    
    if ( !res )
        {
        console.eror("jwtSetSignedCookieEx() - No response");
        let result = { jwtToken: null, statusSuccess: false, statusNum: -10, statusCode:"noresponse", statusInfo: "no response"};
        return ( result );
        }
    
    //----
    
    let jwtToken = jwtGetToken( req, jwtCookieName );
    if (!jwtToken) 
        {
        console.log("jwtUpdateCookieData() - can't get token");
        let result = { jwtToken: null, statusSuccess: false, statusNum: -20, statusCode:"gettoken", statusInfo: "cant get jwt token"};
        return ( result );
        }

    let jwtTokenData = jwtGetTokenDataVerified( req, jwtCookieName );
    if ( !jwtTokenData )
        {
        console.log("jwtUpdateCookieData() - can't get jwt token data verified")
        let result = { jwtToken: null, statusSuccess: false, statusNum: -30, statusCode:"gettokendataerr", statusInfo: "can't get current jwt data"};
        return ( result );
        }

    //console.log("jwtRefresh() - prior token data=", jwtTokenData );
    //console.log("jwtRefresh() - expires=", jwtConvertEpochToUTC( jwtTokenData.exp ) );

    /*
    tokentestparam: 'testcustomtoken',
    fish: 'trout',
    kids: 'yes',
    uniqueUserId: '12345',
    iat: 1648497056,
    exp: 1649101856
    */
    let otherTokenParams = jwtTokenData;

    //Delete these to avoid errors in signing.
    delete otherTokenParams.iat;
    delete otherTokenParams.exp;
    delete otherTokenParams.nbf;
    delete otherTokenParams.jti;

    otherTokenParams = {...otherTokenParams, ...tokenDataModified };
    
    //console.log("jwtRefresh() - otherTokenParams=", otherTokenParams );
    
    //console.log("jwtRefresh() - about to call jwtSetSignedCookieDays()");
    let jwtToken2 = jwtSetSignedCookieDays
        ( res
        , jwtCookieName
        , otherTokenParams
        , nDays
        );
    if ( !jwtToken2 )
        {//Error?
        console.error("jwtRefresh() - Could not create signed jwt cookie");
        let result = { jwtToken: null, statusSuccess: false, statusNum: -40, statusCode:"signcookie", statusInfo: "can't create signed cookie"};
        return ( result );
        }
    //console.log("jwtRefresh() - Done with call jwtSetSignedCookieDays()");

    //console.log("jwtRefresh() - new token is ", jwtToken2 );

    //let jwtToken2Data = jwtParse( jwtToken2 );

    //console.log("jwtRefresh() - new token parsed is ", jwtToken2Data );
    
    //console.log("jwtRefresh() - expires=", jwtConvertEpochToUTC( jwtToken2Data.exp ) );

    //console.log("------------------END" );



    let result = { jwtToken: jwtToken, statusSuccess: true, statusNum: 0, statusCode:"success", statusInfo: "success"};

    return ( result );
    }


//=================


// This resets the auth cookie, preparing to log out the user.
export function jwtClearData( res, jwtCookieName ) 
    {
    if ( !res )
        {
        console.eror("jwtClearData() - No response, so can't set cookie.");
        return ( -1 );
        }

    if ( !jwtCookieName)
        {
        console.warn("jwtClearData() - Using default cookie name.");
        jwtCookieName = jwtDefaultCookieName;
        }

    let jwtCookieToken = "0";
    //Some samples use empty token data like  ''
    //Should I use {}??

    //Some samples use new Date(1)
    const jwtCookieClearOptions = {
        httpOnly: true,               //This is important for JWT Security.
        //maxAge: 1,         // like 1 second
        expires: new Date(0),           
        path: "/",
        sameSite: "Strict",
        secure: process.env.NODE_ENV === "production"
        };

    let errorCode = jwtSetCookie
        ( res
        , jwtCookieName
        , jwtCookieToken            
        , jwtCookieClearOptions
        );
    if ( !errorCode )
        {
        console.error("jwtClearData() - can't set cookie");
        return ( -1 );
        }

    //Success used to be 0 prior to 2022-04-13
    
    //Success
    return ( 1 );
    }
//=================


// This gives back the user behind a given request
// either on API routes or getServerSideProps
export function jwtGetToken( req, jwtCookieName ) 
    {
    console.log("jwtGetToken(), fetching cookiename=", jwtCookieName );
    if ( !req || !req.method )
        {
        console.eror("jwtGetToken() - No request");
        return ( null );
        }

    if ( !jwtCookieName )
        {
        console.error("jwtGetToken() - Invalid cookie name requested");
        return ( null );
        }
    
    console.log("dumping cookies", req.cookies)

    //const { auth } = req.cookies;
    //'access-token'
    let cookieToken = req.cookies[jwtCookieName];
    //console.log("cookies found include", req.cookies);
    
    if (!cookieToken) 
        {
        console.log("jwtGetToken() - desired jwt cookie name=" + jwtCookieName + " not found");
        return undefined;
        //app should return 
        //  return res.status(400).json({error: 'User not authenticated!'})
        }

    return ( cookieToken );
    }
//=================


// This returns the token data.
// Use this on API routes or getServerSideProps (currently not working)
export function jwtGetTokenDataVerified( req, jwtCookieName ) 
    {
    console.log("jwtGetTokenDataVerified()");

    let token = jwtGetToken( req, jwtCookieName );
    if (!token) 
        {
        console.log("jwtGetTokenDataVerified() - desired jwt cookie not found");
        
        //Maybe this is helpful.                
        req.authenticated = false;
        
        return undefined;
        //app should return 
        //  return res.status(400).json({error: 'User not authenticated!'})
        }
    console.log("jwtGetTokenDataVerified() - found token value =", token );

    if ( !JWT_TOKEN_KEY )
        {
        console.eror("jwtGetTokenDataVerified() - No JWT_TOKEN_KEY defined in environment");
        
        //Maybe this is helpful.                
        req.authenticated = false;
        
        return (null);
        }
    
    console.log("jwtGetTokenDataVerified() - token is =", token );
    
    console.log("jwtGetTokenDataVerified() - token len is =", token.length );
    
    if ( token.length <= 1 )
        {//Handle case where token is blank or 0 or {0}
        console.log("jwtGetTokenDataVerified() - No valid JWT token right now, maybe deleted/cleared.");
        
        //Maybe this is helpful.                
        req.authenticated = false;
        
        return  (null);
        }
    
    let jwtTokenData = null;
    try {
        //Verify integrity of token.
        //ALSO checks for expiration.
        jwtTokenData = jwt.verify(token, JWT_TOKEN_KEY);
        if (!jwtTokenData) 
            {
            console.log("jwtGetTokenDataVerified() - verify failed, no jwt token.");
            return undefined;
            //return some status(400)...
            }

        } 
    catch (error) 
        {
        console.error( "jwtGetTokenDataVerified(), jwt.verify exception" );
        return undefined;
        }

    
    console.log("jwtGetTokenDataVerified(), got jwt data=", jwtTokenData );
        
    //No need to check the exp(ired) field, since this is part of verify function.
    //let isExpired = jwtIsEpochSecondsExpired( jwtTokenData.exp );
    //console.log( "jwtGetTokenDataVerified() - is expired?", isExpired );
    //console.log( "jwtGetTokenDataVerified() - now=", jwtGetEpochSeconds() );

    //Maybe this is helpful.                
    req.authenticated = true;

    //For now this is just going to be JWT data, not database data.
    return ( jwtTokenData );
    }
//=================


//Pass in full token, returns raw token data.  (not verified)
//It will extract the data inside a jwt token and will return an object
//Pass in the full token text like eyJhbGciOi...
function jwtParse( jwtToken ) 
    {
    console.log("jwtParse()");
    
    if ( !jwtToken ) 
        { 
        console.error("jwtParse() - No token parameter passed");
        return ( null ); 
        }
    
    if ( jwtToken.length < 10 ) 
        { //What this is way too small for a token???
        console.error("jwtParse() - Invalid token passed");
        return ( null ); 
        }
    
    let tokenPartsRaw = jwtToken.split('.');
    if ( !tokenPartsRaw || (tokenPartsRaw.length < 2 ) )
        {//Bad format?
        console.error("jwtParse() - Invalid token data parts");
        return ( null );
        }
    
    let base64Url = tokenPartsRaw[1];
    if ( !base64Url ) 
        { //What this is way too small for a token???
        console.error("jwtParse() - Invalid token data");
        return ( null ); 
        }
    
    const base64 = base64Url.replace('-', '+').replace('_', '/');
    
    //Ascii to binary
    //let atobdata = window.atob(base64);
    //let atobdata = atob(base64);
    let atobdata = Buffer.from(base64, 'base64').toString('binary')

    let jwtTokenDataObject = JSON.parse( atobdata );

    //Not this input and the internal parts are not encrypted, just encoded.

    //Returns internal data parts as an object.    
    //{uniqueUserId: '12345', iat: 1646576888, exp: 1647181688}
    return (jwtTokenDataObject);
    }
//=================


//Refresh a token for a few more days.  Maybe after password entry.
//More info at https://gist.github.com/ziluvatar/a3feb505c4c0ec37059054537b38fc48
function jwtRefresh( req, res, jwtCookieName, nDays ) 
    {    
    //console.log("-----------START");
    console.log("jwtRefresh()");

    //Check for other parameters..

    //TO DO

    let jwtToken = jwtGetToken( req, jwtCookieName );
    if (!jwtToken) 
        {
        console.log("jwtRefresh() - can't get token");
        let result = { jwtToken: null, statusSuccess: false, statusNum: -20, statusCode:"gettoken", statusInfo: "cant get jwt token"};
        return ( result );
        }

    let jwtTokenData = jwtGetTokenDataVerified( req, jwtCookieName );
    if ( !jwtTokenData )
        {
        console.log("jwtRefresh() - can't get jwt token data verified")
        let result = { jwtToken: null, statusSuccess: false, statusNum: -30, statusCode:"gettokendataerr", statusInfo: "can't get current jwt data"};
        return ( result );
        }

    //console.log("jwtRefresh() - prior token data=", jwtTokenData );
    //console.log("jwtRefresh() - expires=", jwtConvertEpochToUTC( jwtTokenData.exp ) );

    /*
    tokentestparam: 'testcustomtoken',
    fish: 'trout',
    kids: 'yes',
    uniqueUserId: '12345',
    iat: 1648497056,
    exp: 1649101856
    */
    let otherTokenParams = jwtTokenData;

    //Delete these to avoid errors in signing.
    delete otherTokenParams.iat;
    delete otherTokenParams.exp;
    delete otherTokenParams.nbf;
    delete otherTokenParams.jti;
    
    //console.log("jwtRefresh() - otherTokenParams=", otherTokenParams );
    
    //console.log("jwtRefresh() - about to call jwtSetSignedCookieDays()");
    let jwtToken2 = jwtSetSignedCookieDays
        ( res
        , jwtCookieName
        , otherTokenParams
        , nDays
        );
    if ( !jwtToken2 )
        {//Error?
        console.error("jwtRefresh() - Could not create signed jwt cookie");
        let result = { jwtToken: null, statusSuccess: false, statusNum: -40, statusCode:"signcookie", statusInfo: "can't create signed cookie"};
        return ( result );
        }
    //console.log("jwtRefresh() - Done with call jwtSetSignedCookieDays()");

    //console.log("jwtRefresh() - new token is ", jwtToken2 );

    //let jwtToken2Data = jwtParse( jwtToken2 );

    //console.log("jwtRefresh() - new token parsed is ", jwtToken2Data );
    
    //console.log("jwtRefresh() - expires=", jwtConvertEpochToUTC( jwtToken2Data.exp ) );

    //console.log("------------------END" );



    let result = { jwtToken: jwtToken, statusSuccess: true, statusNum: 0, statusCode:"success", statusInfo: "success"};

    return ( result );
    }
//=================



//https://jwt.io/
//Enter a token and shows internal data.

//https://jwt.io/#debugger-io?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c

//================

/*
iat=issued at.

exp = expires time

 iat: 1648172814,
  exp: 1648777614

*/

//Convert 12345678 to 2018-03-28T04:10:28.000Z
//This works on backend and frontend
export function jwtConvertEpochToUTC( value )
    {
    const d = new Date(0);
    d.setUTCSeconds( value );
    //console.log(d);
    return ( d );
    }
//================

//Get now
export function jwtGetEpochSeconds()
    {
    let d = (Math.floor((new Date).getTime() / 1000));
    //d = d / 1000;
    return ( d );
    }
//================


export function jwtIsEpochSecondsExpired( value )
    {
    let isExpired = Date.now() >= value * 1000;
    return ( isExpired );
    }
//================


export function jwtTest1()
    {
    return ( 0 );
    }
//=================



module.exports = {
      jwtTest1
    , jwtGetDefaultCookieName
    , jwtClearData
    , jwtSetSignedCookie
    , jwtSetSignedCookieDays
    , jwtSetSignedCookieEx
    , jwtAuthenticateUser
    , jwtSetCookie
    , jwtRefresh
    , jwtGetToken 
    , jwtGetTokenDataVerified
    , jwtParse
    , jwtConvertEpochToUTC
    , jwtGetEpochSeconds
    , jwtIsEpochSecondsExpired
    };

