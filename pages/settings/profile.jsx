//About js.

import Layout from '/view/20sidebar-80tool.jsx'

import Head from 'next/head'
import {Fragment} from 'react';
import SeoAceHelpers from '/utils/ace/seo-ace-helpers.js'

//console.log("in pages/about.jsx");

export default function Index() {

    console.log("In about.jsx");

    let title= SeoAceHelpers.getPrefixedPageTitle( "Settings" );

    return (
        <Fragment>
            
            <Head>
                <title>{title}</title>
                <meta property="og:title" content={title} key="title" />
                <meta name="description" content="meta desc created in about.jsx " />
            </Head>

            <Layout title="OLD About Title" description="OLD About Desc">
                <h1>Settings</h1> 

                <h2>Name</h2>
                
                <h2>Email</h2>
                We help creatives with their online courses.  We help creatives with their online courses. 

                
                <br/><br/>
            </Layout>

        </Fragment>
    );

}


