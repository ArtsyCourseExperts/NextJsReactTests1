
import Layout from '/view/full-layout.jsx'
import {handleServerSideProps} from "/src/backend/test/math/argon2-backend.js"

//=================

export default function Index( props ) {

    let val = "nothing";    //uuid.getUuid();

    return <div>
                <h1>Argon2 - tester</h1> 

                {`Sample argon2 val=${val}`}<br/>
                Password In: {`${props.data.passwordIn}`}
                <br/>

                Password Hashed: {`${props.data.passwordHashed}`}
                <br/>

                Password Good: {`${props.data.passwordGood}`}

                <br/><br/>
        </div>
  }

//=================



export const getServerSideProps = async ( context ) => {
    console.log("getServerSideProps() for test-tool page");
    let result = await handleServerSideProps( context );
    return ( result ); 
    }

//=================

