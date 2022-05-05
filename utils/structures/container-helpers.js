
//https://github.com/Blazity/next-saas-starter/blob/master/utils/formatDate.ts


//TO DO  

import isValid from 'date-fns/isValid';
import { format, formatDistance, formatRelative, subDays } from 'date-fns';


function isEmptyObject( obj ) 
    {
    const isEmpty = Object.keys(obj).length === 0;
    return (isEmpty)
    }

    
module.exports = {
    isEmptyObject 
    };
