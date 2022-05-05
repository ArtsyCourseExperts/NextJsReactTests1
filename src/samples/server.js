

//Sample from https://github.com/alexey-dc/nextjs_express_template

console.log("server.js");

const express = require('express');
const next = require('next')
const NextjsExpressRouter = require("./nextjs_express_router")
const Middleware = require("./middleware")

const httpServer = (express) => {
  return require('http').createServer(express)
}

/*
const httpsServer = (express) => {
  const fs = require('fs')
  const options = {
    key: fs.readFileSync(process.env.SSL_PRIVATE_KEY_PATH, 'utf8'),
    cert: fs.readFileSync(process.env.SSL_CERTIFICATE_PATH, 'utf8')
  }
  return require('https').createServer(options, express)
}
*/

class Server {
  constructor(port) {
    console.log("Server.constructor()");
    this.port = port
    this.express = express()
    this.next = next({ dev: process.env.NODE_ENV !== 'production' })
    this.middleware = new Middleware(this.express)
    this.router = new NextjsExpressRouter(this.express, this.next)
  }

  async start() {

    console.log("server.js start()");

    await this.next.prepare()
    await this.middleware.init()
    await this.router.init()
    //this.server = httpsServer(this.express)
    this.server.listen(process.env.EXPRESS_PORT)

    console.log("server.start() - done with start()");
  }
}

module.exports = Server