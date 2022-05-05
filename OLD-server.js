//ACE Saas Tools Server


console.log("ACE SAAS from app.js");


const dotenvConfig = require("dotenv").config()
console.log("Got param NODE_ENV=", process.env.NODE_ENV );
console.log("Got param EXPRESS_PORT=", process.env.EXPRESS_PORT );

//From https://blog.logrocket.com/building-server-rendered-react-app-next-express/
const express = require('express')


const next = require('next')
const devMode = process.env.NODE_ENV !== 'production';
const nextApp = next({ devMode });
const nextHandler = nextApp.getRequestHandler();

//FIX PATH, once I get this working, I'd like Server & Routes and & APIs in app folder.
//const routes = require('./app/routes.js')
const routes = require('./OLD-routes').default
const routesHandler = routes.getRequestHandler( nextApp );

//Add nunjucks for templates?
//const nunjucks = require('nunjucks');


//const NextjsExpressRouter = require("./nextjs_express_router")
//const Middleware = require("./middleware")

const bodyParser = require('body-parser')

nextApp.prepare().then(() => {
    
    console.log("app.js - nextApp.prepared!");

    console.log("app.js - about to create express");
    const expressServer = express();
    

    console.log("app.js - about to install routesHandler");
    
    //let middleware = new Middleware(this.express)
    //let router = new NextjsExpressRouter(this.express, this.next)

    expressServer.use( routesHandler );
    
    //To serve static files such as images, CSS files, and JavaScript files, use the express.static built-in middleware function in Express.
    //https://expressjs.com/en/starter/static-files.html
    //app.use(express.static(__dirname));
    //app.use(express.static(path.join(__dirname, 'public')));
    nextApp.use(express.static('public'));

    //Another example.
    //app.use(express.static(path.join(__dirname, '../public')))
    //app.use('/_next', express.static(path.join(__dirname, '../.next')))

    //app.use(express.static('images'));
    //Do I need /public/images
    //Do I need to add /js,   /css ?

    // Virtual Path Prefix '/static' so that a fake /static path is accessible.
    nextApp.use('/static', express.static('public'))


    //Set up the content in the styles directory to be served up through the Express app
    //app.use('/styles', express.static('styles'));

    
    //Why use this?
    expressServer.use( bodyParser.json() );
    //Is this helpful for me?
    expressServer.use( bodyParser.urlencoded({ extended: true }) )


    //const router = express.Router();

    //app.use('/', router);

    /* Place all routes here */
    //router.get('/', (req, res) => {
    //STRIPE_API.getAllProductsAndPlans().then(products => {
    //    res.render('adminView.html', {products: products});
    //});
    //});




    expressServer.get('*', (req, res) => 
        {
        return nextHandler(req, res);
        })
    
    //expressServer.get('/ping', (req, res) => res.end('pong'));
    
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






//console.log("ACE SAAS from app.js");

/*
require("dotenv").config()
const Server = require("./app/server")

const begin = async () => {

   

    console.log("index.begin()");
    
    console.log("Got param NODE_ENV=", process.env.NODE_ENV );

    console.log("Got param EXPRESS_PORT=", process.env.EXPRESS_PORT );
    

  await new Server(process.env.EXPRESS_PORT).start()

  console.log(`Server running in --- ${process.env.NODE_ENV} --- on port ${process.env.EXPRESS_PORT}`)
}

begin()
*/


/*
const express = require('express');
const app = express();
const port = 3000;


app.get('/', (req, res) => {
  
  
    res.send('Hello World from app.js   Monday 4!');

})


app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`)
})
*/


