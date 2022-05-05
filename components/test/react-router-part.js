/*
react-router-dom

test 

https://reactrouter.com/docs/en/v6/getting-started/overview#navigation



*/

import React from 'react';
import { useNavigate } from "react-router-dom";

const TestComponent = () => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate("/about");
    }

    return (
        <div>
            <button onClick={handleClick} type="button" />
        </div>
    );
}

export default TestComponent;