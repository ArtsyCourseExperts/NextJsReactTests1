

//import React, { Component } from 'react';

/*
let state = {
    stringParam: '',
    numberParam: 0
}
*/


//this.props.location.pathname


const urlParams = () => 
    {
    if (typeof window !== 'undefined') 
        {
        return new URLSearchParams(window.location.search);
        }
    return new URLSearchParams();
    };


const getQueryStringVal = (key) => 
    {
    return urlParams().get(key);
    };


//Useful for client JS functions.
function getCurrentPath()
    {
    let currentPath = null;
    if (typeof window !== 'undefined')
        {
        currentPath = window.location.pathname;
        }
    //console.log("getCurrentPath=", currentPath );
    return ( currentPath );
    }

/*
  console.log(urlParams.has('post')); // true
console.log(urlParams.get('action')); // "edit"
console.log(urlParams.getAll('action')); // ["edit"]
console.log(urlParams.toString()); // "?post=1234&action=edit"
console.log(urlParams.append('active', '1'));
*/
  //const term = queryParams.get("term")



function logQueryParameters() 
    {
    var keys = urlParams.keys();
    for (key of keys) { 
        console.log(key); 
        }
    }


//Get the full string that was passed after ?
function getUrlQueryString() 
    {
    //For some reason this full string ends with a =
    let queryStringFull = urlParams().toString();

    if ( queryStringFull.endsWith('=') )
        {
        queryStringFull = queryStringFull.slice(0, -1);
        }

    console.log("START"+ queryStringFull +"END");
    
    return queryStringFull;

    }


function getUrlQueryParameter( strKey ) 
    {
    return urlParams().get(strKey);
    }


function hasUrlQueryParameter( strKey ) 
    {
    return urlParams().has(strKey);
    }


module.exports = {
    logQueryParameters,
    getUrlQueryString,
    getUrlQueryParameter,
    hasUrlQueryParameter,
    getCurrentPath
    };

