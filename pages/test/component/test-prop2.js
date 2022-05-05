

import Layout from '/view/full-layout.jsx'

import Welcome from '/components/test/prop2.js';

export default function Index() {

    return (
        <>
        <Layout title="Title" description="Desc">
            <h1>Test Component Prop2</h1> 


            <Welcome name="The Param" />

            <br/>
        </Layout>
        </>
        );

    }
