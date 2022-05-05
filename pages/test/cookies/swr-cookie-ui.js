
//About js.
//https://github.com/vercel/next.js/blob/main/examples/api-routes-middleware/pages/index.js


//SWR helps me render cached data while I get latest data on client. 
import useSWR from 'swr'

import Link from 'next/link'

import Layout from '/view/full-layout.jsx'


const fetcher = (url) => fetch(url).then((res) => res.text())


export default function Index() {
    //const { data, error } = useSWR('/api/cookies', fetcher)
    let data = null;
    
    //if (error) return <div>Failed to load</div>
    
    //if (!data) return <div>Loading...</div>
  
    function sayHello() {
        alert('You clicked me!');
            }

            
    const handleClick = (e, path) => {
        if (path === "/about") {
            console.log("I clicked on the About Page");
        }

        if (path === "/posts") {
            console.log("I clicked on the Posts Page");
            }


        if (path === "create") {
            console.log("About to create cookie");

            
            }

        if (path === "delete") {
            console.log("About to delete cookie");


            }
        };

    return <div>
    
            <Layout title="Title" description="Desc">
                <h1>Test Cookie UI</h1> 
                <br/><br/>

                <button onClick={sayHello}>Default</button>

                <Link style="color:blue" href="/about">
                  <a >Go to about page</a>
                </Link>
                <br/>

                <Link href="#">
                      <a onClick={(e) => handleClick(e, "create")}>Create Cookie</a>
                </Link>
                <br/>

                <Link href="#">
                      <a onClick={(e) => handleClick(e, "delete")}>Delete Cookie</a>
                </Link>
                <br/>

                <Link href="/about">
                      <a onClick={(e) => handleClick(e, "/about")}>About 2</a>
                </Link>
                <br/>


                {`Cookie from response: "${data}"`}

            </Layout>
        </div>



  }



