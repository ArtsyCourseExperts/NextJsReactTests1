
// Testing for REACT-COOKIE package.

//https://github.com/reactivestack/cookies/issues/299

import { useEffect } from 'react'

//Designed for...
// pages/login.js
import { useCookies } from "react-cookie"
import { ace_constants } from "/utils/ace_constants"

import Layout from '/view/full-layout.jsx'

//import { parseCookies } from "/utils/cookies-react-helpers"

export default function Index() {
  
    const [cookies, setCookie] = useCookies();

    
    //Rendered after DOM updates.  EVEN on first render!
    useEffect(() => {
        console.log("useEffect();");
        
        //Commented since I dont want to set an initial value.
        //if (!cookies.myValue) {
        //    setCookie('myValue', 'a');
       // }
    }, []);
    
//Only if I chose a value
  const updateMyValue = event => setCookie(  CookiesAce.getCookieNameForTest(), event.target.value)

  return (
    <div>        
      <label htmlFor="my-value">Current Cookie Value = {cookies.myValue}</label>
      <br/>
      
      Choose an item to set the cookie.
      <select id="my-value" value={cookies.myValue} onChange={updateMyValue}>
        <option value="a">A</option>
        <option value="b">B</option>
        <option value="c">C</option>
      </select>
    </div>
  )
    


  }



