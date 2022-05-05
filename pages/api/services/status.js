
//Used by Tester systems to make sure webserver is up.

export default function handler(req, res) 
    {
    res.status(200).send("OK");
    }

