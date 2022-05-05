//https://github.com/pinojs/pino-nextjs-example/blob/master/next-pino/logger.js

// this is the logger for the browser
import pino from 'pino'

// log levels system
const levels = {
    http: 10,
    debug: 20,
    info: 30,
    warn: 40,
    error: 50,
    fatal: 60
  };

const config = {
    serverUrl: process.env.REACT_APP_API_PATH || 'http://localhost:3000',
    env: process.env.NODE_ENV,
    publicUrl: process.env.PUBLIC_URL
    //,
}

/*
https://github.com/Logflare/next-pino-logflare-logging-example/blob/main/logger/logger.js
import { logflarePinoVercel } from 'pino-logflare'
const { stream, send } = logflarePinoVercel({
    apiKey: "eA_3wro12LpZ",
    sourceToken: "eb1d841a-e0e4-4d23-af61-84465c808157"
});
*/

const pinoConfig = 
    {
    browser: 
        {
        asObject: true
        },
    

    // the minimum log level to be display
    level: 'debug',

    //prettyPrint: process.env.NODE_ENV !== 'production',

    colorize: process.env.NODE_ENV !== 'production',

    base: {
        env: process.env.NODE_ENV,
        revision: process.env.VERCEL_GITHUB_COMMIT_SHA
        }
    }



if (config.serverUrl) 
    {
    pinoConfig.browser.transmit = 
        {
        level: 'info',

        //prettyPrint: true,

        // send: send,

        send: (level, logEvent) => 
            {
            const msg = logEvent.messages[0]

            const headers = {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
                type: 'application/json'
            }
        
            //let blob = new Blob([JSON.stringify({ msg, level })], headers);
            //navigator.sendBeacon(`${config.serverUrl}/log`, blob)
            }
  
        }
    }

const logger = pino(pinoConfig)

export const log = msg => logger.info(msg)
export default logger

