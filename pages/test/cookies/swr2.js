
//About js.
//https://github.com/vercel/next.js/blob/main/examples/api-routes-middleware/pages/index.js


//SWR helps me render cached data while I get latest data on client. 
import useSWR from 'swr'


import Layout from '/view/full-layout.jsx'


const fetcher = (url) => fetch(url).then((res) => res.text())


export default function Index() {
    const { data, error } = useSWR('/api/cookie-SWR', fetcher)
  
    if (error) return <div>Failed to load</div>
    
    if (!data) return <div>Loading...</div>
  
    return <div>
            <Layout title="Title" description="Desc">
                <h1>Test Cookie 1</h1> 
                
                {`Cookie from response: "${data}"`}

            </Layout>
        </div>

  }



