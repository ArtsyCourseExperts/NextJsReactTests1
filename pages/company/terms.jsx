//About js.

import Layout from '/view/padded-middle-layout.jsx'
import Head from 'next/head'
import {Fragment} from 'react';
import SeoAceHelpers from '/utils/ace/seo-ace-helpers.js'

export default function Index() {

    let title= SeoAceHelpers.getPrefixedPageTitle( "Terms of Service" );

    return (
    
        <Fragment>

            <Head>
                <title>{title}</title>
                <meta property="og:title" content={title} key="title" />
                <meta name="description" content="meta desc created in about.jsx " />
            </Head>

            <Layout title="Privacy Title" description="About Desc">
                <h1>Terms and Conditions</h1>

                STuff goes here.

                <br/><br/>

            </Layout>

        </Fragment>
        
    )
    }
