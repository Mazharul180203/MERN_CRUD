import React from 'react';
import {Toaster} from "react-hot-toast";
import {Container, Nav, Navbar} from "react-bootstrap";
import {Link} from "react-router-dom";
const AppLayout = (props) => {
    return (
        <>
            <Navbar expand="lg" className="bg-white sticky-top shadow-sm">
                <Container fluid={true}>
                    <a className="navbar-brand" target="_blank" href="https://aml.idlc.com">
                        <img alt="" className="nav-brand-logo" src="" />
                    </a>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">

                            <a className="nav-link fw-bold" target="_blank" href="https://www.google.com/maps/place/%E0%A6%86%E0%A6%87%E0%A6%A1%E0%A6%BF%E0%A6%8F%E0%A6%B2%E0%A6%B8%E0%A6%BF+%E0%A6%85%E0%A7%8D%E0%A6%AF%E0%A6%BE%E0%A6%B8%E0%A7%87%E0%A6%9F+%E0%A6%AE%E0%A7%8D%E0%A6%AF%E0%A6%BE%E0%A6%A8%E0%A7%87%E0%A6%9C%E0%A6%AE%E0%A7%87%E0%A6%A8%E0%A7%8D%E0%A6%9F+%E0%A6%B2%E0%A6%BF%E0%A6%AE%E0%A6%BF%E0%A6%9F%E0%A7%87%E0%A6%A1/@23.7757589,90.4169215,17z/data=!3m1!5s0x3755c79ca2af8dd5:0x136039f619417cd8!4m16!1m9!3m8!1s0x3755c79cc55cac4b:0xa1beb2657d80048a!2z4KaG4KaH4Kah4Ka_4KaP4Kay4Ka44Ka_IOCmheCnjeCmr-CmvuCmuOCnh-CmnyDgpq7gp43gpq_gpr7gpqjgp4fgppzgpq7gp4fgpqjgp43gpp8g4Kay4Ka_4Kau4Ka_4Kaf4KeH4Kah!8m2!3d23.7755851!4d90.416893!9m1!1b1!16s%2Fg%2F11g8_38bfp!3m5!1s0x3755c79cc55cac4b:0xa1beb2657d80048a!8m2!3d23.7755851!4d90.416893!16s%2Fg%2F11g8_38bfp?authuser=0&entry=ttus">
                                <i className="bi bi-geo-alt"></i>  Locate us
                            </a>
                            <Link className="nav-link fw-bold" to="/">
                                <i className="bi bi-house"></i> Home
                            </Link>
                        </Nav>
                        <Link className="btn-sm btn-danger" to="/">Login</Link>
                    </Navbar.Collapse>

                </Container>
            </Navbar>
            {props.children}
            <Toaster position="bottom-center"/>
        </>
    );
};

export default AppLayout;