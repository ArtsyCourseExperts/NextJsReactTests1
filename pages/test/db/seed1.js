import Layout from '/view/padded-middle-layout.jsx'

import Head from 'next/head'
import {Fragment} from 'react';
import prisma from '/utils/db/prisma-helpers'


let Props = 
    {
    feed: []
    } 


export default function Prisma1( props ) {

    console.log("Inside Seed1")

    return (
        <Fragment>
            
            <Layout>
                <h1>Show content from the prisma seed file.</h1> 

                
                <br/><br/>
                Feed is=<br/>
                {feed}



            </Layout>

        </Fragment>
    );

}


export const getServerSideProps = async({ req }) => {
  //const res = await fetch('http://localhost:3000/api/feed')

  let posts = await prisma.samplePlaylist.createMany({
    data: playlists,
  });

  
  //res.json(posts)

  //const feed = await res.json()
  return {
    props: { posts },
  }
}

