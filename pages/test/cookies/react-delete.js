
// Testing for REACT-COOKIE package.

//https://dev.to/debosthefirst/how-to-use-cookies-for-persisting-users-in-nextjs-4617

//Designed for...
// pages/login.js
import { useCookies } from "react-cookie"
import CookiesAce from "/utils/cookies/cookies-ace"
import Layout from '/view/full-layout.jsx'


export default function Index() {

    //const [cookie, setCookie, removeCookie] = useCookies(["user"])
    const [cookies, setCookie, removeCookie] = useCookies([ CookiesAce.getCookieNameForTest() ]);
    
    let value=getCookie( CookiesAce.getCookieNameForTest(), {} );

    return (
        <>
            <Layout title="Title" description="Desc">
            <h1>Test Cookie React - Remove Cookie</h1> 
    
            Current Value{value}

            <br/><br/>

            </Layout>

        </>
    );

  
  }



