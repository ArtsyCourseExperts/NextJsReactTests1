/*

//Below comes from Vercel NextJS examples
https://github.com/vercel/next.js/blob/master/examples/api-routes-middleware/package.json


//Other options.
https://dev.to/debosthefirst/how-to-use-cookies-for-persisting-users-in-nextjs-4617
To use cookies in NextJS, cookie and react-cookie. 

 "dependencies": {
    "cookie": "0.4.0",
    "swr": "0.1.18"


    "next": "latest",
    "react": "^17.0.2",
    "react-dom": "^17.0.2",
    
  },

//The name “SWR” is derived from stale-while-revalidate , a cache invalidation strategy popularized by HTTP RFC 5861

//This file in sample was located in /utils/cookies.js
//Note that it is different from /pages/api/cookies.js 

https://nextjs.org/docs/api-routes/api-middlewares

*/

//import { serialize } from 'cookie'
import { serialize, CookieSerializeOptions } from 'cookie'
import { NextApiResponse } from 'next'

//=================


export function getCookie( req, name ) 
    {
    let cookie = getCookieFromCookies( req.cookies, name );

    return ( cookie );
    }
//=================


export function getCookieFromCookies( cookies, name ) 
    {
    let cookie = cookies[name];

    return ( cookie );
    }
//=================


/**
 * This sets `cookie` on `res` object
 * 
 * This function sets or deletes a cookie, depending on whether the value argument is empty, by serializing it and pushing it to our res.cookieArray.
 * 
 */
export function setCookie(res, name, value, options ) 
    {
    if (!options) 
        {
        options = {};       //Technically CookieSerializeOptions
        }
    options.path = '/';

    const stringValue = 
        typeof value === "object" ? `j:${JSON.stringify(value)}` : String(value);
        //typeof value === 'object' ? 'j:' + JSON.stringify(value) : String(value)
        
    if ('maxAge' in options) 
        {
        options.expires = new Date(Date.now() + options.maxAge)
        options.maxAge /= 1000
        }

    //Seen on one example, seems ok.
    //https://javascript.plainenglish.io/next-js-using-cookies-in-getserversideprops-89c03a216b0b
    //if (!value) 
    //    {
    //    options.expires = new Date( Date.now() - 1000 );
    //    };
    
    res.setHeader('Set-Cookie', serialize(name, String(stringValue), options))
    }
//=================


//Helper to delete a cookie.  Maybe useful if user logs out.
//This would delete the entire cookie and all values.
export function deleteCookie(res, name, options ) 
    {
    setCookie( res, name, '', options );
    }
//=================


/**
 * Adds `cookie` function on `res.cookie` to set cookies for response
 * 
 *  res.cookie('Next.js', 'This-is-my-cookie-value');
 * 
 */
const cookies = (handler) => (req, res) => 
    {
    
    //Creates specific cookie api from above.
    //res.cookie = (name, value, options) => cookie(res, name, value, options)
    res.setCookie = (name, value, options) => setCookie(res, name, value, options);

    //Helper function
    res.deleteCookie = (name, options) => deleteCookie(res, name, options);

    return handler(req, res)
    }
//=================


function getCookieDefaultOptions( optionalFields ) 
    {
    let options = {};

    if ( !optionalFields )
        {
        options = { ...optionalFields };
        }

    options.path = '/';
        
    //When a server sends a cookie without setting its Expires or Max-Age, browsers treat it as a session cookie: 

    //Automatically deleted after this time in seconds.
    //3600 is 1 hr
    //2 weeks is 60 x 60 x 24
    
    let days = 30;
    if ( options.days )
        {
        days = options.days;
        delete option.days;
        }
    if ( !options.maxAge )
        {
        options.maxAge = 60 * 60 * 24 * days;
        }
    
    //Automatically delted after this date
    options.expires = new Date(Date.now() + options.maxAge);
    
    //Why this?  prevents the cookie from being sent in cross-site requests
    //Send for    Same-site connections only
    //This is experimental
    options.sameSite = true;

    //Not using HTTP only since.. this means only access from a server..
    //Accessible to script=Yes
    //By default the content of cookies can be read via JavaScript.

    return ( options );
    }
//=================


function getCookieDefaultOptions30Days() 
    {
    let options = getCookieDefaultOptions( {days:30} );
    return ( options );
    }

//=================

module.exports = {
    cookies, 
    getCookie, 
    getCookieFromCookies, 
    setCookie,
    deleteCookie,
    //getCookieName,
    getCookieDefaultOptions
    };
