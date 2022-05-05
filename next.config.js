/**
 * @type {import('next').NextConfig}
 */

//https://nextjs.org/docs/api-reference/next.config.js/introduction

require("dotenv").config();

const path = require("path");

const withPlugins = require('next-compose-plugins');

//require()

//Trying to deal with argon2 loader issues.
// next.config.js
//const withImages = require('next-images');
//module.exports = withImages()

//const withCSS = require('@zeit/next-css')
//const withCSS = require("@zeit/next-css")
//const sass = require("@zeit/next-sass")

//-----------------

/*
if (!ENV_NICK || !NODE_ENV) 
    {
    console.error("Environment may not be setup correctly since there NODE_ENV and ENV_NICK are missing.");
    process.exit(-1);
    }
*/

if (!process.env.JWT_TOKEN_KEY) 
    {
    console.error("No JWT_TOKEN_KEY defined, please review environment.");
    process.exit(-1);
    }

if (!process.env.MYSQL_URL) 
    {
    console.error("Environment missing key variables like MYSQL_URL.");
    process.exit(-1);
    }

//-----------------

const nextConfig = 
    {
    /* config options here */

    reactStrictMode: true,

    trailingSlash: false,           //Default.  Use /page   without trailing slash.

    poweredByHeader: false,         //Hide this from response headers.

    //compress: true                //TO RESEARCH THIS


    //https://github.com/cornflourblue/next-js-11-registration-login-example/blob/master/next.config.js
    serverRuntimeConfig: {
        secret: 'THIS IS USED TO SIGN AND VERIFY JWT TOKENS, REPLACE IT WITH YOUR OWN SECRET, IT CAN BE ANY STRING'
    },

    //https://github.com/cornflourblue/next-js-11-registration-login-example/blob/master/next.config.js
    publicRuntimeConfig: {
        apiUrl: process.env.NODE_ENV === 'development'
            ? 'http://localhost:3000/api' // development api
            : 'http://localhost:3000/api' // production api
    }

    /*
    //This was supposed to be a workaround for Winston error requiring module fs
    //Note, NextJS supposedly uses webpack natively
    //https://maikelveen.com/blog/how-to-solve-module-not-found-cant-resolve-fs-in-nextjs
    webpack: (config, { isServer }) => {
        // Fixes npm packages that depend on `fs` module
        if (!isServer) 
            {
            config.node = 
                {
                fs: 'empty'
                }
            }
        }
    */

    ,webpack: function (config, options) 
        {

        if ( options.isServer )
            {
            config.node = { fs : 'empty' };
            }
        //config.resolve.fallback = { fs: false, path: false, stream: false, constants: false };

        // aliases for main project folders. When using vscode edit jsconfig.json accordingly for awesome linting experience
        config.resolve.alias = {
            ...config.resolve.alias,
            '@components': path.resolve('./components'),
            '@public': path.resolve('./public'),
            //'@redux': path.resolve('./redux'),
            '@backend': path.resolve('./src/backend'),
            '@utils': path.resolve('./utils'),
        };
        

        config.module.rules.push(
            {
            test: /\.(png|jpg|gif|svg)$/,
            
            use: [
                {
                loader: 'file-loader',
                options: {
                    limit: 100000,
                    name: '[name].[ext]'
                    }
                }
                ]
            })


        //Fonts
        config.module.rules.push(
            {
            test: /\.(eot|woff|woff2|ttf)$/,
            use: [{
                loader: 'url-loader',
                options: {
                    limit: 100000,
                    name: '[name].[ext]'
                    }
                }]
            })

        return config
        }

    /*
    ,redirects() {
        console.log("checking redirects");
        return [
            process.env.MAINTENANCE_MODE === "1"
            ? { source: "/((?!maintenance).*)", destination: "/maintenance.html", permanent: false }
            : null,            
        ].filter(Boolean);
        }
    */

    //This is NOT working..
    /*
    ,rewrites: async () => {
        return [
            {
            source: "/company/about",
            destination: "/company/privacy",
            }
            ]
        }
    */

    //You can include env directly within next.config
    //https://nextjs.org/docs/api-reference/next.config.js/environment-variables
    ,env: {
        'env-testparam-next.config.js' : "test param from next.config.js"
        //    'TESTMYSQL_HOST': '127.0.0.1',
        //    'TESTMYSQL_PORT': '3306'
        //,
        //'TESTMYSQL_DATABASE': {database_name},
        //'TESTMYSQL_USER': {user_name},
        //'TESTMYSQL_PASSWORD': {user_password},
        }


    }

//Help with bootstrap
//https://maxrohde.com/2020/03/06/next-js-with-bootstrap-getting-started/
//const withCSS = require('@zeit/next-css')

/*
const withCSSThing = withCSS(
    {
    cssLoaderOptions: {
            url: false
          }
    }); 
*/





/*
module.exports = 
    {
    nextConfig,
    env

    //,withImages

    //,withCSSThing
    }
*/

//https://stackoverflow.com/questions/54496180/react-next-js-configuration-with-cssmodules-and-url-loader
//https://stackoverflow.com/questions/48671281/how-can-i-combine-multiple-loaders-css-less-ttf-etc-in-nextjs-config-file
//module.exports = withPlugins([...plugins], nextConfiguration);

/*
module.exports = withPlugins(
    [
        //Add plugins with specific configurations
        [
        //[withCSS],
        //[sass, {
        //    cssModules: true
        //    }]
        ],

        //Add a plugin without a configuration
        //Note that as of 10.0.3 I can put images inside nextConfig
        //, withImages

    ]
    
    //, nextConfig
    , withImages(nextConfig)

    );
*/

module.exports = 
    {
        
    nextConfig
    
    }

/*
https://docs.oracle.com/en/cloud/paas/content-cloud/oce-nextjs-minimal-sample/index.html#pages-folder

async redirects() {
    return [
      {
        source: '/',
        destination: '/page/',
        permanent: true,
      },
    ]
  }
*/