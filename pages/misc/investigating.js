//Holding page for bad requests or users

//USED TO HOLD BAD BLOCKED IPS, COUNTRIES, DOS, etc.

//Called investigating so that hackers can see that we are looking into it.

import Layout from '/view/header-minimal_footer_minimal.jsx'

export default function Index() {
    
    //console.log("maintenance page");
    
    const maint_wrapper = {
        ["text-align"]: "center",
        backgroundColor: "lightyellow"        
        };

    const maint_image = 
        {
        padding: "10px",
        "width": "70%",
        "text-align" : "center",
        "display" : "inline-block",
        backgroundColor: "lightyellow"        
        };

    return (
        <>
            <Layout title="Investigating" description="Website error, investigating...">
                <div className="normal-body-padding" style={maint_wrapper} >
                    <h1>Website Problem</h1>

                    <img 
                        className="" style={maint_image} 
                        src="/images/20210918_202108_AC-Photo_1280x720.jpg"></img>

                    <p>Sorry, the website is experiencing problems right now.</p>

                    <p>We have notified the administration team to review and troubleshoot.</p>
                    
                </div>
            </Layout>
        </>
    );
  }

