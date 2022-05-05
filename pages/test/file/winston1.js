
// Testing Url params

import Layout from '/view/full-layout.jsx'

import logger from '/config/winston';


export default function Index() {

    logger.info("Test infom message");

    logger.warn("Test warning level message");


    return (
        <>
            <Layout title="Title" description="Desc">
            <h1>Test Winston logging</h1> 
    
            <br/><br/>

            </Layout>

        </>
    );

  
  }


