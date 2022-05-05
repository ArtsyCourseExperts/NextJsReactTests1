import React from 'react';
import { useEffect } from 'react'
import { useState } from 'react';
import Layout from '../../view/header-full_footer-full_padded.jsx'
import {Fragment} from 'react';

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
    
    console.log("pages/account/status.jsx");

    //----

    //Executed Client side, after DOM updates.  EVEN on first render!
    useEffect(() => {
        console.log("useEffect() once");

    
        }, []);     // [] empty array means, runs ONCE after initial rendering

    //----

    return (
            
        <Layout title="Status" 
            description="Status">
            <h1>Account Login Status</h1>
            
            Status={authenticatedStatus.toString()}<br/>
            StatusCode={authenticatedStatusCode}<br/>
            StatusNum={authenticatedStatusNum}<br/>
            StatusWhy={authenticatedWhy}<br/>

        </Layout>

    );

}


//=================
  
//Page render time, server only.
export const getServerSideProps = async ( context ) => {
    console.log("status.jsx - getServerSideProps()");

    let result = 
        { props:
            {
            serverSideProps: 
                {
                propsSet: true,
                test: "hello from server",
                other: "other",
                }
            }
        };

    return ( result ); 
    }
//=================

