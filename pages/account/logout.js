import Layout from '../../view/header-full_footer-full_padded.jsx'
import {handleServerSideProps} from '/src/account/logout-backend';
import { useEffect } from 'react'
import { useState } from 'react';
import axios from 'axios';
import AceAccountHelpers from '/src/account/ace-account-helpers';

//=================

export default function Index(
    { serverSideProps
    , authenticatedStatus
    , authenticatedStatusCode
    , authenticatedStatusNum
    , authenticatedWhy
    , authenticatedUserGuid
    , paramFromApp
    , appUseStateTest 
    , appUseEffectTest } )
    {
    
    console.log("logout.js");

    const [ valueExtraMsg, setExtraMsg ] = useState("");
    const [ valueErrorMsg, setErrorMsg ] = useState("");

    //Executed Client side, after DOM updates.  EVEN on first render!
    useEffect(() => 
        {
        console.log("logout.js useEffect() once");
        
        //if already signed in, need to log out.

        let dataPayload = {};
        dataPayload[ AceAccountHelpers.getAccountApiGuidParamName() ] = authenticatedUserGuid;
        
        console.log("logout.js useEffect() - axios.post()");
        axios.post(`/api/account/logout-api`, dataPayload )
            .then(res => 
                {
                console.log("logout.js useEffect()- axios.post() complete ");
                console.log("logout.js useEffect()- response was ", res);

                let results = res.data;
                console.log("logout.js useEffect()- results was ", results);
                
                //console.log(res.data);
                //let results = { statusSuccess: true, statusNum: 1, statusCode:"success", statusInfo:"Logged out successfully."};
                
                if ( results && true==results.statusSuccess && results.statusCode == "success" )
                    {//Success
                    setExtraMsg("");
                    setErrorMsg("");
                    }
                else if ( results && true==results.statusSuccess && results.statusCode == "successNoUserId" )
                    {//Sucess, actually already logged out.
                    setExtraMsg("You were already logged out.");
                    setErrorMsg("");
                    }
                else if ( !results || ( results && false == results.statusSuccess )  )
                    {//Some sort of error!
                    //let results = { statusSuccess: true, statusNum: 1, statusCode:"success", statusInfo:"Logged out successfully."};
                    setExtraMsg("");
                    setErrorMsg("The logout process completed with some warnings.  Please delete your cookies and close your browser to be safe." )
                    }
                else 
                    {//200, but other error
                    setExtraMsg("");
                    setErrorMsg("The logout process failed.  Please delete your cookies and close your browser to be safe.");
                    }

                console.log("logout.js useEffect() - axios.post() done with good stuff");

                })
            .catch( error => 
                {
                console.log("logout.js useEffect()- axios.post() error ");

                console.log("logout.js useEffect()- axios.post() error =" , error );


                if (error.response) 
                    {// client received an error response (5xx, 4xx)
                    console.log("logout.js useEffect() - error.response=",error.response);

                    //let data = error.response.json();
                    setErrorMsg(error.response.statusText);
                    } 
                else if (error.request) 
                    {// client never received a response, or request never left
                    console.log( "logout.js useEffect()- axios.post() error.  request=", error.request );
                    setErrorMsg("server error");
                    } 
                else 
                    {// anything else, like Type Error in api call.
                    console.log( "logout.js useEffect()- axios.post() error message=", error.message);
                    //Dont let users know my exact internal error.
                    setErrorMsg("error");
                    }
                });
        
        }, []);     // [] empty array means, runs ONCE after initial rendering

//----

    return (
        <Layout title="Logged Out" description="Logged out of Artsy Course Experts.">
            <h1>Logged Out</h1> 

            You have been signed out.

            <br/><br/>

            {valueExtraMsg && <p style={{}}>  {valueExtraMsg}</p>}
            {valueErrorMsg && <p style={{color: 'red'}}>  {valueErrorMsg}</p>}

            
        </Layout>
        );

    };


//=================
  

//Page render time, server only.
export const getServerSideProps = async ( context ) => 
    {
    console.log("logout.js - getServerSideProps()");

    //Right now nothing special happens in logout.
    //But I may do some extra logging here.
    let result = await handleServerSideProps( context );
    
    return ( result ); 
    }
//=================


  