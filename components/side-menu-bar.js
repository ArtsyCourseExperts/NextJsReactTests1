
// components/NavBar.js

//https://www.npmjs.com/package/react-pro-sidebar

//https://medium.com/how-to-react/create-a-sidebar-menu-in-react-js-3463b306ca9a

//import useState hook to create menu collapse state
import React, { useState } from "react";

import { useLocation } from "react-router-dom"

//import react pro sidebar components
import {
    ProSidebar,
    Menu,
    MenuItem,
    SubMenu,
    SidebarHeader,
    SidebarFooter,
    SidebarContent,
  } from "react-pro-sidebar";

//import icons from react icons
import { FaList, FaRegHeart } from "react-icons/fa";
import { FiHome, FiLogOut, FiArrowLeftCircle, FiArrowRightCircle } from "react-icons/fi";
import { RiPencilLine } from "react-icons/ri";
import { BiCog } from "react-icons/bi";

//import sidebar css from react-pro-sidebar module and our custom css 
import "react-pro-sidebar/dist/css/styles.css";

import Link from 'next/link'
import UrlHelpers from '/utils/file/url-helpers'

//import "/styles/nav-bar.css";
//import footerStyles from '/components/content-footer.module.css'

//import SideMenuBarStyles from '/components/side-menu-bar.module.css'

/*
const navBarStyle = {
  backgroundColor: "green",
  color: "white",
  //width: "100%",
  height: "100%"
};
*/




//https://stackoverflow.com/questions/69249923/reactjs-unable-to-set-active-class-on-reactprosidebar-menu-item
//<MenuItem active={false} icon={<FiHome />}>
//<MenuItem active={checkIfMenuItemActive("/")} icon={<FiHome />}>
function checkIfMenuItemActive( pagePath )
    {
    let pathCurrent = UrlHelpers.getCurrentPath();
    let isLinkActive = pathCurrent === pagePath;
    return ( isLinkActive );
    }


function checkIfSubMenuOpen( pathGroup )
    {
    return ( undefined );

    
    let pathCurrent = UrlHelpers.getCurrentPath();
    if ( !pathCurrent )
        {
        return ( undefined );
        }
    let isLinkActive = pathCurrent.startsWith( pathGroup );
    if ( isLinkActive )
        {
        return ( true );
        }

    return (undefined);
    }


