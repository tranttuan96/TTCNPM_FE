import React, { Fragment, useState, useEffect } from "react";
import { Route, NavLink } from "react-router-dom";
import "./UserTemplate.scss"


const UserLayout = (props) => {

    const [keyword, setKeyword] = useState("");

    const handleChange = (event) => {
        setKeyword(event.target.value);
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        alert(keyword)
    }

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
                <div className="header__right">
                    <form onSubmit={handleSubmit} className="searchForm">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Tìm kiếm món ăn"
                            onChange={handleChange}
                        />
                        <button className="btn btn-primary">Tìm kiếm</button>
                    </form>
                </div>

            </div>

            {props.children}
        </Fragment>
    );
};

export const UserTemplate = (props) => (
    <Route
        path={props.path}
        {...props.exact}
        render={(propsComponent) => (
            <UserLayout>
                <props.component {...propsComponent} />
            </UserLayout>
        )}
    />
);
