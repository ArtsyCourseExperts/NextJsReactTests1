import React from 'react'
//import Head from '../components/html-head';

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
    display: "flex",
    flexDirection: "column",
    height: "100%",
    width: "100%"
  };
  
const contentStyle = {
    flex: 1,
    display: "flex",
    flexDirection: "column"
  };


const Layout = props =>(

    <div className="Layout" style={layoutStyle} >

        {/* <h1 className="text-red">BODY ONLY LAYOUT</h1>*/}
        
        <div className="Content" style={contentStyle}>
        {props.children}
        </div>

    </div>
);

export default Layout;