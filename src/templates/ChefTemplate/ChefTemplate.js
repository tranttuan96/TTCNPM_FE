import React, { Fragment, useState, useEffect } from "react";
import { Route, NavLink } from "react-router-dom";
import "./ChefTemplate.scss"


const ChefLayout = (props) => {

    return (
        <Fragment>
            <div className="header">
                <div className="header__left">
                    <a className="brand__logo" href="#">
                        <img src={"/images/1004px-Logo-hcmut.svg.png"} alt="" />
                    </a>
                    <span className="brand__name">
                        <div className="group__name">C2TB</div>
                        Restaurant
                    </span>
                </div>
            </div>
            {/* main div */}

            {props.children}
        </Fragment>

    );
};

export const ChefTemplate = (props) => (
    <Route
        path={props.path}
        {...props.exact}
        render={(propsComponent) => (
            <ChefLayout>
                <props.component {...propsComponent} />
            </ChefLayout>
        )}
    />
);
