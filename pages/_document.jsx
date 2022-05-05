/*

https://nextjs.org/docs/advanced-features/custom-document

A custom Document is commonly used to augment your application's <html> and <body> tags. This is necessary because Next.js pages skip the definition of the surrounding document's markup.

*/

import Document from 'next/document'

import {Html} from 'next/document'

//Notice how this head is from document not next/head
import {Head} from 'next/document'
//import Head from "next/head";
//import Head from '../components/html-head';
//import HtmlHead from '../components/html-head';

import {Main} from 'next/document'
import {NextScript} from 'next/document'

//import PropTypes from 'prop-types';

const defaultDescription = 'DEFAULT DESCRIPTION FROM _DOCUMENT'




//import { ServerStyleSheet } from 'styled-components'
//import 'styles/global-styles';

/*
original
<Head>
          <meta charSet="utf-8" />
          <meta name="viewport" content="initial-scale=1.0, width=device-width" />
          {styleTags}
        </Head>

*/

//let testValue2 = 0;
//let title = "default";
//let pageProps = null;    

export default class SiteDocument extends Document {

    /*
    static async getInitialProps(ctx) {
        const initialProps = await Document.getInitialProps(ctx)
        return { ...initialProps }
      }
    */
    
   /*
      static async getInitialProps ( ctx )
    //static async getInitialProps ( { renderPage } ) 
        {
    
        const initialProps = await Document.getInitialProps(ctx);

        //console.log("initialProps=", initialProps );

        //const sheet = new ServerStyleSheet()

        //const page = renderPage(App => props => sheet.collectStyles(<App {...props} />))
        
        //console.log( "renderPage=", renderPage );

        //const {html, head, errorHtml, chunks} = renderPage()
            
        testValue2 = 99;

        //const styleTags = sheet.getStyleElement()
        //return { ...page,  styleTags }
                
        //return { html, head, errorHtml, chunks, styles }
        return { ...initialProps };
      }
      */

      //https://lifesaver.codes/answer/how-to-pass-dynamic-props-(title-description-keywords-canonical)-to-document-js-for-each-page
      /*
      static getInitialProps ({ renderPage }) {
        const {html, head, errorHtml, chunks} = renderPage()
        const styles = flush()
        return { html, head, errorHtml, chunks, styles }
      }
      */

    /*
    static async getInitialProps(ctx) 
        {
        let pageProps = null;
        const originalRenderPage = ctx.renderPage;
        ctx.renderPage = () =>
            originalRenderPage({
                enhanceApp: (App) => (props) => 
                    {
                    pageProps = props.pageProps;
                    return <App {...props} />
                    },
                enhanceComponent: (Component) => Component,
                })

      const initialProps = await Document.getInitialProps(ctx);

      return { ...initialProps, pageProps }
        }
    */
    
    render () 
        {

    //console.log("doc props=", this.props);

//    const sheet = new ServerStyleSheet()
//    const main = sheet.collectStyles(<Main />)
//    const styleTags = sheet.getStyleElement()

    //const { pageProps } = this.props;
    //console.log("PageProps=", pageProps );

    //console.log("InitialProps=", initialProps );

    return (
        /*<html lang="en-US">*/
        <Html lang="en">
        
        {/*
            <Head title={this.props.title} description={this.props.description}>
        */}
            {/* styles are inserted */}

        {/*
                <meta FROMDOCUMENT="_document" />

                {this.props.styleTags}
            </Head>
        */}

            <Head>
                {/* DOC header tags go at the top, followed by App stuff, followed by page */}
                
                {/* META & TITLE TAGS PLACED HERE CANNOT BE OVERRODE */}

                {/*Tags in _document will not be replaced (can be duplicated) even with a key identifier*/}

                {/* Maybe Next.js auto inserts UTF-8, because it is not needed here.*/}
                {/*<meta charSet="UTF-8" /> */}

                {/* <meta name="TEST0-FROM-DOC" content='THIS WAS FROM _document' />
                {/*<script src="/DOC-TEST-script.js" defer={false} />*/}
                {/*<style>.inline-DOC-TEST-styles{}</style>*/}


            </Head>


            {/*<Head>*/}
                {/* apparently _document doesn't support title tag */}

                {/*<meta name="TEST0-FROM-DOC" content='THIS WAS FROM _document' />*/} 
                
                {/*<meta charSet="UTF-8" />*/}

                {/* It may be better to put viewport in app.js.
                Adding <meta name="viewport" ...> in pages/_document.js will lead to unexpected results since it cannot be deduped. The viewport tag should be handled by next/head in pages/_app.js. */}
                {/*<meta name="viewport" content="width=device-width, initial-scale=1.0" key="viewport" />*/}

                {/*<meta name="TEST1-FROM-DOC" content='TEST-VALUE' />*/} 
                {/*<meta name="TEST2-FROM-DOC" content={testValue2} />*/}
                {/*<meta name="TEST3-FROM-DOC" content={title} />*/}

                {/* <title>{this.props.title || ''}</title> */}

            {/*</Head>*/}
            
{/*
            <head>

                <meta name="TEST-FROM-DOC-TEST1" content='TEST-VALUE' /> 
                <meta name="TEST-FROM-DOC-TEST2" content={testValue2} />
                <meta name="TEST-FROM-DOC-TEST3" content={title} />    
*/}
                {/*<meta name="TEST-FROM-DOC-TESTPROPS" content={pageProps} />  */}  


                {/* Layouts will insert head content in here */}
                {/*<HtmlHead title={props.title} description='{props.description}'/> */}
   
   {/*
                <HtmlHead title='default title' description='default desc'/>

            </head>
   */}

            {/* THE BODY ELEMENT */}
            <body className="app_body_container">
            
                {/* <div className="root"> */}

                <Main />
            
                {/*FYI THIS COMES FROM _DOCUMENT*/}
                {/*This would be put after all other content*/}
                
                {/* </div> */}

                <NextScript />
            </body>

        {/*</html>*/}
        </Html>
    )
  }
}


/*
SiteDocument.propTypes = {
    title: PropTypes.string,
    description: PropTypes.string,
    url: PropTypes.string,
    ogImage: PropTypes.string
  }
*/