// components/Header.js

/*
const headerStyle = {
    backgroundColor: "blue",
    color: "white",
    width: "100%",
    height: "50px"
  };
*/

//import { Link } from 'react-router-dom';
import Link from 'next/link'
//Can't import a css from component.
//import '/styles/content-header.css'

import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Dropdown from 'react-bootstrap/Dropdown';

import React, { Component } from "react";
//import { render } from "react-dom";
import ReactDOM from "react-dom";
import { useEffect } from 'react'
import { useState } from 'react';

//const Header = () => (



// TO DO 
// Use this sample for a smart header depending if Logged in or not.
// Search for {left}
//https://vercel.com/guides/nextjs-prisma-postgres

/*
return (
    <nav>
      {left}
      {right}
      <style jsx>{`
        nav {
          display: flex;
          padding: 2rem;
          align-items: center;
        }
      `}</style>
    </nav>
  );
*/


export default function ContentHeader( props ) {
//class ContentHeader extends Component {

    console.log("content-header - props=", props);
/*
    constructor(props) {
        super(props);
        this.handleLoginClick = this.handleLoginClick.bind(this);
        this.handleLogoutClick = this.handleLogoutClick.bind(this);
        this.state = {isLoggedIn: false};
  */

    //console.log("maintenance page");
    const /*this.*/ tools_style = {
        display: "block",
        color: "green",
        "font-weight": "bold",
        "margin-left": "52px"
        };


    // TO DO do experiment and see if this can be pure JSON object
    //mabye stingfy
    const /*this.*/ tools_styleJSON = {
        display: "block",
        color: "green",
        "font-weight": "bold",
        "margin-left": "52px"
        };

    
    //} 

    

    //let visitorHasCookie = false;

    //let visitorIsPremium = false;
    
    //render()
    //{

    //Code

    

    //Executed Client side, after DOM updates.  EVEN on first render!
    useEffect(() => {
        console.log("content-header - useEffect() once");
       
        
        }, []);     // [] empty array means, runs ONCE after initial rendering

    



    return(
    <div className="content-header" >

        <Container NOTstyle={{"padding-left":"0px", "padding-right":"0px", "margin-left":"0px", "margin-right":"0px"}}>
            <Row style={{"padding-left":"0px", "padding-right":"0px", "margin-left":"0px", "margin-right":"0px"}}>
                {/*1 of 3 */}
                <Col className="d-flex" style={{"padding-left":"0px","padding-right":"0px"}}>    
                    <a href="/">

                        {/* TO DO   Get 200 width image */}

                        <img 
                            className="header-logo-image" 
                            src="/images/ACE_RectLogoName3_400b.png"
                            style={{width:"200px", "max-width":"200px"}}
                            ></img>
                            
                    </a>
                    
                    <Nav defaultActiveKey="/home" as="ul" style={{}}>
                        <Nav.Item as="li">
                            <Nav.Link href="/tools">Tools</Nav.Link>
                        </Nav.Item>
                        {/*
                        <Nav.Item as="li">
                            <Nav.Link eventKey="link-1">Get Pro</Nav.Link>
                        </Nav.Item>
                        */}
                    </Nav>

                    <Dropdown >
                        <Dropdown.Toggle variant="success" id="dropdown-basic">
                            Services
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Dropdown.Item target="_blank" href="https://www.artsycourseexperts.com/automate-your-student-operations/">Student Operations</Dropdown.Item>
                            <Dropdown.Item target="_blank" href="https://www.artsycourseexperts.com/automate-your-course-technology/">Tech Operations</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                &nbsp;&nbsp;

                    <Dropdown >
                        <Dropdown.Toggle variant="success" id="dropdown-basic">
                            Resources
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            <Dropdown.Item target="_blank" href="https://www.ArtsyCourseExperts.com/Blog">Blog</Dropdown.Item>
                            <Dropdown.Item target="_blank" href="https://www.artsycourseexperts.com/apps/">Software</Dropdown.Item>
                            <Dropdown.Item target="_blank" href="https://www.artsycourseexperts.com/media-assets/">Content</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>

                
                </Col>

                {/*Small variable middle */}
                {/*
                <Col md="auto"></Col>
                */}

                {/*small right side */}
                <Col xs lg="3" className="text-right"
                    style={{"padding-left":"0px", "padding-right":"0px", "margin-left":"0px", "margin-right":"0px"}}
                >


{/*let visitorHasCookie = false;

let visitorIsPremium = false;
*/}


                    {/*   
                    anonymous sees      Signup      Login 
                    

                    Registered (cookie) Upgrade     Login
                    Registered sees     Upgrade     Logout 
                    
                    Pro sees                        Login       Profile
                    Pro sees                        Logout      Profile
                    */}


                    {/* 
                    <a className="header-underlined-link" href="https://ArtsyCourseExperts.com/Blog" target="_blank">Blog</a>
                    <span style={{ ["paddingLeft"]: "20px" }} ></span>
                    */}

                    <a className="header-underlined-link" 
                        href="/account/signup" 
                        >Signup</a>
                    <span style={{ ["paddingLeft"]: "20px" }} ></span>


                    <a className="header-underlined-link" href="/account/login" >Login</a>
                    <span style={{ ["paddingLeft"]: "20px" }} ></span>
                    {/*<Link to="/company/about">Login / Signup</Link> */}

                    
                    <a className="header-underlined-link" href="/account/logout" >Logout</a>
                    <span style={{ ["paddingLeft"]: "20px" }} ></span>
                    {/*<Link to="/company/about">Login / Signup</Link> */}

                </Col>
            </Row>


        </Container>
      
    </div>
    )
    
    }   //render
    //  );
  
//} //Class

//export default Header;







//And finally, we have to declare the React DOM Renderer method, which will connect to our root element

//For component classes
/*
if (typeof window !== 'undefined') {

    //ReactDOM.render(<MainWrapper />, document.getElementById("root"));
      
    ReactDOM.render(
        <ContentHeader />,
        document.getElementById('root')
    );


}
*/
//render(<App />, document.getElementById("root"));


