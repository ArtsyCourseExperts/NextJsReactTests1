import React from 'react'
import Head from 'next/head'

export default function Layout(props) {
  return <div>
    <Head>
      <title>Title</title>

      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"/>
      
      <meta name="description" content="Description"/>
      <meta name="keywords" content="nextjs,express"/>
      <meta name="author" content="ArtsyCourseExperts"/>

      <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1"/>

    </Head>
    <div style={{
      width: "70%",
      margin: "auto",
      paddingTop: "16px"
    }}>

    <h1>Test Layout</h1>
    {props.children}
    </div>
    
  </div>
}