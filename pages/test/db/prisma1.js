import Layout from '/view/padded-middle-layout.jsx'

import Head from 'next/head'
import {Fragment} from 'react';
import PrismaHelpers from '/utils/db/prisma-helpers'
import AceDbHelpers from '/utils/ace/db/ace-db-helpers'

/*
let Props = 
    {
    feed: []
    } 
*/


export default function Prisma1( props ) {

    console.log("Inside Prisma1")

    return (
        <Fragment>
            
            <Layout>
                <h1>Prisma1</h1> 

                Trying to get live data from ace_test_table
                
                <br/><br/>
                Param is={props.name}<br/>
                
                color= {props.color} <br/>

                DB Valid= {props.validText} <br/>

            </Layout>

        </Fragment>
    );

}


//Page render time
export const getServerSideProps = async ({req}) => {
  //const res = await fetch('http://localhost:3000/api/feed')

  //AceTestTable

  let dbValid = await AceDbHelpers.isDbConnWorking();
  //dbValid=false;  

  let dbValidText = "false";
  if ( dbValid )
    {
    dbValidText = "true";
    }

  let color1 = "red";
  
  console.log("Got dbValid=", dbValid);

  const posts = []; // await PrismaHelpers.prisma.aceTest1.findMany();

  //const posts = await prisma.AceTestTable.findMany({
    //where: { published: true },
    //include: { author: true },
  //})
  
  //res.json(posts)

  //const feed = await res.json()
  return {
    props: 
        { 
          posts 
        , name: "angel"
        , color: color1
        , valid: dbValid
        , validText: dbValidText
        
        },
    //dbValid: dbValid
    }
}





