/*
Common HTML head section for all app.

to use, put this in page.

import React from 'react';
import Head from '../components/html-head';

export default ({ children, as, settings = {}, title="default text" }) => (
    <main>
        <Head title={title}>
        <div className="app__container">
            <div className="row">{children}</div>
        </div>
    </main>
);

*/

import React from 'react';
import NextHead from 'next/head';


//{styleTags}

const Head = ({ title, description, children }) => (
    <NextHead>
        <meta charSet="UTF-8" />
        <meta name="title" content={ title || 'ArtsyCourseExperts'} />
        <meta name="description" content={description || 'Helping creative teachers with their online courses.'} />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" key="viewport" />

        {children}

        {/*
        http://localhost:3000/images/favicon.png
        The link may not even be necessary in the latest next.js
        
        Future

        <link rel="apple-touch-icon" sizes="180x180" href="/favicons/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicons/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicons/favicon-16x16.png" />

        */}
        <link rel="shortcut icon" href="/favicon.png" />
        
        

        {/* Other stuff is added here automatically.

        //<meta name="next-head-count" content="4">
        //Script...
        //Style..   from pages/_app.js imports
        //NoScript
        //Style

        //Technically I could add more styles or other stuff here...

        //TO DO ^ add other stuff like goog analytics etc.

        */}
    </NextHead>
    );


export default Head;
