// pages/_middleware.ts
/*
https://nextjs.org/docs/middleware

If your Middleware is created in /pages/_middleware.ts, it will run on all routes within the /pages directory.
*/

//import type { NextFetchEvent, NextRequest } from 'next/server'
import { NextResponse, NextRequest } from 'next/server'

//import logger from '/utils/file/pino-helpers';

import MiddlewareHelpers from '/utils/file/middleware-helpers.js'
import NetBadHelpers from '/utils/net/net-bad-helpers.js'

//=================

export function middleware(req: NextRequest, ev: NextResponse) 
    {
    //let dtNow =  new Date();
    //console.log("middleware() ----"+ dtNow.toISOString());
    //console.log("middleware() ----");
    
    //console.log("middleware() req=", req);
    
    let pathName = req.nextUrl.href;
    //console.log("_middleware raw nextUrl=", pathName );
    
    
    pathName = MiddlewareHelpers.removeServerProtocolAddressPort( pathName );
    console.log("_middleware processed nextUrl=", pathName );

    //----
    
    //Filter bad countries?
    
    let country = req.geo.country;
    country = "US";
    
    //console.log(`country=${country} type=${typeof(country)}`  );
    
    if ( country )
        {
        //console.log("Got country");
        country = country.toUpperCase();

        //let countriesBlocked = ['AA', 'IR', 'IQ', 'US' ];    

        let countriesBlockedText = process.env.COUNTRIES_BLOCKED; 
        //COUNTRIES_BLOCKED = AA, IR, US, IQ    
        let countriesBlocked = countriesBlockedText.split( "," );
        countriesBlocked = countriesBlocked.map( item => { return item.trim() });
        //console.log("blocked array =", countriesBlocked );

        // If visited from Denmark
        if (  countriesBlocked.some( item => item == country ) || (country == 'IQ')  ) 
            {
            console.log("blocked request from country ", country );
            //Not authorized, denied.
            return new Response(null, { status: 403 });
            }
        }

    //----

    //Dont have good request info in middleware, like IP, Browser info, etc.

    /*
    let result = NetBadHelpers.isAllowedRequest( req );
    if ( result <= 0 )
        {//Error.

        console.log("_middleware.js - attempting to redirect");
        // On the client, we'll use the Router-object
        // from the 'next/router' module.
        return NextResponse.redirect('/misc/investigating');
        }
    */
    //----

    let urlIsPage = !pathName.startsWith("/images") && 
                    !pathName.startsWith("/styles");
    //console.log("IsPage=", urlIsPage );
    
    if ( !urlIsPage )
        {
        //console.log("_middleware - skipping path changes for asset", pathName );
        return NextResponse.next()
        }

    // API calls
    if ( pathName.startsWith('/api') ) 
        {
        //console.log("_middleware - skipping path changes for api", pathName );
        return NextResponse.next()
        }
        
    //Begin page path processing checks.

    let maintMode = process.env.MAINTENANCE_MODE; 
    //console.log("maintMode=", maintMode);
    if ( maintMode == "1" && urlIsPage )
        {//rewrite or redirect for construction mode?
        console.log("redirecting to maint page");
        return NextResponse.rewrite('/misc/maintenance');
        }

    //Really raw HTML.
    //http://localhost:3000/html/html1.html
    
    //Test hook if I can return other data.
    //return new Response("Hello World from Middleware!");

    //logger.info('Logging with logger - got page', pathName );

    /*
    if (pathName == '/') 
        {
        return NextResponse.redirect('/home')
        }

    */


        /*

        if under construction
        
        */

    /*
   
    */


    pathName = pathName.toString();
    pathName = pathName.toLowerCase();
    //console.log("middleware() - pathName=", pathName);        
    

    //Rewrite.  Serve this URL from another page source.
    //return NextResponse.rewrite(`/company/about`); // This return is necessary
    //return NextResponse.rewrite(`/${os}`) // This return is necessary
    
    if (pathName == '/home') 
        {//Note the main page is not index, it's / that maps to page index.jsx
        return NextResponse.redirect('/');
        }
    
    if ( pathName.startsWith("/tl/") )
        {
        pathName = pathName.slice(3);
        pathName = "/test-layout/" + pathName;

        console.log("redirecting to ", pathName )
        return NextResponse.redirect( pathName )
        }
    
    if ( pathName.startsWith("/t/u/") )
        {
        pathName = pathName.slice(3+2);
        pathName = "/test/utils/" + pathName;

        console.log("redirecting to ", pathName )
        return NextResponse.redirect( pathName )
        }


    //console.log(" about to evaluate /t/ , ");
    if ( pathName.startsWith("/t/") )
        {
        //console.log("middleware() - found /t/")
        pathName = pathName.slice(3);
        pathName = "/test/" + pathName;

        console.log("redirecting to ", pathName )
        return NextResponse.redirect( pathName )
        }

    //if ( pathName == '/gotoabout' ) 
    if ( pathName.toLowerCase().endsWith("/gotoabout"))
        {
        console.log("found /gotoabout")
        return NextResponse.redirect('/company/about');
        }

    //this is not working
    if ( pathName.toLowerCase().startsWith("/htmlv"))
        {
        return NextResponse.redirect('/html/html1.html');
        }
    
    //Goes to next handler.
    // If NextResponse.next() is returned, or if there is no return value, the page will load as expected, as if there's no middleware:
    return NextResponse.next();

    //return new Response('Hello, world!')
    }

