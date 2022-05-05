

//https://www.npmjs.com/package/uuid

import { v4 as uuidv4 } from 'uuid';



//May need to use Base64 for this stuff when inside cookies.



function getUuid() 
    {
    let x = uuidv4(); // ⇨ '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d'
    
    return x;
    }

module.exports = {
    getUuid
    };