//class NavBar extends React.Component{
function NavBar({ params }) {
//const NavBar = () => {

    //console.log("In NavBar()");
    //console.log("param=", params );
    

    //function Error({ statusCode }) {
/*
        NavBar.getInitialProps = () => {

            console.log("getInitialProps()");
            //const statusCode = res ? res.statusCode : err ? err.statusCode : 404
            //return { statusCode }
    
            return { "name":"angel" }
          }
*/
          

    //create initial menuMainIsCollapsed state using useState hook
    const [menuMainIsCollapsed, setMenuMainIsCollapsed] = useState(false);

    //This is for hamburger menu.
    //create a custom function that will change menuMainIsCollapsed state from false to true and true to false
    const menuMainIconClick = () => 
        {
        console.log("menuMainIconClick() - clicked hamburger menu icon.");
        //condition checking to change state from true to false and vice versa
        menuMainIsCollapsed ? setMenuMainIsCollapsed(false) : setMenuMainIsCollapsed(true);
        };
    
    return (

        <>

        {/*
        <div className="NavBar" style={navBarStyle}>
            NAV BAR Title

            <Link href='/'><a>Home</a></Link> <br/>
            <Link href='/company/about' prefetch><a>About</a></Link> <br/>
            <Link href='/company/terms' prefetch><a>Contact</a></Link> <br/>
            <Link href='/company/privacy' prefetch><a>About</a></Link> <br/>

           
        </div>
        */}

         {/* New react-pro-sidebar */}

        <div id="header">
          {/* collapsed props to change menu size using menuMainIsCollapsed state */}
        
        {/*See more options here... 
        //https://www.npmjs.com/package/react-pro-sidebar
        */}

        <ProSidebar 
            collapsed={menuMainIsCollapsed}
            >
        
        {/* Display hamburger menu */}
        {/*
          <SidebarHeader>
            <div className="logotext">
                <p>{menuMainIsCollapsed ? "Logo" : "Big Logo"}</p>
            </div>
            
            <div className="closemenu" onClick={menuMainIconClick}>
                    {
                {menuMainIsCollapsed ? (
                    <FiArrowRightCircle/>
                ) : (
                    <FiArrowLeftCircle/>
                )}
            </div>
          </SidebarHeader>
          */}


            <SidebarContent>
                <Menu iconShape="square">

                    <MenuItem active={checkIfMenuItemActive("/")} icon={<FiHome />}>
                        <Link href="/home"><a>Home</a></Link><br/>
                    </MenuItem>
                
                    {/* 
                    <MenuItem icon={<FaList />}>
                        <Link href="/home"><a>Planning</a></Link><br/>
                    </MenuItem>
                    */}

                    <SubMenu 
                        title="Planning" 
                        icon={<FaList />}  
                        open={checkIfSubMenuOpen("/tools/planning/")}
                        >
                        <MenuItem active={checkIfMenuItemActive("/tools/planning/tool1")}>
                            <Link href="/tools/planning/tool1"><a>Tool 1</a></Link><br/>
                        </MenuItem>
                        <MenuItem active={checkIfMenuItemActive("/tools/planning/tool2")}>
                            <Link href="/tools/planning/tool2"><a>Tool 2</a></Link><br/>
                        </MenuItem>
                        <MenuItem active={checkIfMenuItemActive("/tools/planning/tool3")}>
                            <Link href="/tools/planning/tool3"><a>Tool 3</a></Link><br/>
                        </MenuItem>
                        
                    </SubMenu>

                    {/*
                    <MenuItem icon={<RiPencilLine />}>
                        <div>
                        <a
                        href="https://github.com/azouaoui-med/react-pro-sidebar"
                        target="_blank"
                        className="sidebar-btn"
                        rel="noopener noreferrer"
                        >
                        Author
                        </a>
                        </div>
                    </MenuItem>
                    */}

                    <SubMenu title="Content" icon={<FiHome/>} 
                        open={checkIfSubMenuOpen("/tools/content/")} >
                        <MenuItem active={checkIfMenuItemActive("/tools/content/tool4")}>
                            <Link href="/tools/content/tool4"><a>Tool 4</a></Link><br/>
                        </MenuItem>
                        
                    </SubMenu>

                    {/* 
                    <MenuItem icon={<FaRegHeart />}>
                        <Link href="/home"><a>Sales</a></Link><br/>
                    </MenuItem>
                    */}

                    {/*
                    <SubMenu title="Sales" icon={<FaRegHeart />}>
                        <MenuItem>
                            <Link href="/tools/tool1"><a>Tool 1</a></Link><br/>
                        </MenuItem>
                        <MenuItem>
                            <Link href="/tools/tool2"><a>Tool 2</a></Link><br/>
                        </MenuItem>
                    </SubMenu>
                    */}

                    {/*

                    Add SERVICE MENU
                        - Handle refunds

                        - Handle winbacks

                    */}

                    
                    <MenuItem active={checkIfMenuItemActive("/help/help-center")} icon={<BiCog />}>
                        <Link href="/help/help-center"><a>Help</a></Link><br/>
                    </MenuItem>

                    <MenuItem active={checkIfMenuItemActive("/settings/profile")} icon={<BiCog />}>
                        <Link href="/settings/profile"><a>Settings</a></Link><br/>
                    </MenuItem>

                </Menu>
            </SidebarContent>


        {/* Footer is a line on top with more stuff */}
        {/*
          <SidebarFooter>
            <Menu iconShape="square">
              <MenuItem icon={<FiLogOut />}>Logout</MenuItem>
            </Menu>
          </SidebarFooter>
        */}


        {/* Another example */}
        {/*
        <SidebarFooter style={{ textAlign: "center" }}>
        <div
          className="sidebar-btn-wrapper"
          style={{
            padding: "20px 24px"
          }}
        >
          <a
            href="https://github.com/azouaoui-med/react-pro-sidebar"
            target="_blank"
            className="sidebar-btn"
            rel="noopener noreferrer"
          >
            <FaGithub />
            <span> 'viewSource'</span>
          </a>
        </div>
        </SidebarFooter>
        */}


        </ProSidebar>
      </div>

        </>
       
        );
        
    }


    
export default NavBar;
