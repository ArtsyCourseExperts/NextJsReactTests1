
//About js.
//https://github.com/vercel/next.js/blob/main/examples/api-routes-middleware/pages/index.js


import Layout from '/view/full-layout.jsx'

import uuid from "/utils/math/uuid-helpers.js"

export default function Index() {

    let val = uuid.getUuid();

    return <div>
            <Layout title="Title" description="Desc">
                <h1>Test uuid</h1> 
                
                {`Sample UUID=${val}`}

            </Layout>
        </div>

  }



