import Layout from '/view/padded-middle-layout.jsx'

import Head from 'next/head'
import {Fragment} from 'react';
import prisma from '/utils/db/prisma-helpers'


let Props = 
    {
    feed: []
    } 


export default function Auth1( props ) {

    console.log("Inside page");

    return (
        <Fragment>
            
            <Layout>
                <h1>Using prisma cookie for auth</h1> 

                
                <br/><br/>
                Feed is=<br/>
                {feed}



            </Layout>

        </Fragment>
    );

}


//https://www.prisma.io/docs/support/help-articles/nextjs-prisma-client-dev-practices

export const getServerSideProps = async({ req }) => {
  //const res = await fetch('http://localhost:3000/api/feed')

    const token = req.headers.AUTHORIZATION
    const userId = await getUserId(token)
  
    const posts = await prisma.post.findMany({
        where: {
        author: { id: userId },
        },
    })

    return { props: { posts } }


  /*
  let posts = await prisma.samplePlaylist.createMany({
    data: playlists,
  });

  
  //res.json(posts)

  //const feed = await res.json()
  return {
    props: { posts },
  }
  */
}

