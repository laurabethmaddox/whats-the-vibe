import React from "react";
import { Route, Redirect } from "react-router-dom";
import { ApplicationViews } from "./ApplicationViews";
import { NavBar } from "./nav/NavBar";
import { Login } from "./auth/Login";
import { Register } from "./auth/Register";
import "./Vibes.scss"

export const Vibes = () => (
    <>
    <Route
        render={() => {
            if (localStorage.getItem("vibes_user")) {
            return (
                <>
                <NavBar />
                <ApplicationViews />
                {/* <HomePage /> */}
            </>
            );
        } else {
            return <Redirect to="/login" />;
        }
        }}
    />

    <Route path="/login">
        <Login />
    </Route>
    <Route path="/register">
        <Register />
    </Route>
    </>
);