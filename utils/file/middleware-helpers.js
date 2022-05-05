




function removeServerProtocolAddressPort( strFullPath ) 
    {
    let pathName = strFullPath;
    
    //console.log("removeServerProtocolAddressPort(), ", strFullPath);

    if ( pathName.toLowerCase().startsWith( "http://") )
        {
        pathName = pathName.slice(7);
        }
    else if ( pathName.toLowerCase().startsWith( "https://") )
        {
        pathName = pathName.slice(8);
        }
    
    //console.log("now evaluating=",pathName);

    //Do this programattically.
    let localDomain = "localhost:3000"; //"localhost:"+process.env.EXPRESS_PORT || ; 
    localDomain = localDomain.toLowerCase();
    localDomain = localDomain.trim();

    //console.log("localDomain is=", localDomain);

    if ( pathName.startsWith( localDomain ) )
        {//Develop
        pathName = pathName.slice( localDomain.length );
        }
    //console.log("now evaluating=",pathName);

    //console.log("FYI localDomain="+localDomain);

    if ( pathName.startsWith("www."))
        {
        pathName = pathName.slice(4);
        }

    //Do this programatically
    let serverDomain = process.env.PROD_DOMAIN || "artsycourseexperts.com"; 
    serverDomain = serverDomain.toLowerCase();
    if ( pathName.startsWith( serverDomain ) )
        {
        pathName = pathName.slice( serverDomain.length );
        }

    return pathName;
    }



module.exports = {
    removeServerProtocolAddressPort
    };

