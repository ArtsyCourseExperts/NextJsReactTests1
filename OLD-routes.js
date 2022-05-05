/*


From : https://github.com/vectordotdev/next-go/blob/master/server.js

*/

//const nextRoutes = require('next-routes')
//const routes = nextRoutes()

const nextRoutes = require('next-routes')
const nextRoutesInstance = nextRoutes();
//routes.add([name], pattern = /name, page = name)

//const routes = module.exports = nextRoutes()

nextRoutesInstance.add('index', '/')

nextRoutesInstance.add('gototestdir1file1', '/testdir1/testdir1-file1')

nextRoutesInstance.add('gotoabout', 'about')
nextRoutesInstance.add('gotoabout2', '/pages/about')

nextRoutesInstance.add('post', '/blog/:slug')

module.exports = nextRoutesInstance;

