import React from 'react'
//import HtmlHead from '../components/html-head-OLD';

import ContentHeader from '../components/content-header'
import ContentFooter from '../components/content-footer'

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
  
const contentStyle = {
    /*
    flex: 1,
    display: "flex",
    flexDirection: "column"
    */
    padding: "10px"
    };


//called like this →   <Layout title="About Title" description="About Desc">
    
const Layout = props => (
//const Layout = ({ children }) => {

    <div className="app-parent-container"  >
        
        <div id="middle" className="app-content-container" >

            {/*<HtmlHead title={props.title} description='{props.description}'/>*/}

            <ContentHeader/>
            
            {/*<h1 className="text-red">FULL LAYOUT</h1>*/}
            
            <div className="Content" style={contentStyle}>
                {/*props.title, props.children*/}
                {props.children}
            </div>

            <ContentFooter/>

        </div>

    </div>
    );


export default Layout;