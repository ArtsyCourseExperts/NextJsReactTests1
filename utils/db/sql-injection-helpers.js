
import EmailHelpers from "/utils/email/email-helpers";

//=================

async function hasSafeEmail( email ) 
    {
    console.log("checkForSafeEmail()");

    let bSafe = checkForSafeText(email)

    if ( email.length > 128 )
        {
        return ( false );
        }

    if ( !EmailHelpers.emailIsValidFormat( email ) )
        {
        return ( false );
        }

    return ( bSafe );
    }
//=================


async function hasSafeField256( text ) 
    {
    console.log("checkForSafeField()");

    let bSafe = checkForSafeText(text)

    if ( text.length > 256 )
        {
        return ( false );
        }

    return ( bSafe );
    }
//=================


async function hasSafeText( text ) 
    {
    console.log("checkForSafeText()");

    let badSingleTokens = hasBadSingleTokens( text );
    if ( badSingleTokens )
        {
        return ( false );
        }

    let badMultipleTokens = hasBadMultipleTokensAnded( text );
    if ( badMultipleTokens )
        {
        return ( false );
        }
        
    //Safe
    return ( true );
    }
//=================


async function hasBadSingleTokens( text ) 
    {
    let tokens = 
        [            
        //, "select "
          "select *"
        , "select if"
        , "select benchmark"
        , "select * from "
        , "select 'true' "
        , "select user"
        , "select password"
        , "select system"
        , "select case"
        , "select 0x"
        , "select char"
        , "select concat("
        , "select count("

        , "union select 1"
        , "union select"
        , "union all select"
        
        , "insert into"
        , "delete from"
        //, "drop "
        //, "update "

        , "if (1=1)"
        , "admin'"
        , "or 1-1"
        , "or '1'="
        , " or 1 ="
        , "' or '"
        , "(1)and(1)"
        , "=1 and 1="
        , "1=1;"
        , "'1'"
        , ")and("
        , "count(*)"
        , "is null"
        , "=like"
        , "like("
        , " like '"
        , "IS NOT NULL "
        , "IS NOT IN "

        , "values("
        , "values ("
        , "waitfor delay"
        , "create function"
        , "sleep("

        , "row_count()"
        , "password()"
        , "encode()"
        , "version()"
        , "schema()"
        , "sha1()"
        , "md5()"
        , "cat.php"
        , "concat("

        , "' --"
        , ";--'"
        , "--'"
        , "' # "
        , "' /*"
        
        , "as varchar"
        , "declare @"
        , "exec("
        , "cast("
        , "session_user"
        , "system_user"
        , "ifnull"
        , "isnull"
        , "current_user"
        , "connection_id"

        //, "mysql"
        //, "postgress"
        ];

    text = text.toLowerCase();
    let bSafe = true;
    
    let bFound = tokens.some( token => text.includes(token) );
    if ( bFound )
        {//Found bad word
        console.log("hasBadSingleTokens() - Found bad tokens");
        return ( true );
        }

    //Nothing bad found.
    return ( false );
    }
//=================


async function hasBadMultipleTokensAnded( text ) 
    {
    //console.log("hasBadMultipleTokens()");

    let combo_tokens = 
    [            
        ["select", "*" , "from", ";"],
        ["select", "from" , ",", "where"],
        ["select", "from" , "where", "like"],
        ["select", "from" , "not", "in"],
        ["select", "from" , ",", "in"],
        ["select", "from" , ",", "on"],
        ["select", "from" , "outer", "join"],
        ["select", "from" , "inner", "join"],
        ["select", "from" , "is", "null"],
        ["select", "from" , "union", "all"],
        ["select", "from" , "intersect", ";"],
        ["select", "distinct", "from"],
        
        ["update", "where", "="],
        ["update", "set", "="],
        ["update", "set", "where"],
        
        ["delete", "from", "where"],
        ["delete", "from", "truncate"],
        
        ["insert", "into", "(" , "values"],
        ["insert", "into", "select" , "from"],
        
        ["create", "table", "key"],
        ["create", "view", "as"],
        ["create", "view", "select", "from"],
        ["create", "index", "on"],
        ["create", "unique", "index"],
        ["create", "modify", "trigger"],
        
        ["drop", "table", ";"],
        ["drop", "view", ";"], 
        ["drop", "user", "'"],

        ["alter", "table", ";"],
        ["alter", "table", "rename", "to"],
        ["alter", "table", "drop"],
        
        ["truncate", "table", ";"],
        ["revoke","all","privileges"],
        ["set", "password", "("]
    ]
    
    text = text.toLowerCase();
    
    let foundBadCombo = false;

    combo_tokens.forEach( comboToken =>
        {
        if ( foundBadCombo )
            {
            return;
            }
        
        let hasAllTokens = comboToken.every( Token => text.includes(token) );
        if ( hasAllTokens )
            {
            foundBadCombo = true;
            return;
            }
        });
    
    if ( foundBadCombo )
        {
        console.log("hasBadMultipleTokensAnded() - Found bad tokens");
        return ( true );
        }
    
    //Nothing bad found.
    return ( false );
    }
//=================


// TO DO future.

// Find multiple keywords in sequence... in sequential order Select...From...where... BAD


//=================


module.exports = {
    hasSafeText,
    hasSafeEmail,
    hasSafeField256,
    hasBadSingleTokens,
    hasBadMultipleTokensAnded,
    };
