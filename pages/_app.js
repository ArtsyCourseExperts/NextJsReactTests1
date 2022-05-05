
/*
These styles (styles.css) will apply to all pages and components in your application. Due to the global nature of stylesheets, and to avoid conflicts, you may only import them inside pages/_app.js.

In production, all CSS files will be automatically concatenated into a single minified .css file.
*/

//import App, { AppContext } from "next/app";

//import '../app-styles.css'
//import '../public/css/test1.css'
//import '../components/full-layout.scss'

//import styles from '../styles/globals.css'

/* does no base path work */

import 'tailwindcss/tailwind.css';      //Actually pulls it from node_packages/tailwindcss
import '/styles/tailwind/tailwind-helpers.css'

import '/styles/atv-common/app-tags-overrides.css'
import 'bootstrap/dist/css/bootstrap.min.css'

//Do my custom app styling of standard tags
import '/styles/ace/app-tags-custom.css'

//Note that app-tags-overrides, overrides tailwind.css

import '/styles/ace/app-global.css'
import '/styles/ace/app-container.css'
import '/styles/ace/app-messages.css'
import '/styles/ace/app-tags-controls.css'              //For buttons and labels
import '/styles/ace/app-fonts.css'
import '/styles/ace/app-colors.css'

import '/styles/ace/content-header.css'
//import '/styles/content-footer.css'
import '/styles/ace/side-menu-bar.css'

import '/styles/atv-common/design_tokens.css'

//LOWER IS HIGHER PRIORITY OVER PRIOR ITEMS

//=================

//From react-cookie stuff
//To ensure that every route in our application has access to the cookie, we need to wrap our APP component in a cookie provider.
//https://dev.to/debosthefirst/how-to-use-cookies-for-persisting-users-in-nextjs-4617
//import { CookiesProvider } from "react-cookie"

import App from "next/app"

//https://github.com/reactivestack/cookies/issues/299
import { Cookies, CookiesProvider } from "react-cookie";

//Notice how pages and _app import from next/head, whereas document pulls from next/document
import Head from "next/head";
import {Fragment} from "react";
//import { BrowserRouter as Router } from 'react-router-dom';
import Router from 'next/router';
import { useRouter } from 'next/router';
import BrandAceHelpers from "/src/app/brand-ace-helpers.js"
import { useEffect } from 'react'
import { useState } from 'react';

import axios from 'axios';
import JwtHelpers from '/utils/cookies/jwt-helpers';

import NetBadHelpers from '/utils/net/net-bad-helpers.js'
import AppBackend from '/src/app/app-backend.js'

//=================

// This default export is required in a new `pages/_app.js` file.

