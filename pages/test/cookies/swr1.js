
//About js.
//https://github.com/vercel/next.js/blob/main/examples/api-routes-middleware/pages/index.js

import useSWR from 'swr'

import Layout from '/view/full-layout.jsx'


const fetcher = (url) => fetch(url).then((res) => res.text())


export default function Index() {
    
    const { data, error } = useSWR('/api/cookie-SWR', fetcher)
  
    if (error) return <div>Failed to load cookie</div>
    
    if (!data) return <div>Loading...</div>
  

    //Got data
    return <div>{`Cookie from response: "${data}"`}</div>

  }
