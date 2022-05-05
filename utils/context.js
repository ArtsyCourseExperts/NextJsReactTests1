


//https://dev.to/debosthefirst/how-to-use-cookies-for-persisting-users-in-nextjs-4617

//Helpers for react-cookies package




/*
Next, we need to setup a function that will check if the cookie exists on the server, parse the cookie and return it. Created a new folder called helpers and within that add an index.js file.

Inside this file, add the following piece of code.
*/


// helpers/index.js

import cookie from "cookie"


//Look in the request object for a cookie.
export function parseCookies(req) 
    {
    return cookie.parse(req ? req.headers.cookie || "" : document.cookie)
    }



