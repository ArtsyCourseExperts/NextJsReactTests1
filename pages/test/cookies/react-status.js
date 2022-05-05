
// Testing for REACT-COOKIE package.

//https://dev.to/debosthefirst/how-to-use-cookies-for-persisting-users-in-nextjs-4617

//Designed for...
// pages/login.js
import { useCookies } from "react-cookie"
import { ace_constants } from "/utils/ace_constants"

import { parseCookies } from "/utils/cookies/cookies-react-helpers"

import Layout from '/view/full-layout.jsx'


export default function Index( {data} ) {

    let cookieData = null;
    
    if ( data && data.user )
        {
        cookieData = data.user;
        }

    if (!cookieData)
        {
        cookieData = "NO COOKIE";
        }

    return (
        <>
          <div>
            <h1>Homepage </h1>
            <p>Data from cookie: {cookieData}</p>
          </div>
        </>
      )
    }    

    //Server side
    Index.getInitialProps = async ({ req, res }) => {
        const data = parseCookies(req)
        
        if (res) {
            //Response only available on server
            if (Object.keys(data).length === 0 && data.constructor === Object) 
                {
                res.writeHead(301, { Location: "/" })
            res.end()
            }
        }
        
        return {
            data: data && data    //,
        }

    }

  



