//=================
//Crypto module for generic encrypt/decrypt helper functions
//
//Notes:
//https://blog.logrocket.com/node-js-crypto-module-a-tutorial/
//https://www.tutorialspoint.com/encrypt-and-decrypt-data-in-nodejs
//=================

const crypto = require('crypto');

//=================

const algorithmAes256Cbc = 'aes-256-cbc'; //Using AES encryption

//const password = '1234abcd';
//const key = crypto.randomBytes(32);     // Must be 256 bits (32 characters)

//=================


//Gets environment specific key.
function cryptoGetAppKey256()
    {
    let key = process.env.CRYPTO_KEY_256;
    let envNick = process.env.ENV_NICK;

    if (!envNick)
        {
        console.error("cryptoGetAppKey256() - Env Nick not found!  Maybe Client CODE?");
        //console.log("env=", process.env);
        return ( null )
        }

    if ( !key )
        {
        console.error("cryptoGetAppKey256() - Key not found.");
        return (null);
        }
    
    if ( key.length != 32 )
        {
        console.error("cryptoGetAppKey256() - Invalid key length for this environment");
        return (null);
        }

    //In general try not to output the key to logs.
    //console.log(key);
    //console.log("cryptoGetAppKey256() - Got key! ", key.slice(0,8) + "........................" );

    return key;
    }
//=================


//In future, I may need to create different keys for various sub messages.
//var key = Crypto.createHash('sha512').update(secret_key, 'utf-8').digest('hex').substr(0, 32);
//https://codewithtravel.medium.com/how-to-encrypt-and-decrypt-in-node-js-using-crypto-5db4c18787da

function cryptoGetAppKey256Hashed()
    {
    let keyBase = cryptoGetAppKey256();

    let  keyTemp = Crypto.createHash('sha512').update(keyBase, 'utf-8').digest('hex').substr(0, 32);

    return ( keyTemp );
    }
//=================


function cryptoGetIv( numOfBytes )
    {
    // generate 16 bytes of random data
    const iv = crypto.randomBytes( numOfBytes );
    
    return ( iv );
    }
//=================


function cryptoGetIvHex( numOfBytes )
    {
    // generate 16 bytes of random data
    const iv = crypto.randomBytes( numOfBytes ).toString("hex").slice(0, numOfBytes);
    
    return ( iv );
    }
//=================


function cryptoEncrypt(algorithm, key, text)
    {
    if ( !key )
        {
        console.log("cryptoEncrypt() - Invalid key");
        return (null);
        }
    let iv = cryptoGetIv(16);       // For AES, this is always 16
    //console.log("cryptoEncrypt() - iv=", iv.toString('hex'));

    let encrypted = null;
    try
        {
        let encryptor = crypto.createCipheriv(algorithm, Buffer.from(key), iv);
    
        encrypted = encryptor.update(text);
        encrypted = Buffer.concat([encrypted, encryptor.final()]);
        }
    catch (e)
        {
        console.error( "cryptoEncrypt() - Encrypt error ", e );
        return ( null );
        }
    //var encrypted = encryptor.update(text, 'utf8', 'base64') + encryptor.final('base64');
    
    //let output = { iv: iv.toString('hex'), data: encrypted.toString('hex') };
    //let output = Buffer.from(encrypted).toString('base64');
    
    //version/header 16bytes, iv 16bytes, REST
    //ATV01000******** + IV (16) + ENcrypted
    //let header = "AC001000" + "FFFF9381";    //crypto.randomBytes( 8 );
    let header = "AC001000" + crypto.randomBytes( 4 ).toString('hex');
    //console.log("cryptoEncrypt() - header=", header);

    let output = header.toString('hex') + iv.toString('hex') + encrypted.toString('hex');
    //let outputAsString = JSON.stringify(output);

    //return outputAsString;
    return output;
    }
//================= 


function cryptoEncryptAes256Cbc( key, text)
    {
    let result = cryptoEncrypt( algorithmAes256Cbc, key, text);
    return result;
    }
//================= 


function cryptoEncryptAes256CbcAppKey( text)
    {
    let key = cryptoGetAppKey256();
    let result = cryptoEncrypt( algorithmAes256Cbc, key, text);
    return result;
    }
//================= 


