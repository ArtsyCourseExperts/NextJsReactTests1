

import { useCookies } from "react-cookie"
import CookiesAce from "/src/cookies/cookies-ace"
//import Layout from '/view/full-layout.jsx'
import CookiesReactHelpers from "/utils/cookies/cookies-react-helpers"
//import ArgonHelpers from '/utils/math/argon-helpers'
import JwtHelpers from '/utils/cookies/jwt-helpers'
import JwtHelpersAce from '/src/cookies/jwt-helpers-ace'
import axios from 'axios';

//=================

//Page render time
export const handleServerSideProps = async ( {req, res, query} ) =>
    {
    console.log("getServerSideProps() for jwt1");

    //const res = await fetch('http://localhost:3000/api/feed')

    //console.log("req=", req );
    //console.log("query=", query );

    //AceTestTable

    //const posts = await PrismaHelpers.prisma.aceTest1.findMany();
    //const posts = await PrismaHelpers.prisma.samplePost.findMany();

    //const posts = await PrismaHelpers.prisma.aceTest1.findMany();
    //console.log("got posts=", posts );
    //console.log("posts[0]=", posts[0] );
    
    //let passwordReal = "thePass";       //await ArgonHelpers.createHash("thePass");
    //console.log("getServerSideProps()-real password hash is=",passwordReal);
    
    //let passwordEnteredNow = await ArgonHelpers.createHash("thePass");
    //console.log("getServerSideProps()-real password entered now is=",passwordEnteredNow);

    //let passwordGood = await ArgonHelpers.verifyHash( passwordEnteredNow , passwordReal); 
    //console.log("getServerSideProps()- passwordGood=", passwordGood );
    //console.log( "passwordGood type=", typeof(passwordGood) );

    let jwtTokenDirect = "";
    /*
    console.log("jwt1 - getServerSideProps() - about to call jwtGetData()")
    jwtTokenDirect = await JwtHelpers.jwtGetToken( req , JwtHelpersAce.jwtGetCookieName() );
    console.log("jwt1 - getServerSideProps() - jwtTokenDirect=", jwtTokenDirect );
    if ( !jwtTokenDirect )
        {
        jwtTokenDirect = "";
        }
    */

    // THIS IS NOT WORKING!!!   I can't get JWT from Serverside using this request.
    
    console.log("getServerSideProps() - about to call jwtGetTokenDataVerified()")
    let jwtToken = JwtHelpers.jwtGetTokenDataVerified( req, JwtHelpersAce.jwtGetCookieName() );
    if ( !jwtToken )
        {
        console.log("getServerSideProps() - error no token?");
        jwtToken = "0";
        }
    jwtTokenDirect = jwtToken;
    console.log("getServerSideProps() - jwtTokenDirect=", jwtTokenDirect );
    
    
    
    /*
    console.log("jwt1 - getServerSideProps() - calling api/test/jwt-read" );

    let dataPayload = {};
    dataPayload[ JwtHelpersAce.jwtGetKeyFieldName() ] = "12345";

    await axios.post(`/api/test/jwt-read`, dataPayload )
        .then(res => {
        console.log("clientClickRead()- axios.post() complete ");
        console.log("clientClickRead()- data was ", res);

        //uniqueUserId

        //setJwtCookieDataRead(  JSON.stringify(res.data) );
           
        console.log("jwt1 - getServerSideProps() - res.data=", JSON.stringify(res.data) );

        
        //console.log(res.data);
        })
    */

    //setJwtCookieDataPageLoad(  JSON.stringify(jwtData) );

    let jwtDataFetch = "";
    
    //console.log("jwt1 - getServerSideProps() - axios.get PRE" );
    //const response = await axios.get("/api/test/jwt-read");
    //console.log("jwt1 - getServerSideProps() - axios.get, ", response );


    /*
    await axios.post("/api/test/jwt-read", null )
            .then(res => {
            console.log("jwt1 - getServerSideProps()- axios.post() complete ");
            console.log("jwt1 - getServerSideProps()- data was ", res);

            //uniqueUserId

            //setJwtCookieDataRead(  JSON.stringify(res.data) );
            jwtDataFetch = res.data;
            
            //console.log(res.data);
            })
    */

    console.log("jwt1 - getServerSideProps() - done with jwt-read");
    const results = []; // await PrismaHelpers.prisma.aceTest1.findMany();
    
    return {
        props:
            {
            serverSideProps: 
                {
                propsSet: true,
                test: "hello from server",
                other: "other",
                jwtdirect: jwtTokenDirect,
                jwtfetch: jwtDataFetch
                //,
                //req: req
                }
            }
        }

    }



