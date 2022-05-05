
// Testing for REACT-COOKIE package.

//https://dev.to/debosthefirst/how-to-use-cookies-for-persisting-users-in-nextjs-4617

//Designed for...
// pages/login.js
import { useCookies } from "react-cookie"
import CookiesAce from "/utils/ace/cookies-ace"
import Layout from '/view/full-layout.jsx'
import CookiesReactHelpers from "/utils/cookies/cookies-react-helpers"

export default function Index() {

    //const [cookies, setCookie, removeCookie] = useCookies([ CookiesAce.getCookieNameForTest() ]);
    
    //let cookieOptions = CookiesAce.getCookieDefaultOptions();

    //https://www.npmjs.com/package/react-cookie
    //let value=cookies[ CookiesAce.getCookieNameForTest() ]; //get( CookiesAce.getCookieNameForTest(), {} );

    //Cookies are client side.
    let value = CookiesReactHelpers.getCookieValue( CookiesAce.getCookieNameForTest() );

    //console.log( cookies );

    return (
        <>
            {/* <Layout title="Title" description="Desc">*/}
            <h1>Test Cookie React - get</h1> 

            Current Value={value}
        
            <br/><br/>

            {/*</Layout>*/}

        </>
    );

  
  }




