import {Navbar} from "react-bootstrap";
import {useRef} from "react";
import {NavLink} from "react-router-dom";
import UserDropDown from "./UserDropDown.jsx";

const SideNavLayout = (props) => {
    let contentRef,sideNavRef=useRef();
    const MenuBarClickHandler = () => {
        let sideNav = sideNavRef;
        let content = contentRef;
        if (sideNav.classList.contains("side-nav-open")) {
            sideNav.classList.add("side-nav-close");
            sideNav.classList.remove("side-nav-open");
            content.classList.add("content-expand");
            content.classList.remove("content");
        } else {
            sideNav.classList.remove("side-nav-close");
            sideNav.classList.add("side-nav-open");
            content.classList.remove("content-expand");
            content.classList.add("content");
        }
    };
    return (
        <>
            <div ref={(div) =>{sideNavRef=div}} className="side-nav-open">
                <div className="text-center">
                    <img alt="img" className="side-nav-logo" src=""/>
                </div>

                <NavLink to="/" className={({ isActive }) => isActive ? "side-bar-item-active side-bar-item mt-2" : "side-bar-item mt-2"}>
                    <i className="bi bi-house side-bar-item-icon"></i>
                    <span className="side-bar-item-caption">Home</span>
                </NavLink>
                <NavLink to="/bokolist" className={({ isActive }) => isActive ? "side-bar-item-active side-bar-item mt-2" : "side-bar-item mt-2"}>
                    <i className="bi bi-house side-bar-item-icon"></i>
                    <span className="side-bar-item-caption">Details</span>
                </NavLink>

            </div>

            <div ref={(div) => contentRef = div} className="content">
                <Navbar className="px-0 sticky-top bg-white">
                    <div className="container-fluid">
                        <Navbar.Brand>
                            <a className="icon-nav m-0 h5" onClick={MenuBarClickHandler}><i className="bi bi-list"></i></a>
                        </Navbar.Brand>
                        <UserDropDown/>
                    </div>
                </Navbar>
                <div className="p-1">
                    {props.children}
                </div>
                <br/><br/><br/><br/>
            </div>
        </>
    );
};
export default SideNavLayout;
