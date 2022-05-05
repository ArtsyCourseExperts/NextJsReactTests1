
//import Layout from '/view/full-layout.jsx'
import AceDbHelpers from '/src/db/ace-db-helpers';
//import DbUsersAce from '/src/db/db-users-ace';
import PrismaHelpers from '/utils/db/prisma-helpers';
import AceDbUsers from '/src/db/ace-db-users';

//=================

//Page render time
export const handleServerSideProps = async ( {req, res, query} ) =>
    {
    console.log("getServerSideProps() for jwt1");

    //console.log("req=", req );
    //console.log("query=", query );

    console.log("handleServerSideProps()");
    const results = []; // await PrismaHelpers.prisma.aceTest1.findMany();
    
    let param = "param1";

    //----

    let ObPrisma = PrismaHelpers.dbGetPrisma();
    let gotPrisma = (ObPrisma != null );
    
    let dbTestTableName = AceDbHelpers.dbGetTestConnTableName();

    console.log("handleServerSideProps() - dbConnectExplicitly() starting.");
    let bConnectedExplicitly = await PrismaHelpers.dbConnectExplicitly();
    console.log("handleServerSideProps() - dbConnectExplicitly() done.");
    console.log ("bConnectedExplicitly=", bConnectedExplicitly );
    
    //let dbTestResults = "commented out";
    
    console.log("handleServerSideProps() - dbTestDatabaseAccessAsBool() starting.");
    let dbTestResults = await PrismaHelpers.dbTestDatabaseAccessAsBool( dbTestTableName );
    //let bIsDbWorking = false;
    console.log("handleServerSideProps() - dbTestDatabaseAccessAsBool() done.");

    console.log ("dbTestResults=", dbTestResults );
    
    //----

    AceDbUsers.dbUsersTest();


    
    //----

    dbTestResults = "commented out";

    return {
        props:
            {
            serverSideProps: 
                {
                propsSet: true,
                test: "hello from server",
                other: "other",
                testtext1: "hello from server",
                testparam1: param,
                gotPrisma: gotPrisma,
                //dbWorking: JSON.stringify( dbTestResults ),
                dbTestResults: dbTestResults,
                connected: bConnectedExplicitly
                }
            }
        }

    }



