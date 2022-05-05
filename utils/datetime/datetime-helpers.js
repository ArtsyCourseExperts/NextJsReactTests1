
//https://github.com/Blazity/next-saas-starter/blob/master/utils/formatDate.ts


//TO DO  

import isValid from 'date-fns/isValid';
import { format, formatDistance, formatRelative, subDays } from 'date-fns';


function formatDate(date) 
    {
    return isValid(date) ? format(date, 'do MMMM yyyy') : 'N/A';
    }


function getYyyyhMmhDd() 
    {
    return format(new Date(), "yyyy-MM-dd'T'HH:mm:ss.SSSxxx");
    }


function getYyyyhMmhDdTHhcMmcSs() 
    {
    return format(new Date(), "yyyy-MM-dd'T'HH:mm:ss");
    }

    
function getDayOfWeekLong() 
    {
    return format(new Date(), "eeee");
    }

    
module.exports = {
    formatDate,
    getDayOfWeekLong,
    getYyyyhMmhDd,
    getYyyyhMmhDdTHhcMmcSs

    };
