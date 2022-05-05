
// Testing for REACT-COOKIE package.

//https://dev.to/debosthefirst/how-to-use-cookies-for-persisting-users-in-nextjs-4617

//Designed for...
// pages/login.js
import { useCookies } from "react-cookie"
import CookiesAce from "/utils/ace/cookies-ace"
import Layout from '/view/full-layout.jsx'
import CookiesReactHelpers from "/utils/cookies/cookies-react-helpers"
import Nav from 'react-bootstrap/Nav';
import {Fragment} from 'react';
import ArgonHelpers from '/utils/math/argon-helpers'


export default function Index( props ) {

    console.log("Index()");
    //const [cookies, setCookie, removeCookie] = useCookies([ CookiesAce.getCookieNameForTest() ]);
    
    //let cookieOptions = CookiesAce.getCookieDefaultOptions();

    //https://www.npmjs.com/package/react-cookie
    //let value=cookies[ CookiesAce.getCookieNameForTest() ]; //get( CookiesAce.getCookieNameForTest(), {} );

    //Cookies are client side.
    let cookieValue = CookiesReactHelpers.getCookieValue( CookiesAce.getCookieNameForApp() );

    //console.log( cookies );

    const clientClickEvent1 = (e) => {
        console.log("clientClickEvent1()");
        }
    
    const clientClickLogin = (e) => {
        console.log("clientClickLogin()");
        

        }
    
    return (
        <Fragment>
            {/* <Layout title="Title" description="Desc">*/}
            <h1>Test Cookies - Test Tool</h1> 


            <Nav defaultActiveKey="/home" as="ul" style={{}}>
                
                <Nav.Item as="li">
                    <Nav.Link href="/">Signup</Nav.Link>
                </Nav.Item>

                <Nav.Item as="li">
                    <Nav.Link href="/">Login Joe</Nav.Link>
                </Nav.Item>
                
                <Nav.Item as="li">
                    <Nav.Link href="/">Logout</Nav.Link>
                </Nav.Item>

                <Nav.Item as="li">
                    <Nav.Link href="#" onClick={clientClickEvent1} >Test1</Nav.Link>
                </Nav.Item>


            </Nav>
            

            Cookie Value current={cookieValue}<br/>

            Server data.test is={props.data.test}<br/>

            Server data.passwordGood is={props.data.passwordGood}<br/>


            <br/><br/>

            {/*</Layout>*/}

        </Fragment>
    );


  }




  
//Page render time
export const getServerSideProps = async ({req}) => {
    console.log("getServerSideProps() for test-tool page");

    //const res = await fetch('http://localhost:3000/api/feed')

    //AceTestTable

    //const posts = await PrismaHelpers.prisma.aceTest1.findMany();
    //const posts = await PrismaHelpers.prisma.samplePost.findMany();

    //const posts = await PrismaHelpers.prisma.aceTest1.findMany();
    //console.log("got posts=", posts );
    //console.log("posts[0]=", posts[0] );
    
    let passwordReal = "thePass";       //await ArgonHelpers.createHash("thePass");
    //console.log("getServerSideProps()-real password hash is=",passwordReal);
    
    let passwordEnteredNow = await ArgonHelpers.createHash("thePass");
    console.log("getServerSideProps()-real password entered now is=",passwordEnteredNow);

    let passwordGood = await ArgonHelpers.verifyHash( passwordEnteredNow , passwordReal); 
    console.log("getServerSideProps()- passwordGood=", passwordGood );
    console.log( "passwordGood type=", typeof(passwordGood) );

    const results = []; // await PrismaHelpers.prisma.aceTest1.findMany();
    
    return {
        props:
            {
            data: 
                {
                test: "hello from server",
                passwordGood: passwordGood
                }
            }
        }

    }


