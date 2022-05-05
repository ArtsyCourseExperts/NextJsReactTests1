//Help with hashing.

//argon2 requires compiling, node-argon2 wont import, so using argon2-ffi which is node ready.
const { argon2i } = require("argon2-ffi");
const crypto = require("crypto");

//Where is this?  part of node?  for promisfy.
const util = require("util");

//=================

const getRandomBytes = util.promisify(crypto.randomBytes);

//=================

//Create hash of data like real password or Password attempt
async function createHash( dataIn ) 
    {
    let hash = undefined;
    
    //Note that each time a hash is made on the same stuff it is different, this is because of salt that is added.
    try {
        
        let salt = await getRandomBytes(32);
        
        //hash = await argon2.hash( dataIn );
        hash = await argon2i.hash( dataIn, salt );
        //console.log(hash);
        } 
    catch (err) 
        {
        console.log("createHash() error " + err);
        }

    return hash;
    
    }
//=================


//Use this to check if new hash matches an original password
async function verifyHash( hashedOriginal, plaintextJustEntered ) 
    {
    let resultPasswordsMatch = false;

    try 
        {
        let isCorrect = await argon2i.verify( hashedOriginal, plaintextJustEntered); 
        //let isCorrect = await argon2.verify( hashIn, dataOriginal); 

        if ( isCorrect ) 
            {
            // password match
            console.log("matched");
            resultPasswordsMatch = true;
            } 
        else 
            {
            // password did not match
            console.log("not matched");
            }
        } 
    catch (err) 
        {
        // internal failure
        console.log("ERROR", err);
        }

    return ( resultPasswordsMatch );
    

    }
//=================


//Check hash functions
async function test() 
    {
    let passwordReal = "thePass";       //await ArgonHelpers.createHash("thePass");
    console.log("getServerSideProps()-real password hash is=",passwordReal);
    
    let passwordHashed = await ArgonHelpers.createHash( passwordReal );
    console.log("getServerSideProps()-real password entered now is=",passwordHashed);


    let plaintextJustEntered = passwordReal;

    //let passwordGood = "xyasdfaf7";
    let passwordGood = await ArgonHelpers.verifyHash( passwordHashed , plaintextJustEntered); 
    //console.log("getServerSideProps()- passwordGood=", passwordGood );
    //console.log( "passwordGood type=", typeof(passwordGood) );

    
    }
//=================


module.exports = {
    createHash,
    verifyHash,
    test
    };
