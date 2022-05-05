import {Fragment} from 'react';

//import AceDbHelpers from '/src/db/ace-db-helpers'
//import DbUsersAce from '/src/db/db-users-ace'
import {handleServerSideProps} from "/src/db/test-user1-backend.js"

//=================

export default function Index( props ) {
    console.log("Index()");

    return (
        <Fragment>
            {/* <Layout title="Title" description="Desc">*/}
            <h1>Test Db - User database test</h1> 

            Server side data.testtext1 is={props.serverSideProps.testtext1}<br/>

            gotPrisma={props.serverSideProps.gotPrisma.toString()}<br/>
            dbTestResults is={props.serverSideProps.dbTestResults}<br/>
            Connected is={props.serverSideProps.connected}<br/>

            <br/><br/>

        </Fragment>
    );

  }
//=================

  
//Page render time
export const getServerSideProps = async ( context ) => {
    console.log("getServerSideProps()");

    let result = await handleServerSideProps( context );

    //let bIsDbWorking = AceDbHelpers.isDbConnWorking();
    //let bIsDbWorking = false;

    //let param = 1;

    /*
    return {
        props:
            {
            serverSideProps: 
                {
                testtext1: "hello from server",
                testparam1: param,
                dbWorking: bIsDbWorking
                }
            }
        }
    */
    return ( result );

    }

