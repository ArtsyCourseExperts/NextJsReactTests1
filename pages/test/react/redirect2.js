//Redirect test
//https://reactgo.com/react-router-redirection/
//Rendering a <Redirect> will navigate to a new location. The new location will override the current location in the history stack, like server-side redirects (HTTP 3xx) do.
//https://v5.reactrouter.com/web/api/Redirect

import Layout from '/view/full-layout.jsx'

import TestComponent from '/components/test/react-router-part';

export default function Index() {
    

    return (
        <>
        <Layout title="Title" description="Desc">
            <h1>Test Redirect</h1> 

        {/* bRedirect ? <Redirect  to="/about" /> : null  */}

            <TestComponent></TestComponent>

        </Layout>
        </>
        );

    }
