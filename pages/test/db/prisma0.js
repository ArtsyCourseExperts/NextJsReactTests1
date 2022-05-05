import Layout from '/view/padded-middle-layout.jsx'

import Head from 'next/head'
import {Fragment} from 'react';

import prisma from '/utils/db/prisma-helpers'


let Props = 
    {
    feed: []
    } 


export default function Prisma1( props ) {

    console.log("Inside Prisma0")

    return (
        <Fragment>
            
            <Layout>
                <h1>Prisma0</h1> 

                Imported prisma-helpers                 
                <br/><br/>

            </Layout>

        </Fragment>
    );

}


export const getServerSideProps = async ({req}) => {
  //const res = await fetch('http://localhost:3000/api/feed')

  const posts= [];

  /*
  const posts = await prisma.post.findMany({
    where: { published: true },
    //include: { author: true },
  })
  */

  //res.json(posts)

  //const feed = await res.json()
  return {
    props: { posts },
  }
}





