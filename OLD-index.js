//Top level app file

console.log("ACE SAAS from index.js");


require("dotenv").config()
console.log("Got param NODE_ENV=", process.env.NODE_ENV );
console.log("Got param EXPRESS_PORT=", process.env.EXPRESS_PORT );

//From https://blog.logrocket.com/building-server-rendered-react-app-next-express/
const express = require('express')


const next = require('next')
const devMode = process.env.NODE_ENV !== 'production';
const app = next({ devMode });
const handle = app.getRequestHandler();


//const NextjsExpressRouter = require("./nextjs_express_router")
//const Middleware = require("./middleware")

const bodyParser = require('body-parser')

app.prepare().then(() => {
    
    const expressServer = express();
    
    //let middleware = new Middleware(this.express)
    //let router = new NextjsExpressRouter(this.express, this.next)

    //Why use this?
    expressServer.use( bodyParser.json() );

    expressServer.get('*', (req, res) => 
        {
        return handle(req, res);
        })
    
    expressServer.listen( process.env.EXPRESS_PORT, (err) => 
        {
        if (err) 
            {
            throw err;
            }
        //console.log('> Ready on http://localhost:3000')
        console.log(`Server listening on port ${process.env.EXPRESS_PORT}`);
        })

})
.catch((ex) => 
    {
    console.error(ex.stack)
    process.exit(1)
    })



/*
const Server = require('./app/server');

const begin = async () => {

    console.log("index.begin()");
    
    

    await new Server(process.env.EXPRESS_PORT).start()

    console.log(`Server running in --- ${process.env.NODE_ENV} --- on port ${process.env.EXPRESS_PORT}`);
    }

begin()
*/