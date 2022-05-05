
//Index js.
import Layout from '/view/20sidebar-80tool.jsx'

console.log("in /pages/index.jsx");

export default function Index(props) {

    console.log("index.js function");
    
    console.log("props=",props);

    return (
        <>
            <Layout pagedata={props} title="About Title" description="About Desc">
                <h1>Tools Main</h1>
                
                Tools Home page 

                <br/>
                <br/>

                Please select a tool from the side navigation bar. 


                <br/><br/>

            

            </Layout>

        </>
    );

  
  }



//Page render time, server only.
export const getServerSideProps = async ({req, res, query}) => {
    console.log("content-header - getServerSideProps()");

    //const res = await fetch('http://localhost:3000/api/feed')
    console.log("getServerSideProps() - done with jwt-read");
    const results = []; // await PrismaHelpers.prisma.aceTest1.findMany();
    
    return {
        props:
            {
            serversideprops: 
                {
                propsSet: true,
                test: "hello from server",
                other: "other"
                //,
                //req: req
                }
            }
        }

    }

