
//=================

export async function ipGetRequestClientAddress( req ) 
    {
    
    let forwarded = req.headers["x-forwarded-for"];
    if ( forwarded )
        {
        forwarded = forwarded.split(/,/)[0];
        console.log("got forwarded IP.", forwarded);
        }
    
    let realip = req.headers['x-real-ip'];
    if ( realip )
        {
        console.log("got real IP.", realip );
        }

    let ip = realip ? realip : req.connection.remoteAddress;

    //const ip = req.connection.remoteAddress
    
    if ( !ip || 0 == ip.length )
        {
        console.log("ipGetRequestClientAddress() - no IP?");
        return ( null );
        }

    console.log("ip=", ip );
    if (ip.substr(0, 7) == "::ffff:") 
        {
        ip = ip.substr(7);
        }

    if (ip == "::1") 
        {//Local, loopback, usually for Development.
        ip = "127.0.0.1";
        }

    return ip;
    }
//=================


module.exports = 
    {
      ipGetRequestClientAddress
    };
