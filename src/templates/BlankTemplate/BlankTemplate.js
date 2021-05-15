import React, { Fragment } from "react";
import { Route, NavLink } from "react-router-dom";
import "./BlankTemplate.scss"

const BlankLayout = (props) => {
    return (
        <Fragment>
            <div className="header">
                <div className="header__left">
                    <NavLink to="/" className="brand__logo">
                        <img src={"/images/1004px-Logo-hcmut.svg.png"} alt="logo" />
                    </NavLink>
                    <span className="brand__name">
                        <div className="group__name">C2TB</div>
                        Restaurant
                    </span>
                </div>
            </div>
            {props.children}
        </Fragment>
    );
};

export const BlankTemplate = (props) => (
    <Route
        path={props.path}
        {...props.exact}
        render={(propsComponent) => (
            <BlankLayout>
                <props.component {...propsComponent} />
            </BlankLayout>
        )}
    />
);