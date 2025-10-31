import React from "react";
import { Outlet } from "react-router-dom";
import "./styleForMainLayout.css"
import Menu from "../../components/Menu/Menu";

const Layout = () => {
    return (
        <div className="layout">
            <header className="layoutHeader">
                <Menu />
            </header>
            <main className="layoutMain">
                <Outlet />
            </main>
        </div>
    );
};

export default Layout;
