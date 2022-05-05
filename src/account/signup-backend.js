
import { useCookies } from "react-cookie"
import CookiesAce from "/src/cookies/cookies-ace"
import CookiesReactHelpers from "/utils/cookies/cookies-react-helpers"
import JwtHelpers from '/utils/cookies/jwt-helpers'
import JwtHelpersAce from '/src/cookies/jwt-helpers-ace'
import axios from 'axios';

//=================


//Server side render
//export const handleServerSideProps = async ( {req, res, query} ) =>
export async function handleServerSideProps( {req, res, query} )
    {
    console.log("getServerSideProps()");

    return {
        props:
            {
            serverSideProps: 
                {
                propsSet: true,
                test: "hello from server",
                other: "other",
                }
            }
        }

    }

//=================
