import React from 'react';
import JwtHelpers from '/utils/cookies/jwt-helpers'
import JwtHelpersAce from '/src/cookies/jwt-helpers-ace'
import Router from 'next/router';
import axios from 'axios';
import {handleServerSideProps} from '/src/account/signup-backend';
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
    
    console.log("pages/account/signup.jsx");

    const [valueErrorMsg, setErrorMsg] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');

    //----

    //Executed Client side, after DOM updates.  EVEN on first render!
    useEffect(() => {
        console.log("useEffect() once");
        
        //if already signed in, need to log out.

        if ( authenticatedStatusCode == 1 )
            {
            console.log("already signed in.. so redirecting to logged out");
            
            //Could also go to home, but that may be risky.  In case someone access after another user.
            Router.push('/pages/account/logout');
            }

        /*
        if ( serverSideProps.propsSet )
            {
            console.log("props.set");
            }
        else
            {
            console.log("props.set NOT SET");
            }
        */

        /*
        axios.post(`/api/cookies/jwt-read`, null )
        .then(res => {
            console.log("jwt - useEffect()- axios.post() complete ");
            console.log("jwt - useEffect()- data was ", res);

            //uniqueUserId
            setJwtCookieDataPageLoad( JSON.stringify(res.data) );

            //console.log(res.data);
            })
        */

        }, []);     // [] empty array means, runs ONCE after initial rendering


    //----

    const handleSubmit = (e) => {
        //function handleSubmit(user) {
        console.log("signup - handleSubmit()");

        //Why preven default?
        e.preventDefault();

        let dataPayload = 
            { name: name
            , email: email
            , passwordPlain: password 
            };
        
        axios.post(`/api/account/signup-api`, dataPayload )
        .then(res => {
            console.log("jwt - useEffect()- axios.post() complete ");
            console.log("jwt - useEffect()- data was ", res);
            
            let data = res.json();

            if (data && data.statusCode != "success") 
                {
                setErrorMsg(data.message);
                }
            else  
                {//Success
                console.log("signup.jsx - signup worked, redirecting to home")
                //set cookie
                //cookie.set('token', data.token, {expires: 2});
            
                Router.push('/');
                }
          })
        .catch( error => 
            {
            if (error.response) 
                {// client received an error response (5xx, 4xx)
                console.log(error);
                console.log("login.js - error.response=",error.response);
                setErrorMsg(error.response.statusText);
                } 
            else if (error.request) 
                {// client never received a response, or request never left
                console.log(error.request);
                setErrorMsg("server error");
                } 
            else 
                {// anything else
                console.log(error.message);
                setErrorMsg("error");
                }
            });





        /*
        return userService.register(user)
            .then(() => {
                alertService.success('Registration successful', { keepAfterRouteChange: true });
                router.push('login');
            })
            .catch(alertService.error);
        */
    }


    return (
            
        <Layout title="Signup to Artsy Course Experts" description="Sign up for Artsy Course Experts Tools.">
            <h1>Signup</h1>
            
            <form onSubmit={handleSubmit}>
                
                <label>name</label>
                {/*<input name="email" type="text" className={`form-control ${errors.firstName ? 'is-invalid' : ''}`} />*/}
                <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    name="name"
                    type="name"
                    />
                {/*<div className="invalid-feedback">{errors.firstName?.message}</div>*/}
            

                <label>email</label>
                {/*<input name="email" type="text" className={`form-control ${errors.firstName ? 'is-invalid' : ''}`} />*/}
                <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    name="email"
                    type="email"
                    />
                {/*<div className="invalid-feedback">{errors.firstName?.message}</div>*/}
            

                <label>Password</label>
                <input
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    name="password"
                    type="password"
                />
                <br/><br/>
                {/*<input name="password" type="password" className={`form-control ${errors.password ? 'is-invalid' : ''}`} />*/}

                {/*<div className="invalid-feedback">{errors.password?.message}</div>*/}


                {/*
                <button disabled={formState.isSubmitting} className="btn btn-primary">
                    {
                    {formState.isSubmitting && <span className="spinner-border spinner-border-sm mr-1"></span>}
                    }
                    Register
                </button>
                */}
                
                {/* TO DO - STYLE THIS BUTTON */}
                <input type="submit" value="Submit" />

                {valueErrorMsg && <p style={{color: 'red'}}>  {valueErrorMsg}</p>}
                
                Already have an account? <a className="header-underlined-link" 
                href="/account/login" 
                >Login</a>
                
                {/*<Link href="/account/login" className="btn btn-link">Cancel</Link>*/}

            </form>

        </Layout>

    );

}


//=================
  
//Page render time, server only.
export const getServerSideProps = async ( context ) => {
    console.log("getServerSideProps()");

    let result = await handleServerSideProps( context );
    
    console.log("jwt1 - getServerSideProps()");
    const results = []; // await PrismaHelpers.prisma.aceTest1.findMany();
    
    return ( result ); 

    }
//=================

