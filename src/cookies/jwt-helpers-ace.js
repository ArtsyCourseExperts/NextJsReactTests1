//Cookies for this app.

//My main ID in the users table.  This is the GUID.  Using this instead of email.
function jwtGetKeyFieldName() 
    {
    return ( "uniqueUserId" );
    }
//=================


//Main JWT cookie name
function jwtGetCookieName() 
    {
    return ( "auth" );

    //Note some apps use 'access-token'
    }
//=================


//Get how long ACE cookies last.  
//How long a user can stay logged in without logging in again.
//Also a user can log out and then this will get wiped out and force a login prompt.
function jwtGetCookieDays() 
    {
    return ( 7 );
    }
//=================


module.exports = {
      jwtGetCookieName
    , jwtGetKeyFieldName
    , jwtGetCookieDays
    };

