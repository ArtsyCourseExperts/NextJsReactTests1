import React from 'react'
//import HtmlHead from '../components/html-head';

import ContentHeader from '../components/content-header'

import "../pages/_app.js"


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

    <div className='Layout' style={layoutStyle} >

        {/*<HtmlHead title='{props.title}' description='{props.description}'/>*/}

        <ContentHeader/>

        <h1>Test Content Header</h1>
        

    </div>
);

export default Layout;