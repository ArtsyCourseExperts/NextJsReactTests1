//Redirect test
//https://reactgo.com/react-router-redirection/
//Rendering a <Redirect> will navigate to a new location. The new location will override the current location in the history stack, like server-side redirects (HTTP 3xx) do.
//https://v5.reactrouter.com/web/api/Redirect

import React from 'react';

import Layout from '/view/full-layout.jsx'

import TestComponent from '/components/test/react-router-part';

//Use history is old one
//import { useHistory } from 'react-router-dom';

import { useNavigate } from 'react-router-dom';

export default function Index() {

    const navigate = useNavigate();
    //const history = useHistory();

    const handleClick = () => {
        navigate("/about");
    }

    return (
        
            
        <div>
            <button onClick={handleClick} type="button" />
        </div>

        <Routes>
            <Route exact path="/" element={<Home/>}/>
        </Routes>

        );

    }
