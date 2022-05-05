//Index js.
import Layout from '/view/20sidebar-80tool.jsx'
import JwtHelpers from '/utils/cookies/jwt-helpers'
import JwtHelpersAce from '/src/cookies/jwt-helpers-ace'

console.log("in /pages/index.jsx");

export default function Index(props) {

    console.log("index.js function");
    console.log("props=",props);

    return (
        <>
            <Layout pagedata={props} title="About Title" description="About Desc">
                <h1>Index</h1>
                Index 

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

    //AceTestTable

    //const posts = await PrismaHelpers.prisma.aceTest1.findMany();
    //const posts = await PrismaHelpers.prisma.samplePost.findMany();

    //const posts = await PrismaHelpers.prisma.aceTest1.findMany();
    //console.log("got posts=", posts );
    //console.log("posts[0]=", posts[0] );
    
    //let passwordReal = "thePass";       //await ArgonHelpers.createHash("thePass");
    //console.log("getServerSideProps()-real password hash is=",passwordReal);
    
    //let passwordEnteredNow = await ArgonHelpers.createHash("thePass");
    //console.log("getServerSideProps()-real password entered now is=",passwordEnteredNow);

    //let passwordGood = await ArgonHelpers.verifyHash( passwordEnteredNow , passwordReal); 
    //console.log("getServerSideProps()- passwordGood=", passwordGood );
    //console.log( "passwordGood type=", typeof(passwordGood) );

    let jwtTokenDirect = "";
    console.log("jwt1 - getServerSideProps() - about to call jwtGetData()")
    jwtTokenDirect = await JwtHelpers.jwtGetToken( req , JwtHelpersAce.jwtGetCookieName() );
    console.log("jwt1 - getServerSideProps() - jwtTokenDirect=", jwtTokenDirect );
    if ( !jwtTokenDirect )
        {
        jwtTokenDirect = "";
        }
    

    // THIS IS NOT WORKING!!!   I can't get JWT from Serverside using this request.
    
    /*
    console.log("getServerSideProps() - about to call jwtGetTokenDataVerified()")
    let jwtToken = JwtHelpers.jwtGetTokenDataVerified( req, JwtHelpersAce.jwtGetCookieName() );
    if ( !jwtToken )
        {
        console.log("error no token?");
        jwtToken = "0";
        }
    jwtTokenDirect = jwtToken;
    */
    console.log("getServerSideProps() - jwtTokenDirect=", jwtTokenDirect );

    //setJwtCookieDataPageLoad(  JSON.stringify(jwtData) );

    let jwtDataFetch = "";
    
    //console.log("jwt1 - getServerSideProps() - axios.get PRE" );
    //const response = await axios.get("/api/test/jwt-read");
    //console.log("jwt1 - getServerSideProps() - axios.get, ", response );


    /*
    await axios.post("/api/test/jwt-read", null )
            .then(res => {
            console.log("jwt1 - getServerSideProps()- axios.post() complete ");
            console.log("jwt1 - getServerSideProps()- data was ", res);

            //uniqueUserId

            //setJwtCookieDataRead(  JSON.stringify(res.data) );
            jwtDataFetch = res.data;
            
            //console.log(res.data);
            })
    */

    console.log("getServerSideProps() - done with jwt-read");
    const results = []; // await PrismaHelpers.prisma.aceTest1.findMany();
    
    return {
        props:
            {
            serversideprops: 
                {
                propsSet: true,
                test: "hello from server",
                other: "other",
                jwtdirect: jwtTokenDirect,
                jwtfetch: jwtDataFetch
                //,
                //req: req
                }
            }
        }

    }

