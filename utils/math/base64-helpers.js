//Base64

//=================
function base64EncodeText( text ) 
    {
    let buff = new Buffer(text);
    let base64data = buff.toString('base64');
    return base64data;
    }
//=================


function base64DecodeText( text ) 
    {
    let data = 'c3RhY2thYnVzZS5jb20=';
    let buff = new Buffer(text, 'base64');
    let text = buff.toString('ascii');
    return text;
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

var encrypted = base64EncodeText(input)
console.log("cryptoModuleTestItem() - encrypted ", encrypted);

let encryptedString = JSON.stringify(encrypted);
//console.log("cryptoModuleTestItem() - encrypted -->"+ encryptedString + "<--");

//console.log("cryptoModuleTestItem() - decrypt");
var output = base64DecodeText(encrypted)
console.log("cryptoModuleTestItem() - output -->"+ output + "<--");
}

//=================

module.exports = {
    getUuid
    };
