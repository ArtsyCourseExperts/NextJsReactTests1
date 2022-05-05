import React from 'react';
import Router from 'next/router';
import {handleServerSideProps} from '/src/account/signup-backend';
import { useEffect } from 'react'
import { useState } from 'react';
import Layout from '/view/full-layout.jsx'
import {Fragment} from 'react';

//=================

export default function Index(
    { //serverSideProps
    //, 
      authenticatedStatus
    , authenticatedStatusCode
    , authenticatedStatusNum
    , authenticatedWhy
    , paramFromApp
    , appUseStateTest 
    , appUseEffectTest } )
    {
    
    console.log("redirect1.jsx");

    //----

    const handleSubmit = (e) => {
        //function handleSubmit(user) {
        console.log("handleSubmit()");

        //Why preven default?
        e.preventDefault();

        console.log("about to redirect")
        
        Router.push('/');
        };


    return (
        <Layout title="" description="">
            <h1>Redirect1</h1>
            
            <form onSubmit={handleSubmit}>
                
                <input type="submit" value="Handle Redirect Button" />

            </form>

        </Layout>

    );

}


//=================
