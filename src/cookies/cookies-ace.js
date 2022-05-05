//Cookies for this app.

function getCookieNameForApp() 
    {
    return ( "ACE" );
    }

function getCookieNameForLoggedIn() 
    {
    return ( "logged_in" );
    }


function getCookieNameForUser() 
    {
    return ( "user" );
    }


function getCookieNameForId() 
    {
    return ( "session_id" );
    }


function getCookieNameForTest() 
    {
    return ( "ace-test" );
    }


module.exports = {
    getCookieNameForApp,
    getCookieNameForLoggedIn,
    getCookieNameForUser,
    getCookieNameForId,
    getCookieNameForTest
    };

