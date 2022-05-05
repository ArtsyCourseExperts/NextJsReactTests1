
// Testing for REACT-COOKIE package.

//https://dev.to/debosthefirst/how-to-use-cookies-for-persisting-users-in-nextjs-4617

//Designed for...
// pages/login.js
import { useCookies } from "react-cookie"
import { ace_constants } from "/utils/ace_constants"

import Layout from '/view/full-layout.jsx'


export default function Index() {

    const [cookie, setCookie] = useCookies(["my-value"])

    const handleSignIn = async () => {
    try {
      const response = await yourLoginFunction(username) //handle API call to sign in here.
      
      const data = response.data

      //ace_constants.

      //getCookieName()

      setCookie( "my-value", JSON.stringify(data), {
        path: "/",
        maxAge: 3600, // Expires after 1hr
        sameSite: true,
      })
    } catch (err) {
      console.log(err)
    }
  }


  return (
    <>
        <Layout title="Title" description="Desc">
    <h1>Test Cookie React</h1> 
    <br/><br/>


     What is your User Name:
      <label htmlFor="username">
        <input type="text" placeholder="enter username" />
      </label>

      <label htmlFor="username">
        <input type="password" placeholder="password" />
      </label>

        <br/>
        

      </Layout>

        
    </>
  )

  {/*
   return <div>
    
            <Layout title="Title" description="Desc">
                <h1>Test Cookie React</h1> 
                <br/><br/>



                <br/><br/>
            </Layout>
        </div>
  */}


  }



