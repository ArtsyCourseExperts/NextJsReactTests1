//About js.

import Layout from '/view/20sidebar-80tool.jsx'

import Head from 'next/head'
import {Fragment} from 'react';
import SeoAceHelpers from '/utils/ace/seo-ace-helpers.js'
import Accordion from 'react-bootstrap/Accordion';

//console.log("in pages/about.jsx");

export default function Index() {

    let title= SeoAceHelpers.getPrefixedPageTitle( "Help Center" );

    return (
        <Fragment>
            
            <Head>
                <title>{title}</title>
                <meta property="og:title" content={title} key="title" />
                <meta name="description" content="meta desc created in about.jsx " />
            </Head>

            <Layout>
                <h1>Help Center</h1> 

                <h2>Getting Started</h2>
                <Accordion>
                    <Accordion.Item eventKey="0">
                        <Accordion.Header>What are the Artsy Course Tools?</Accordion.Header>
                        <Accordion.Body>
                        velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                        cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
                        est laborum.
                        </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="1">
                        <Accordion.Header>Are ArtsyCourseTools Free?</Accordion.Header>
                        <Accordion.Body>
                        velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                        cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
                        est laborum.
                        </Accordion.Body>
                    </Accordion.Item>
                    </Accordion>
                <br/>

                <h2>Tools</h2>
                <Accordion>
                    <Accordion.Item eventKey="0">
                        <Accordion.Header>What are the Artsy Course Tools?</Accordion.Header>
                        <Accordion.Body>
                        velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                        cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
                        est laborum.
                        </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="1">
                        <Accordion.Header>Are ArtsyCourseTools Free?</Accordion.Header>
                        <Accordion.Body>
                        velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                        cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
                        est laborum.
                        </Accordion.Body>
                    </Accordion.Item>
                    </Accordion>



                {/*
                Will it work on mobile?

                <h2>Tools</h2>
                Help using specific tools 

                <h2>Pro Version</h2>
                All about the pro version of the tools.

                <h2>Profile/Settings</h2>
                How to view/change your name, email, password.
                
                <Accordion defaultActiveKey="0">
                    <Accordion.Item eventKey="0">
                        <Accordion.Header>Accordion Item #1</Accordion.Header>
                        <Accordion.Body>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
                        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
                        commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
                        velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                        cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
                        est laborum.
                        </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="1">
                        <Accordion.Header>Accordion Item #2</Accordion.Header>
                        <Accordion.Body>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
                        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
                        commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
                        velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                        cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
                        est laborum.
                        </Accordion.Body>
                    </Accordion.Item>
                    </Accordion>
                */}
                <br/><br/>
            </Layout>

        </Fragment>
    );

}


