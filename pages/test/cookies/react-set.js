
// Testing for REACT-COOKIE package.

//https://dev.to/debosthefirst/how-to-use-cookies-for-persisting-users-in-nextjs-4617

//Designed for...
// pages/login.js
import { useCookies } from "react-cookie"
import CookiesAce from "/utils/cookies/cookies-ace"
import Layout from '/view/full-layout.jsx'

export default function Index() {

    //const [cookie, setCookie, removeCookie] = useCookies(["user"])
    const [cookie, setCookie, removeCookie] = useCookies([ CookiesAce.getCookieNameForTest() ]);
    
    let cookieOptions = CookiesAce.getCookieDefaultOptions();

    setCookie( CookiesAce.getCookieNameForTest(), "testing123", cookieOptions );

    return (
        <>
            <Layout title="Title" description="Desc">
            <h1>Test Cookie React - setCookie</h1> 
    
    
            <br/><br/>

            </Layout>

        </>
    );

  
  }



