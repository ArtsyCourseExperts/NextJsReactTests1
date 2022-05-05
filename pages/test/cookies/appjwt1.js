
// Testing for REACT-COOKIE package.

//https://dev.to/debosthefirst/how-to-use-cookies-for-persisting-users-in-nextjs-4617

//Designed for...
// pages/login.js
import { useCookies } from "react-cookie"
import CookiesAce from "/src/cookies/cookies-ace"
//import Layout from '/view/full-layout.jsx'
import CookiesReactHelpers from "/utils/cookies/cookies-react-helpers"
import Nav from 'react-bootstrap/Nav';
import {Fragment} from 'react';
//import ArgonHelpers from '/utils/math/argon-helpers'
import JwtHelpers from '/utils/cookies/jwt-helpers'
import JwtHelpersAce from '/src/cookies/jwt-helpers-ace'
import axios from 'axios';
import { useEffect } from 'react'
import { useState } from 'react';
import {handleServerSideProps} from "/src/cookies/jwt1-backend.js"

//=================

export default function Index( { 
          serverSideProps
        , authenticatedStatus
        , authenticatedStatusCode
        , authenticatedStatusNum
        , authenticatedWhy
        , paramFromApp
        , appUseStateTest 
        , appUseEffectTest } ) 
    {

    console.log("Index()");
    //const [cookies, setCookie, removeCookie] = useCookies([ CookiesAce.getCookieNameForTest() ]);
    
    //let cookieOptions = CookiesAce.getCookieDefaultOptions();

    //https://www.npmjs.com/package/react-cookie
    //let value=cookies[ CookiesAce.getCookieNameForTest() ]; //get( CookiesAce.getCookieNameForTest(), {} );

    //Cookies are client side.
    //let cookieValue = CookiesReactHelpers.getCookieValue( CookiesAce.getCookieNameForApp() );
    //let cookieValue = null;

    console.log("props=", serverSideProps );
    
    return (
        <Fragment>
            {/* <Layout title="Title" description="Desc">*/}
            <h1>Test _App.jsx - Test authentication</h1> 


            <b>FROM _app.js</b><br/>
            authenticatedStatus = { authenticatedStatus.toString() }<br/>
            authenticatedStatusCode = { authenticatedStatusCode }<br/>
            authenticatedStatusNum = { authenticatedStatusNum }<br/>
            authenticatedWhy = { authenticatedWhy }<br/>
            
            paramFromApp = {paramFromApp}<br/>

            appUseStateTest = {appUseStateTest}<br/>

            appUseEffectTest = {appUseEffectTest}<br/>

            <br/>
            <b>FROM page.js</b><br/>
            getServerSidePropsTest1 = {serverSideProps.getServerSidePropsTest1}<br/>

            <br/><br/>

            {/*</Layout>*/}

        </Fragment>
    );


  }
//=================


//I CANT GET JWT in getServerSideProps!!!

export async function getServerSideProps(context) {
//export const getServerSideProps = async ( context ) => {
    console.log("getServerSideProps() START -----");
    
    //Doesn't include JWT!!!
    //console.log("getServerSideProps() cookies=", context.req.cookies );

    //console.log("getServerSideProps() req.headers.cookies=", context.req.headers.cookies );
    
    //let result = await handleServerSideProps( context );
    
    console.log("getServerSideProps() END ----");
    
    //console.log("getServerSideProps(), result=", result)
    
    let result = {
        props:
            {
            serverSideProps: 
                {
                propsSet: true,
                test: "hello from server",
                other: "other",
                jwtdirect: 0,
                jwtfetch: "blah",
                getServerSidePropsTest1: "Hello from page getServerSideProps"
                //,
                //req: req
                }
            }
        }

    return ( result ); 
    }

//=================

  
