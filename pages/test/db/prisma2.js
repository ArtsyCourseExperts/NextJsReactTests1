import Layout from '/view/padded-middle-layout.jsx'

import Head from 'next/head'
import {Fragment} from 'react';
import PrismaHelpers from '/utils/db/prisma-helpers'

/*
let Props = 
    {
    feed: []
    } 
*/

export default function Prisma2( props ) 
    {

    console.log("Inside Prisma2")

    return (
        <Fragment>
            
            <Layout>
                <h1>Prisma2</h1> 

                Trying to get live data from aceTest1
                
                <br/><br/>
                Data is={props.data.email}<br/>
        
            </Layout>

        </Fragment>
        );

    }


//Page render time
export const getServerSideProps = async ({req}) => {
    //const res = await fetch('http://localhost:3000/api/feed')

    //AceTestTable

    //const posts = await PrismaHelpers.prisma.aceTest1.findMany();
    //const posts = await PrismaHelpers.prisma.samplePost.findMany();

    const posts = await PrismaHelpers.prisma.aceTest1.findMany();

    console.log("got posts=", posts );

    console.log("posts[0]=", posts[0] );

    //const posts = await prisma.AceTestTable.findMany({
        //where: { published: true },
        //include: { author: true },
    //})

    //console.log("DB returened=", posts );
  
    //res.json(posts)

    //const feed = await res.json()
    
    //const feed = await res.json()
    
    const results = []; // await PrismaHelpers.prisma.aceTest1.findMany();
    
    return {
        props:
            {
            data: posts[0]
            }
        }

    }





