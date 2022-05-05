/*

//Using cookie-react

//https://dev.to/debosthefirst/how-to-use-cookies-for-persisting-users-in-nextjs-4617

*/


// helpers/index.js

import cookie from "cookie"

import { useCookies } from "react-cookie"
//import CookiesAce from "/utils/cookies/cookies-ace"

//export 

//The function accepts a request object and checks the request headers to find the cookie stored.
function parseCookies(req) 
    {
    return cookie.parse(req ? req.headers.cookie || "" : document.cookie);
    }



function getCookieValue( name ) {
    console.log("getCookieValue()");
    console.log("getCookieValue(), param=",name);
    
    const [cookies] = useCookies([ name ]);
    //console.log("cookies=", cookies );

    //console.log("all values are"+cookies);
    
    //https://www.npmjs.com/package/react-cookie
    let value = cookies[ name ]; //get( CookiesAce.getCookieNameForTest(), {} );
    
    //console.log("value=", value );

    return ( value );
    }


module.exports = {
    parseCookies,
    getCookieValue
    //, 
    //getCookieName
    };

