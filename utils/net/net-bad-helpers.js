
//import EmailHelpers from "/utils/email/email-helpers";

import IpHelpers from "/utils/net/ip-helpers.js"


//=================

let dbBadIpRecordsCache = {};

//=================


async function isAllowedRequest( req ) 
    {
    //console.log("isAllowedRequest()");

    //console.log("req=", req );


    //CHECK Source IP


    //Check source country




    //Check desired path

    //console.log("query=", query);
    // url: '/misc/investigating?Fish=yes',
    if ( isBadPath( req.url ) )
        {
        console.log("isAllowedRequest() - Bad Path found");
        return ( -1 );
        }


    let ip = await IpHelpers.ipGetRequestClientAddress( req );
    console.log("isAllowedRequest(), ip=", ip );
    if ( isBadIp( ip ) )
        {
        console.log("isAllowedRequest() - Bad Path found");
        return ( -1 );
        }

    //Check for invalid METHODS like PUT.


    //console.log("isAllowedRequest() - GOOD");

    //All pass for now
    return ( 1 );

    }
//=================


function isBadPath( url ) 
    {
    //console.log("isBadPath() - url=", url);
    
    let tokens = 
        [            
        //, "select "
          "/test/badpath"
        , "/test/data"
        , "/htaccess."
        ];

    url = url.toLowerCase();
    let bSafe = true;

    //url: '/misc/investigating?Fish=yes',
    
    let bFound = tokens.some( token => url.startsWith(token) );
    if ( bFound )
        {//Found bad word
        console.log("isBadPath() - Found bad path");
        return ( true );
        }

    //Nothing bad found.
    return ( false );
    }
//=================


function isBadIp( addressIp ) 
    {
    //console.log("isBadIp() - IP=", addressIp );
    
    let tokens = 
        [            
          "1.2.3.4"
        , "22.33.44.55"
        //, "127.0.0.1"     //For testing.
        ];

    addressIp = addressIp.toLowerCase();
    let bSafe = true;

    //url: '/misc/investigating?Fish=yes',
    
    let bFound = tokens.some( token => addressIp.startsWith(token) );
    if ( bFound )
        {//Found it
        console.log("isBadIp() - Found bad client IP");
        return ( true );
        }


    //DO THE SAME USING DATABASE...

    // TO DO
    //let badIpAddresses = getBadIpRecords();
    

    // TO DO




    //Nothing bad found.
    return ( false );
    }
//=================


function getBadIpRecords() 
    {
    //console.log("getBadIpRecords()", );
  
    var noDate = (typeof dbBadIpRecordsCache.date === 'undefined');

    let minutesToLive = 60; // 60 minutes to cache.

    this.millisecondsToLive = minutesToLive * 60 * 1000;
    
    if ( dbBadIpRecordsCache && dbBadIpRecordsCache.data )
        {

        let expired = (dbBadIpRecordsCache.date.getTime() + this.millisecondsToLive) < new Date().getTime();

        if ( !expired )
            {
            //debug('Hit ' + name + ' in cache.');
            return dbBadIpRecordsCache.data;
            }
        }

    dbBadIpRecordsCache.data = {};

    

    // TO DO .  Use Prisma lookup.



    //Update timestamp
    dbBadIpRecordsCache.date = new Date(0);
    
    //Nothing found.
    return ( dbBadIpRedordsCache.data );
    }
//=================


module.exports = 
    {
      isAllowedRequest
    , isBadPath
    , isBadIp
    };
