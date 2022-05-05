// Testing for math, encryption

//Designed for...
//import Layout from '/view/full-layout.jsx'
import Nav from 'react-bootstrap/Nav';
import {Fragment} from 'react';
import { useEffect } from 'react'
import { useState } from 'react';
import CryptoHelpers from '/utils/math/crypto-helpers'

export default function Index( props ) {

    console.log("Index()");
    
    const [ test1Result, test1ResultSet ] = useState("unset");

    //Executed Client side, after DOM updates.  EVEN on first render!
    useEffect(() => {
        console.log("useEffect() once");
        
        }, []);     // [] empty array means, runs ONCE after initial rendering

    

    //console.log( cookies );

    const clientClickDoTest1 = (e) => {
        console.log("clientClickDoTest1()");
        
        //CryptoHelpers.cryptoModuleTest();

        test1ResultSet("Done");
        }
    
    const handleChange = (e) => {
        this.setState( {name: e.target.value} );
        }
    
    const doForm = event => {
        event.preventDefault() // don't redirect the page
        // where we'll add our form logic
        console.log("do Form submit");
        }
    
    return (
        <Fragment>
            {/* <Layout title="Title" description="Desc">*/}
            <h1>Test Cipher - Cipher1 Test encrypt &amp; decrypt functions</h1> 

            <Nav defaultActiveKey="/home" as="ul" style={{}}>
                
                <Nav.Item as="li">
                    <Nav.Link href="#" onClick={clientClickDoTest1}>Do Module Test 1</Nav.Link>
                </Nav.Item>

            </Nav>

            {/*
            <form onSubmit={doForm}>
                data in: <input type="text" value="" onChange={handleChange} />
                data out: <input type="text" value="" onChange={handleChange} />
                <button type="submit">Do Something</button>
            </form>
            <br/>*/}

            Server (serverprops direct) data.test is={props.data.test}<br/>
            
            Test1 Result = { test1Result }<br/>
            
            <br/><br/>

            {/*</Layout>*/}

        </Fragment>
    );


  }




  
//Page render time, server only.
export const getServerSideProps = async ({req, res, query}) => {
    console.log("getServerSideProps()");

    CryptoHelpers.cryptoModuleTest();

    return {
        props:
            {
            data: 
                {
                propsSet: true,
                test: "hello from ServerSideProps",
                other: "other"
                }
            }
        }

    }

