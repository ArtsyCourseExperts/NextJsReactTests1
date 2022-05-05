
import Layout from '/view/full-layout.jsx'

import Link from 'next/link'


export default () => (
    <Layout title="Title" description="Desc">
        <h1>Test Links</h1>

        Normal Anchor link to <a href="/">root</a><br/>
        
        Normal Anchor link to <a href="/company/about">company - about</a><br/>
        
        Next Link to <Link href="/company/about"><a>About</a></Link><br/>

    </Layout>
  );