//Notice the parameters, some of theme come from getInitialProps
export default function MyApp({ Component, pageProps, paramFromApp }) 
    {
    const router = useRouter();

    //console.log("MyApp() -----");

    const [ authenticatedStatus, setAuthenticatedStatus ] = useState(false);
    const [ authenticatedStatusCode, setAuthenticatedStatusCode ] = useState("unset");
    const [ authenticatedStatusNum, setAuthenticatedStatusNum ] = useState(-1);
    const [ authenticatedWhy, setAuthenticatedWhy ] = useState("unset");
    const [ authenticatedUserGuid, setAuthenticatedUserGuid ] = useState("");
    
    const [ appUseStateTest, setAppUseStateTest ] = useState("_app.js use state test param");
    const [ appUseEffectTest, setAppUseEffectTest ] = useState("_app.js use effect initial");


    useEffect(() => {
        console.log("MyApp useEffect()");

        // run auth check on initial load
        //authCheck(router.asPath);

        setAppUseEffectTest( "_app.js use effect updated test param" );

        //Initial.
        setAuthenticatedWhy( "_app useEffect requesting status." );


        axios.post(`/api/cookies/jwt-read`, null )
        .then(res => {
            //console.log("_app.js - useEffect()- axios.post() complete ");
            //console.log("_app.js - useEffect()- data was ", res);

            let jwtToken = res.data;

            //uniqueUserId
            //setJwtCookieDataPageLoad( JSON.stringify(res.data) );
            //console.log("_app.js - jwt-read =", JSON.stringify(res.data) );

            if ( jwtToken.uniqueUserId )
                {
                console.log("_app.js - jwt-read uniqueUserId =", res.data.uniqueUserId );
                setAuthenticatedUserGuid( res.data.uniqueUserId );
                }
            else
                {
                console.log("_app.js - jwt-read uniqueUserId = UNDEFINED" );
                }
            
            if ( jwtToken.iat )
                {
                let iatText=JwtHelpers.jwtConvertEpochToUTC( jwtToken.iat );
                //console.log("jwt-read iat =", jwtToken.iat, iatText );
                }

            if ( jwtToken.exp ) 
                {
                let expText=JwtHelpers.jwtConvertEpochToUTC( jwtToken.exp );
                //console.log("jwt-read exp =", jwtToken.exp );
                }

            if ( jwtToken.statusSuccess !== undefined )
                {//True or False?
                setAuthenticatedStatus( jwtToken.statusSuccess );
                }
            else
                {
                setAuthenticatedStatus( false );
                }

            //This should be set for all pass & fail scenarios.
            setAuthenticatedStatusCode( jwtToken.statusCode );
            setAuthenticatedStatusNum( jwtToken.statusNum );

            if ( jwtToken && jwtToken.status == true && jwtToken.statusCode=="success" )
                {
                setAuthenticatedWhy( "_app useEffect set false" );
                }
            else if ( jwtToken && jwtToken.status == false && jwtToken.statusCode =="novalidjwttoken" )
                {//Not logged in right now.  Expired token.
                //Login
                setAuthenticatedWhy( "_app useEffect not valid JWT token" );
                }
            else
                {//No JWT token.  Signin or Signup?
                setAuthenticatedWhy( "_app useEffect no JWT Token" );
                }

            //console.log(res.data);
            })

        
        // set authorized to false to hide page content while changing routes
        //const hideContent = () => setAuthorized(false);
        //router.events.on('routeChangeStart', hideContent);

        // run auth check on route change
        //router.events.on('routeChangeComplete', authCheck)

        // unsubscribe from events in useEffect return function
        /*
        return () => 
            {
            router.events.off('routeChangeStart', hideContent);
            router.events.off('routeChangeComplete', authCheck);
            }
        */
    }, []);
    

    const isBrowser = typeof window !== "undefined";

    {/*
        //Old default
        return <Component {...pageProps} />

    */}

    {/*
        https://github.com/reactivestack/cookies/issues/299
        <CookiesProvider cookies={isBrowser ? undefined : new Cookies(cookies)}> 
        Does this just make a new cookie every time?  Because I may not want that?
        says cookies is not defined.
    */}
    
    {/*
    Trying to get react-dom-router working

            <BrowserRouter>
            <CookiesProvider>
                <Component {...pageProps} />
            </CookiesProvider>
        </BrowserRouter>

    document.getElementById('root')
    */}

    //https://github.com/vercel/next.js/blob/canary/examples/layout-component/pages/_app.js
    // Use the layout defined at the page level, if available
    const getLayout = Component.getLayout || ((page) => page)
    //If available it's a function.
    //console.log("layout=", getLayout);
    //return getLayout(<Component {...pageProps} />)

    let defaultTitle = BrandAceHelpers.getSiteName();

    return (

            <>

                <Head>
                    {/* DOC header tags go at the top, followed by _App stuff, followed by page */}
                    
                    {/* <meta name="Test-from-app1" content="this is TEST from _app.jx"/> */}
                    {/* <meta name="Test-from-app2" content="this is ANOTHER TEST from _app.jx"/> */}
                   
                    <meta name="viewport" content="width=device-width, initial-scale=1.0" key="viewport" />

                    {/* If page has title then it will replace this, if not this will become title */}
                    {/*<title>default (should be hidden) title from app-jsx</title>*/}
                    <title>{defaultTitle}</title>

                    {/* Maybe _app.js only accepts meta , stuff from app_js is html body stuff*/}

                    {/*<title>this is default title in appjs</title>*/}
                    {/*<thing>SOME STUFF from_app_js</thing> */}
                    
                </Head>

            {/* //React-cookie stuff    //https://www.npmjs.com/package/react-cookie */}

                <CookiesProvider>
                    
                    <Component {...pageProps} 
                    authenticatedStatus={authenticatedStatus}
                    authenticatedStatusCode={authenticatedStatusCode}
                    authenticatedStatusNum={authenticatedStatusNum} 
                    authenticatedWhy={authenticatedWhy}
                    authenticatedUserGuid={authenticatedUserGuid}
                    paramFromApp={paramFromApp}
                    appUseStateTest={appUseStateTest}
                    appUseEffectTest = {appUseEffectTest}
                    ></Component>

                </CookiesProvider>


            </>
        );
    }


//=================


//Server side render EVERY page.
//using getInitialProps in _app.js disables the ability to perform automatic static optimization, causing every page in your app to be server-side rendered.
//https://nextjs.org/docs/advanced-features/custom-app

//Even though pages now use getServerSideProps, _app.js still uses getInitialProps
//App currently does not support Data Fetching methods getStaticProps or getServerSideProps

MyApp.getInitialProps = async ( appContext ) => 
    {
    let dtNow =  new Date();
    console.log("\n==================== "+ dtNow.toISOString());
    console.log("MyApp.getInitialProps() ");
    
    //console.log( "_app.js - appContext=", appContext );

    // calls page's `getInitialProps` and fills `appProps.pageProps`
    const appProps = await App.getInitialProps(appContext);
    
    //const auth = await getUser(appContext.ctx)
    //Use auth parameter in returned data by using
    //    <AuthProvider myAuth={auth}>
    //    <Layout>
    //      <Component {...pageProps} />
    //    </Layout>
    //  </AuthProvider>
    
    //Do ACE specific stuff here.
    
    
    //Log/Check Blocked IP.

    // * * * TO DO * * * 

    let pageContext = appContext.ctx;

    //console.log("_app.js - pageContext = ", pageContext );
    //console.log("_app.js - pageContext.req = ", pageContext.req );
    let result = await NetBadHelpers.isAllowedRequest( pageContext.req );
    //console.log("_appjs isAllowedRequest result=", result);
    if ( result <= 0 && !pageContext.req.url.includes("/misc/investigating") )
        {//Error.
        console.log("_app.js - getInitialProps() - attempting to redirect");
        // On the client, we'll use the Router-object
        // from the 'next/router' module.
        //Can't use router on Server.
        //Router.replace('/misc/investigating');
        AppBackend.RedirectUser( appContext.ctx, '/misc/investigating');
        return;
        }
    //console.log("_app.js - did not find bad request and did NOT redirect");
    

    let isValidCookieOrThing = "some auth param";
    
    let appCustomProps = 
        { other: isValidCookieOrThing 
        , paramFromApp : "_app.js data from getInitialProps" 
        };

    //and merge the returned object into the return value.
    //return { ...appProps, cookies: appContext.ctx.req?.headers?.cookie };
    //return { ...appProps, auth: auth }
    return { ...appProps, ...appCustomProps };
    };

