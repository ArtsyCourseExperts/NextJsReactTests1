import Layout from '../../view/header-full_footer-full_padded.jsx'
import React from 'react';
import JwtHelpers from '/utils/cookies/jwt-helpers'
import JwtHelpersAce from '/src/cookies/jwt-helpers-ace'
import Router from 'next/router';
import axios from 'axios';
import { handleServerSideProps } from '/src/account/login-backend';
import { useEffect } from 'react'
import { useState } from 'react';
import { Fragment } from 'react';
import loginStyles from '/components/login.module.css';

//=================


export default function Index(
    { serverSideProps
        , authenticatedStatus
        , authenticatedStatusCode
        , authenticatedStatusNum
        , authenticatedWhy
        , paramFromApp
        , appUseStateTest
        , appUseEffectTest }) {

    console.log("pages/account/login.jsx");

    const [valueErrorMsg, setErrorMsg] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    //----

    //Executed Client side, after DOM updates.  EVEN on first render!
    useEffect(() => {
        console.log("useEffect() once");

        //if already signed in, need to log out.

        if (authenticatedStatusCode == 1) {
            console.log("already logged in.. so redirecting to /tools/index.js");

            //Go to tools home page.
            Router.push('/tools');
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

    }, []);     // [] empty array means, runs ONCE after initial rendering


    //----

    function handleSubmit(user) {
        console.log("handleSubmit()");

        //Why preven default?
        e.preventDefault();

        let dataPayload =
        {
            email
            , password
        };

        axios.post(`/api/account/login-api`, dataPayload)
            .then(res => {
                console.log("useEffect()- axios.post() complete ");
                console.log("useEffect()- data was ", res);

                let result = res.data;

                //uniqueUserId
                //setJwtCookieDataPageLoad( JSON.stringify(res.data) );

                //console.log(res.data);

                if (!result.data || !result.data.statusSuccess) {//Some sort of error!
                    //let results = { statusSuccess: true, statusNum: 1, statusCode:"success", statusInfo:"Logged out successfully."};
                    setErrorMsg("The login had errors.<br/>")
                }
                else {
                    //set cookie
                    console.log("success, redirecting to /tools");
                    Router.push('/tools');
                }

            })
            .catch(error => {
                if (error.response) {// client received an error response (5xx, 4xx)
                    console.log(error);
                    console.log("login.js - error.response=", error.response);
                    setErrorMsg(error.response.statusText);
                }
                else if (error.request) {// client never received a response, or request never left
                    console.log(error.request);
                    setErrorMsg("server error");
                }
                else {// anything else
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
        // <Layout title="Login to Artsy Course Experts" description="Log into Artsy Course Experts Tools." >
        <div className={loginStyles.container}>

            <img
                className="header-logo-image"
                src="/images/ACE_RectLogoName3_400b.png"
            />
            <div className={loginStyles.title}>
                <h1>Hello there!</h1>
                <p>We are glad that you're back!</p>
            </div>
            <form onSubmit={handleSubmit} className={loginStyles.form}>
                {/*<input name="email" type="text" className={`form-control ${errors.firstName ? 'is-invalid' : ''}`} />*/}
                <div className={loginStyles.inputContainer}>
                    <img src="https://static-website.miro.com/static/images/layout/auth/signup/user.svg?version=develop.749.production" />
                    <input
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        name="email"
                        type="email"
                        placeholder='example@yourmail.com'
                        className={loginStyles.input}
                        autoComplete={false}
                        defaultValue=""
                    />
                </div>
                <div className={loginStyles.inputContainer}>
                    {/*<div className="invalid-feedback">{errors.firstName?.message}</div>*/}
                    <input
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        name="password"
                        type="password"
                        placeholder='*****************'
                        className={loginStyles.input}
                        autoComplete={false}
                        defaultValue=""
                    />
                </div>
                <a href="#">
                    I don't remember my password
                </a>
                <input type="submit" value="Sign In" className={loginStyles.submitButton} />
                {/* <input name="password" type="password" className={`form-control ${errors.password ? 'is-invalid' : ''}`} /> */}
                {/* <div className="invalid-feedback">{errors.password?.message}</div> */}

                {/* <button disabled={formState.isSubmitting} className="btn btn-primary">
                    {formState.isSubmitting && <span className="spinner-border spinner-border-sm mr-1"></span>}
                    Register
                </button> */}

                {valueErrorMsg && <p style={{ color: 'red' }}>  {valueErrorMsg}</p>}
                <div className={loginStyles.register}>
                    Don't have an account? {' '}
                    <a className="header-underlined-link"
                        href="/account/signup">Signup</a>
                </div>
                {/* <Link href="/account/login" className="btn btn-link">Cancel</Link> */}
            </form >
        </div >
        // </Layout>

    );

}


//=================


//Page render time, server only.
export const getServerSideProps = async (context) => {
    console.log("getServerSideProps()");

    let result = await handleServerSideProps(context);

    return (result);

}
//=================

