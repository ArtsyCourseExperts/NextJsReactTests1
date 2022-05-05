/* From Vercel next.js demos

https://github.com/vercel/next.js/blob/main/examples/api-routes-middleware/pages/api/cookies.js

//Original sample had this in /pages/api/cookies.js
//Angel moved to /api/
//Samples leave it in /pages/api

//So pages use
import useSWR from 'swr'
//SWR helps me render cached data while I get latest data on client. 

//PAGES that need cookies do this .
const { data, error } = useSWR('/api/cookies', fetcher)

*/

import cookies from '/utils/cookies/cookie-helpers'


const handler = (req, res) => {
    
    console.log("cookie response handler");

    // The cookie middleware will add the `set-cookie` header
    //res.cookie('app', 'ACE');
    // Calling our pure function using the `res` object, it will add the `set-cookie` header
    res.setCookie( 'Next.js', 'This-is-my-cookie-value' );
    
    //To send multiple cookies, multiple Set-Cookie headers should be sent in the same response.  What you have to do instead is pass an array of serialized cookies to the header.


    // Return the `set-cookie` header so we can display it in the browser and show that it works!
    res.end( res.getHeader('Set-Cookie') );

    }

export default cookies(handler);
