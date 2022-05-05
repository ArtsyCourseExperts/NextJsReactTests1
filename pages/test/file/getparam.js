
// Testing Url params

import Layout from '/view/full-layout.jsx'

import UrlHelpers from "/utils/file/url-helpers";


export default function Index() {

    return (
        <>
            <Layout title="Title" description="Desc">
            <h1>Test File URL Params</h1> 
    
            (START)
            { UrlHelpers.getUrlQueryString() }
            (END)

            <br/><br/>

            </Layout>

        </>
    );

  
  }



