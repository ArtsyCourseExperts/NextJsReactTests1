
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

export default function Index( 
    { serverSideProps
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

    const [ jwtCookieDataCreatedToken, setJwtCookieDataCreatedToken ] = useState(null);
    const [ jwtCookieDataCreatedData, setJwtCookieDataCreatedData ] = useState(null);

    const [ jwtCookieDataServerLoad, setJwtCookieDataServerLoad ] = useState(null);
    const [ jwtCookieDataRefresh, setJwtCookieDataRefresh ] = useState(null);
    const [ jwtCookieDataRead, setJwtCookieDataRead ] = useState(null);
    const [ jwtCookieDataPageLoad, setJwtCookieDataPageLoad ] = useState(null);
    const [ jwtCookieDataPageUpdated, setJwtCookieDataPageUpdated ] = useState(null);
    
    const [ jwtCookieDataDeleted, setJwtCookieDataDeleted ] = useState(null);



    //Executed Client side, after DOM updates.  EVEN on first render!
    useEffect(() => {
        console.log("jwt1 - useEffect() once");
        
        //return;

        //Commented since I dont want to set an initial value.
        //if (!cookies.myValue) {
        //    setCookie('myValue', 'a');
       // }

        console.log("jwt1 - useEffect()", serverSideProps );
        if ( serverSideProps.propsSet )
            {
            console.log("props.set");
            }
        else
            {
            console.log("props.set NOT SET");
            }

        //let jwtData = JwtHelpers.jwtGetData( req , JwtHelpersAce.jwtGetCookieName() );
        //console.log("jwt1 - useEffect() - jwtData=", jwtData );
        //setJwtCookieDataPageLoad( JSON.stringify(jwtData) );

        axios.post(`/api/cookies/jwt-read`, null )
        .then(res => {
            console.log("jwt - useEffect()- axios.post() complete ");
            console.log("jwt - useEffect()- data was ", res);

            //uniqueUserId
            setJwtCookieDataPageLoad( JSON.stringify(res.data) );

            //console.log(res.data);
            })
        
        }, []);     // [] empty array means, runs ONCE after initial rendering

    

        
    //Executed Client side, after DOM updates.  EVEN on first render!
    useEffect(() => {
        console.log("jwt1 - useEffect(); every update");
        
        //return;

        //Commented since I dont want to set an initial value.
        //if (!cookies.myValue) {
        //    setCookie('myValue', 'a');
       // }

        /*
        console.log("jwt1 - useEffect()", props.data );
        if ( props.data.propsSet )
            {
            console.log("props.set");
            }
        else
            {
            console.log("props.set NOT SET");
            }
        */

        //let jwtData = JwtHelpers.jwtGetData( req , JwtHelpersAce.jwtGetCookieName() );
        //console.log("jwt1 - useEffect() - jwtData=", jwtData );
        //setJwtCookieDataPageLoad( JSON.stringify(jwtData) );
        
        axios.post(`/api/cookies/jwt-read`, null )
        .then(res => {
            console.log("jwt - useEffect()- axios.post() complete ");
            console.log("jwt - useEffect()- data was ", res);

            //uniqueUserId
            setJwtCookieDataPageUpdated( JSON.stringify(res.data) );

            //console.log(res.data);
            })
        

        });     // no param means, runs after EVERY update


    //console.log( cookies );

    const clientClickCreate = (e) => {
        console.log("clientClickCreate()");

        //call api   jwt-create-update  with userid=123456

        let dataPayload = {};
        
        dataPayload[ JwtHelpersAce.jwtGetKeyFieldName() ] = "12345";
        
        let otherTokenParams = 
            { 
              tokentestparam: "testcustomtoken"
            , fish: "trout"
            , kids: "yes" 
            };
        
        dataPayload.otherTokenParams = otherTokenParams;
        
        //let jwtTokenData = null;
        console.log("clientClickCreate()- about to call post");
        axios.post(`/api/cookies/jwt-create-update`, dataPayload )
            .then(res => {
            console.log("clientClickCreate()- axios.post() complete ");
            console.log("Create respons=",res);



            let jwtToken = res.data.jwtToken;

            setJwtCookieDataCreatedToken( jwtToken );

            console.log("Just received new jwtToken", jwtToken);

            let tokenParts = JwtHelpers.jwtParse( jwtToken.data );
            console.log("clientClickCreate() - parse=", tokenParts);

            let tokenPartsText = JSON.stringify( tokenParts );
            setJwtCookieDataCreatedData( tokenPartsText );
            
            //console.log(res.data);
            })
        console.log("clientClickCreate()- done")
        }
    
    
    const clientClickRefresh = (e) => {
        console.log("clientClickRefresh()");
            
        let dataPayload = {};
        //dataPayload[ JwtHelpersAce.jwtGetKeyFieldName() ] = "12345";

        axios.post(`/api/cookies/jwt-refresh`, dataPayload )
            .then(res => {
            console.log("clientClickRefresh()- axios.post() complete ");
            console.log("clientClickRefresh()- data was ", res);

            let jwtToken = res.data.jwtToken;
            
            setJwtCookieDataRefresh( JSON.stringify(res.data) );

            //console.log(res.data);
            })
        }


    const clientClickRead = (e) => {
        console.log("clientClickRead()");
            
        let dataPayload = {};
        dataPayload[ JwtHelpersAce.jwtGetKeyFieldName() ] = "12345";

        axios.post(`/api/cookies/jwt-read`, dataPayload )
            .then(res => {
            console.log("clientClickRead()- axios.post() complete ");
            console.log("clientClickRead()- data was ", res);

            //uniqueUserId

            let jwtToken = res.jwtToken;
            
            setJwtCookieDataRead(  JSON.stringify(res.data) );

            //console.log(res.data);
            })
        }
    
    
    const clientClickDelete = (e) => {
        console.log("clientClickDelete()");
        
        //JwtHelpers.jwtClearData( res, JwtHelpersAce.jwtGetCookieName() );
        axios.post(`/api/cookies/jwt-clear`, null )
            .then(res => {
            console.log("clientClickDelete()- axios.post() complete ");
            //console.log("clientClickDelete()- data was ", res);

            //uniqueUserId
            
            let deleteMsg = "Deleted at " + new Date();
            
            deleteMsg = deleteMsg + " " + JSON.stringify(res.data)
            setJwtCookieDataDeleted( deleteMsg );

            //console.log(res.data);
            })
        }

    const clientClickModify = (e) => {
        console.log("clientClickModify()");

        
        }
    

    const clientClickLogin = (e) => {
        console.log("clientClickLogin()");
        }
    
    return (
        <Fragment>
            {/* <Layout title="Title" description="Desc">*/}
            <h1>Test Cookies - JWT1 Javascript Web Token 1</h1> 


            <Nav defaultActiveKey="/home" as="ul" style={{}}>
                
                <Nav.Item as="li">
                    <Nav.Link href="#" onClick={clientClickCreate}>Create-Update</Nav.Link>
                </Nav.Item>

                <Nav.Item as="li">
                    <Nav.Link href="#" onClick={clientClickRefresh}>Refresh</Nav.Link>
                </Nav.Item>

                <Nav.Item as="li">
                    <Nav.Link href="#" onClick={clientClickRead}>Read</Nav.Link>
                </Nav.Item>
                
                <Nav.Item as="li">
                    <Nav.Link href="#" onClick={clientClickDelete}>Delete Cookie</Nav.Link>
                </Nav.Item>

                <Nav.Item as="li">
                    <Nav.Link href="#" onClick={clientClickModify}>Modify Other Param</Nav.Link>
                </Nav.Item>

            </Nav>
            

            {/*Cookie Value current={cookieValue}<br/>*/}

            <b>FROM _app.js</b><br/>
            authenticatedStatus = { authenticatedStatus.toString() }<br/>
            authenticatedStatusCode = { authenticatedStatusCode }<br/>
            authenticatedStatusNum = { authenticatedStatusNum }<br/>
            authenticatedWhy = { authenticatedWhy }<br/>
            
            
            Server (serverprops direct) data.test is={serverSideProps.test}<br/>
            GET JWT Cookie Value server render (serverprops direct) ={jwtCookieDataServerLoad}<br/>
            GET JWT Cookie Value server render (serverprops direct) ={serverSideProps.jwtdirect}<br/>
            GET JWT Cookie Value server render (serverprops fetch) ={serverSideProps.jwtfetch}<br/>
            <br/>
            GET JWT Cookie Value page load (useeffect) ={jwtCookieDataPageLoad}<br/>
            GET JWT Cookie Value page updated (useeffect) ={jwtCookieDataPageUpdated}<br/>
    
            <br/>
            SET JWT Cookie Value = { jwtCookieDataCreatedToken }<br/>
            SET JWT Cookie data = { jwtCookieDataCreatedData }<br/>
            Refresh JWT Cookie Value = { jwtCookieDataRefresh }<br/>
            Read JWT Cookie Value = { jwtCookieDataRead }<br/>
            
            Delete JWT Cookie = { jwtCookieDataDeleted }<br/>
            
            <br/><br/>

            {/*</Layout>*/}

        </Fragment>
    );


  }
//=================


//I CANT GET JWT in getServerSideProps!!!

export const getServerSideProps = async ( context ) => {
    console.log("getServerSideProps() START -----");
    
    //Doesn't include JWT!!!
    console.log("getServerSideProps() cookies=", context.req.cookies );
    

    console.log("getServerSideProps() req.headers.cookies=", context.req.headers.cookies );
    

    let result = await handleServerSideProps( context );
    
    console.log("getServerSideProps() END ----");
    
    console.log("getServerSideProps(), result=", result)

    return ( result ); 
    }

//=================

