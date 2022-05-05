//Redirect test
//https://reactgo.com/react-router-redirection/
//Rendering a <Redirect> will navigate to a new location. The new location will override the current location in the history stack, like server-side redirects (HTTP 3xx) do.
//https://v5.reactrouter.com/web/api/Redirect

import { Navigate, Redirect, useNavigate, Route, BrowserRouter as Router } from 'react-router-dom';
import Layout from '/view/full-layout.jsx'
import ReactDOM from "react-dom";

export default function Index() {

    let bRedirect = true;
    if ( bRedirect )
        {
        console.log("about to redirect");
        //return <p>blah</p>
        
        
        return <Redirect  to='/about' />
        //let history = useHistory();
        //history.push("about");
        //return <Navigate to='/about' />

        //let navigate = useNavigate();
        //navigate("/about");
        //navigate(-1);
        //return;

        }
    

    return (
        <>
        <Layout title="Title" description="Desc">
            <h1>Test Redirect</h1> 

        
        {/* bRedirect ? <Redirect  to="/about" /> : null  */}
       
        
        </Layout>
        </>
        );

    }

/*
ReactDOM.render(
    <Router>
        <Index />
    </Router>
)
*/