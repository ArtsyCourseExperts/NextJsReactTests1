/*


From : https://github.com/vectordotdev/next-go/blob/master/server.js

*/

//const nextRoutes = require('next-routes')
//const routes = nextRoutes()

const nextRoutes = require('next-routes')
const routes = module.exports = nextRoutes()

routes.add('index', '/')
routes.add('gototestdir1file1', '/testdir1/testdir1-file1')
routes.add('gotoabout', '/pages/about')
routes.add('post', '/blog/:slug')


//module.exports = nextRoutes()
