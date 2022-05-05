//import Layout from '/view/full-layout.jsx'
import Layout from '/view/header-minimal_footer_minimal.jsx'

export default function Index() {
    //console.log("maintenance page");
    const maint_wrapper = {
        //"padding-top": "10px",
        //"padding-bottom": "50px",
        ["text-align"]: "center",
        /*color: "white",*/
        backgroundColor: "lightyellow"        
      };

      const maint_image = {
        padding: "10px",
        "width": "70%",
        "text-align" : "center",
        "display" : "inline-block",
        /*color: "white",*/
        backgroundColor: "lightyellow"        
      };

    return (
        <>
            <Layout title="Maintenance" description="Site is being maintained">
                <div className="normal-body-padding" style={maint_wrapper} >
                    <h1>Maintenance In Progress</h1>

                    {/*<img>doing art</img>*/}
                    <img 
                    className="" style={maint_image} 
                    src="/images/20210918_202108_AC-Photo_1280x720.jpg"></img>

                    <p>Sorry, the website is being updated right now.</p>

                    <p>We're probably adding some awesome new tools for teachers</p>
                    
                    <p>In the meantime, have you checked out the <a className="standard-underlined-link" href="https://www.ArtsyCourseExperts.com/Blog">The ArtsyCourseExperts Blog</a></p>

                </div>
            </Layout>

        </>
    );

  
  }

