//ACE Saas Tools Server


console.log("ACE SAAS from app.js");


const dotenvConfig = require("dotenv").config()
console.log("Got param NODE_ENV=", process.env.NODE_ENV );
console.log("Got param EXPRESS_PORT=", process.env.EXPRESS_PORT );

//From https://blog.logrocket.com/building-server-rendered-react-app-next-express/
const express = require('express')


const next = require('next');

const port = process.env.EXPRESS_PORT ? +process.env.EXPRESS_PORT : 3000;
const devMode = process.env.NODE_ENV !== 'production';
const nextApp = next({ devMode });
//customServer 
//const nextApp = next({ devMode, customServer: true, hostname: 'localhost', port })
const nextHandler = nextApp.getRequestHandler();

//FIX PATH, once I get this working, I'd like Server & Routes and & APIs in app folder.
//const routes = require('./app/routes.js')
//const routes = require('./OLD-routes')
//const routesHandler = routes.getRequestHandler( nextApp );

//Add nunjucks for templates?
//const nunjucks = require('nunjucks');

//Loggging
//https://heynode.com/blog/2020-05/add-server-logs-your-nodejs-app-morgan-and-winston/
//const morgan = require('morgan');
//const logger = require('/config/winston.js');

// this is the logger for the server
//var pinoHttp = require('pino-http')();
//const pinoHelpers = require('/utils/file/pino-helpers.js');
//const pinoExpressLogger = require('express-pino-logger');



//const NextjsExpressRouter = require("./nextjs_express_router")
//const Middleware = require("./middleware")

const bodyParser = require('body-parser')
//const favicon = require('serve-favicon');

console.log("in app.js");

nextApp.prepare().then(() => {
    
    console.log("app.js - nextApp.prepared!");

    console.log("app.js - about to create express");
    const expressServer = express();
    
    //Logging setup.


    //expressServer.use(morgan("combined", { stream: logger.stream.write }));
    
    /*expressServer.get('/', function(req, res) {
        throw new Error('error thrown navigating to');
        });
    */

    /*
    expressServer.use(function(err, req, res, next) {
        
        console.log("calling logger");

        logger.error(`${req.method} - ${err.message}  - ${req.originalUrl} - ${req.ip}`);
        next(err)
        })  
    

    //USING _middleware.ts for routing and redirects.
    //console.log("app.js - about to install routesHandler");
    //let middleware = new Middleware(this.express)
    //let router = new NextjsExpressRouter(this.express, this.next)
    //expressServer.use( routesHandler );
    
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
    //nextApp.use('/t', '/pages/test')

    //Set up the content in the styles directory to be served up through the Express app
    //app.use('/styles', express.static('styles'));

    
    //Why use this?
    expressServer.use( bodyParser.json() );
    //Is this helpful for me?
    expressServer.use( bodyParser.urlencoded({ extended: true }) )


    //expresServer.use(favicon(path.join(__dirname, '..', 'public', 'favicon.png')));


    //const router = express.Router();

    //app.use('/', router);

    /* Place all routes here */
    //router.get('/', (req, res) => {
    //STRIPE_API.getAllProductsAndPlans().then(products => {
    //    res.render('adminView.html', {products: products});
    //});
    //});


    //expressServer.get('/my-custom-route', (req, res) =>
    //    res.status(200).json({ hello: 'Hello, from the back-end world!' })
    //    );

    /*
    // create an instance of the middleware
    const eplMiddleware = expressPinoLogger({
        // specify the logger
        logger: pinoHelpers,    //logger,
        // level to log
        useLevel: "http"
    });
    expressServer.use( eplMiddleware );
    */
    //expressServer.use( pinoExpressLogger );
     
/*
    expressServer.get('/', function (req, res) {
        console.log("handling request for /");
        // each request has its own id
        // so you can track the log of each request
        // by using `req.log`
        // the ids are cycled every 2^31 - 2
        req.log.info('got root request')
        res.send('hello world')
      })
*/

    expressServer.get('*', (req, res) => 
        {
        console.log("Got * request");

        //pinoHelpers.info( "request" );

        //pinoHttp(req, res);

        //req.log.info("Some url request");

        return nextHandler(req, res);
        })
    
    //expressServer.get('/ping', (req, res) => res.end('pong'));
    
    expressServer.listen( port, (err) => 
        {
        if (err) 
            {
            throw err;
            }
        //console.log('> Ready on http://localhost:3000')
        console.log(`Server listening on port ${port}`);
        })

})
.catch((ex) => 
    {
    console.error( ex.stack )
    process.exit( 1 );
    })



//console.log("ACE SAAS from app.js");



