
// Testing for REACT-COOKIE package.

//https://dev.to/debosthefirst/how-to-use-cookies-for-persisting-users-in-nextjs-4617

//Designed for...
// pages/login.js
import { useCookies } from "react-cookie"
import CookiesAce from "/utils/cookies/cookies-ace"
import Layout from '/view/full-layout.jsx'

import UrlHelpers from "/utils/file/url-helpers";


/*


TO DO LEarn how to get url parameters


*/

import React, { Component } from 'react';

export default function Index() {

    //const [cookie, setCookie, removeCookie] = useCookies(["user"])
    const [cookie, setCookie, removeCookie] = useCookies([ CookiesAce.getCookieNameForTest() ]);
    
    let cookieOptions = CookiesAce.getCookieDefaultOptions();

    setCookie( CookiesAce.getCookieNameForTest(), UrlHelpers.getUrlQueryString(), cookieOptions );

    return (
        <>
            <Layout title="Title" description="Desc">
            <h1>Test Cookie React - setCookie</h1> 
    
            START
            { UrlHelpers.getUrlQueryString() }
            END

            <br/><br/>

            </Layout>

        </>
    );

  
  }



