
//https://github.com/pinojs/pino-nextjs-example/blob/master/pages/api/hello.js

//Call this 
//  http://localhost:3000/api/hello
//Returns this.
//  {"msg":"hi there"}

/*
export default (req, res) => {
    //req.log.info('/api/hello')
    res.statusCode = 200
    res.json({ msg: 'hi there' })
  }
*/

//http://localhost:3000/api/test/hola

  export default function handler(req, res) {
    
    res.status(200).json({ name: 'Hola' })
  
}
