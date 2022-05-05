//Footer for most pages.

//import "/components/content-footer.css"
import footerStyles from '/components/content-footer.module.css';
import BrandAceHelpers from '/src/app/brand-ace-helpers.js';

// import Link from "next/link";

export default function Footer() {
    const FooterMenu = [
        {
            title: 'Top Content Services',
            titleUrl: '#',
            opt1_label: 'Validate new course',
            opt1_label_url: '#',
            opt2_label: 'Teacher coaching',
            opt2_label_url: '#',
            opt3_label: 'Curriculum Lesson',
            opt3_label_url: '#',
        },
        {
            title: 'Top Marketing Services',
            titleUrl: '#',
            opt1_label: 'Course Sales Page',
            opt1_label_url: '#',
            opt2_label: 'Sign-Up Process',
            opt2_label_url: '#',
            opt3_label: 'Improve Course SEO',
            opt3_label_url: '#',
        },
        {
            title: 'Top Tech Services ',
            titleUrl: '#',
            opt1_label: 'Course Maintenance',
            opt1_label_url: '#',
            opt2_label: 'Student Support',
            opt2_label_url: '#',
            opt3_label: 'Course Configuration',
            opt3_label_url: '#',
        },
    ]
    //console.log("maintenance page");
    /*
    const tools_style = {
        display: "block",
        color: "green",
        "font-weight": "bold",
        "margin-left": "52px"
        };
    */

    let year = new Date().getFullYear();
    let brand = BrandAceHelpers.getSiteName();

    return (
        <div className={footerStyles.content_footer} >
            {/*
            <style jsx>{`
                .test3 
                    {
                    color:Green;
                    }`}
            </style>
            */}
            <div className={footerStyles.top_row}>
                <div className={footerStyles.top_left_section}>
                    <p >
                        We help creative teachers build, grow, and operate online courses by helping them with content, marketing, and technology.
                    </p>
                    <ul className={footerStyles.footer_links_nav}>
                        <li>
                            <a href='#' className={footerStyles.links}>About Us</a>
                        </li>
                        <li>
                            <a href='#' className={footerStyles.links}>FAQ</a>
                        </li>
                        <li>
                            <a href='#' className={footerStyles.links}>Get Help</a>
                        </li>
                    </ul>
                </div>
                {FooterMenu.map((el, i) => {
                    return (
                        <div key={i} className={footerStyles.footer_menu}>
                            <a href={el.titleUrl} className={footerStyles.menu_title}>{el.title}</a>
                            <a href={el.opt1_label_url} className={footerStyles.menu_options}>{el.opt1_label}</a>
                            <a href={el.opt2_label_url} className={footerStyles.menu_options}>{el.opt2_label}</a>
                            <a href={el.opt3_label_url} className={footerStyles.menu_options}>{el.opt3_label}</a>
                        </div>
                    )
                })}
            </div>
            <div className={footerStyles.copyright_area}>
                <p className={footerStyles.copyright_text}>
                    Copyright © {year}{' '}{brand}{' '}All Rights Reserved.
                </p>
                <div className={footerStyles.legal_links_area}>

                    <a href="https://www.artsycourseexperts.com/Privacy-Policy" className={footerStyles.legal_link} target="_blank">Privacy Policy</a>

                    <a href="https://www.artsycourseexperts.com/Terms-Of-Use" className={footerStyles.legal_link} target='_blank'>Terms of Use</a>

                </div>

            </div>
        </div>
    );
}
