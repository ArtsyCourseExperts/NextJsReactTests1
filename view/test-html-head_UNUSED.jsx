import React from 'react';
import HtmlHead from '../components/html-head-OLD';

export default function Layout(props) {
  return <div>

        <HtmlHead title='{props.title}' description='{props.description}'/>
        
        <div style={{
        width: "70%",
        margin: "auto",
        paddingTop: "16px"
            }}>

            <h1>Test Layout</h1>
            {props.children}

        </div>
        
    </div>
}