import React from 'react'
//import HtmlHead from '../components/html-head';

import ContentHeader from '../components/content-header'
import ContentFooter from '../components/content-footer'

import ContentSideBar from '../components/side-menu-bar'

//import "../components/full-layout.scss"
//import "../pages/_app.js"

/*
<div style={{
    width: "70%",
    margin: "auto",
    paddingTop: "16px",
    color : "red"
    }}>
*/

const layoutStyle = {
    /*
    display: "flex",
    flexDirection: "column",
    height: "100%",
    width: "100%"
    */
  };
  
  
const navBarStyle = {
    //display: "inline-block",
    "background-color": "green",
    //width: "20%",
    "vertical-align" : "top",
    padding: "5px",
    height: "100%"
  };

const middleRightStyle = {
    //display: "inline-block", 
    //width: "80%",
    width: "100%",
    padding: "10px"
  };


function Layout(props) {
//const Layout = props =>(

    console.log("Layout()");
    console.log("Layout() - props", props);
    
    return(
    <div className="app-parent-container"  >

        <div className="app-content-container" >

            {/*<HtmlHead title={props.title} description='{props.description}'/>*/}

            <ContentHeader layoutdata={props} layoutdata2="test param"/>

            <div className="menu-body-panel">
            
                <div className="" style={navBarStyle}>
                    <ContentSideBar/>
                </div>

                <div className="" style={middleRightStyle}>
                    {/* TOOL PAGE GETS INSERTED HERE */}
                    {props.children}
                </div>

            </div><ContentFooter/></div>
            
    </div>);
    }

export default Layout;