function cryptoDecrypt(algorithm, key, encryptedMessage)
    {
    if ( !key )
        {
        console.log("cryptoDecrypt() - Invalid key");
        return (null);
        }

    if ( !encryptedMessage || encryptedMessage.length < 16 )
        {
        console.log("cryptoDecrypt() - Invalid message text");
        return ( null );
        }

    //console.log("cryptoDecrypt() - encryptedMessage=", encryptedMessage );

    //Convert string of JSON into object.
    //encryptedObject = JSON.parse(encryptedMessage);

    //const buff = Buffer.from(encryptedMessage, 'base64');
    //encryptedMessage = buff.toString('utf-8');
    
    /*
   

   

    if ( !encryptedObject.data || encryptedObject.data.length <= 8 )
        {
        console.log("cryptoDecrypt() - Invalid message");
        return ( null );
        }
    */

    //version/header 16bytes, iv 16bytes, REST
    //ATV01000******** + IV (16) + ENcrypted
    //let header = "ATV01000" + crypto.randomBytes( 8 );
    //let output = header.toString('hex') +  + iv.toString('hex') + encrypted.toString('hex');
    
    let header = encryptedMessage.slice(0,16);
    //console.log("got header=", header);
    if ( !header || header.length < 16 )
        {
        console.log("cryptoDecrypt() - Invalid header");
        return ( null );
        }
        
    let ivBytes = encryptedMessage.slice(16, 16+32);
    //encryptedObject = encryptedObject.slice(16);
    //console.log("got IV Bytes=", ivBytes);
    if ( !ivBytes || ivBytes.length < 16 )
        {
        console.log("cryptoDecrypt() - Invalid iv");
        return ( null );
        }
        
    //let iv = crypto.randomBytes(16);
    //let iv = Buffer.from(encryptedObject.iv, 'hex');
    let iv = Buffer.from( ivBytes, 'hex');
    
    let encryptedData = encryptedMessage.slice(48);
    //console.log("encryptedData=", encryptedData );

    //console.log("decrypt iv is ", iv );
    let output = null;

    try
        {
        //let encryptedText = Buffer.from(encryptedObject.data, 'hex');
        let encryptedText = Buffer.from( encryptedData, 'hex');
        let decryptor = crypto.createDecipheriv(algorithm, Buffer.from(key), iv );
        output = decryptor.update(encryptedText);
        output = Buffer.concat([output, decryptor.final()]);
    
        //let decryptor = crypto.createDecipheriv(algorithm, Buffer.from(key), iv);
        //output = decryptor.update(encryptedMessage, 'base64', 'utf8') + decryptor.final('utf8');


        }
    catch
        {//Error
        return ( null );
        }
    //let output = decrypted.toString();

    return output;
    }
//=================


function cryptoDecryptAes256Cbc( key, text)
    {
    let result = cryptoDecrypt( algorithmAes256Cbc, key, text);
    return result;
    }
//================= 


function cryptoDecryptAes256CbcAppKey( text )
    {
    let key = cryptoGetAppKey256();
    let result = cryptoDecrypt( algorithmAes256Cbc, key, text);
    return result;
    }
//================= 


function cryptoModuleTest()
    {
    console.log("cryptoModuleTest()");

    console.log("cryptoModuleTest() - get key");
    cryptoGetAppKey256();

    //cryptoModuleTestItem("");
    cryptoModuleTestItem("Hey123");
    //cryptoModuleTestItem("Hey how are you doing today and all day?");

    console.log("cryptoModuleTest() - done");
    }
//=================


function cryptoModuleTestItem( item )
    {
    console.log("cryptoModuleTestItem()");

    console.log("cryptoModuleTestItem() - source");
    let input = item;
    console.log("cryptoModuleTestItem() - input -->"+ input + "<--");
    
    var encrypted = cryptoEncryptAes256CbcAppKey(input)
    //console.log("cryptoModuleTestItem() - encrypted ", encrypted);
    
    //let encryptedString = JSON.stringify(encrypted);
    console.log("cryptoModuleTestItem() - encrypted -->"+ encrypted + "<--");
    
    console.log("cryptoModuleTestItem() - decrypt");
    var output = cryptoDecryptAes256CbcAppKey(encrypted)
    console.log("cryptoModuleTestItem() - output -->"+ output + "<--");
    }

//=================

module.exports = {
      cryptoModuleTest
    , cryptoEncrypt
    , cryptoEncryptAes256CbcAppKey
    , cryptoDecrypt
    , cryptoDecryptAes256CbcAppKey
    , cryptoGetAppKey256
    , cryptoGetAppKey256Hashed
    };
