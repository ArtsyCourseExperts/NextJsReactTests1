/*

https://nextjs.org/docs/advanced-features/custom-error-page

500 errors are handled both client-side and server-side by the Error component. If you wish to override it, define the file pages/_error.js and add the following code:

pages/_error.js is only used in production. In development you’ll get an error with the call stack to know where the error originated from.

*/

function Error({ statusCode }) {

    return (
      <p>
        {statusCode
          ? `An error ${statusCode} occurred on server`
          : 'An error occurred on client'}
      </p>
    )
  }
  
  
  Error.getInitialProps = ({ res, err }) => {
    const statusCode = res ? res.statusCode : err ? err.statusCode : 404
    return { statusCode }
  }
  
  export default Error
