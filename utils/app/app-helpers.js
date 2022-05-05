


//=================

function appHasWindow() 
    {
    if (typeof window !== "undefined") 
        {//Only on server.
        return true;
        }
        
    return false;
    }
//=================


module.exports = {
    appHasWindow
    };
