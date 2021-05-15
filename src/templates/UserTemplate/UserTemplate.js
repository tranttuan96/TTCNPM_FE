import React, { Fragment, useState, useEffect } from "react";
import { Route, useHistory, NavLink } from "react-router-dom";
import "./UserTemplate.scss"


const UserLayout = (props) => {
    let history = useHistory();
    const [keyword, setKeyword] = useState("");

    const handleChange = (event) => {
        setKeyword(event.target.value);
    }

    const handleSubmit = (event) => {
        event.preventDefault(); 
        if(keyword == "") {
            alert("Từ khóa rỗng.")
        }
        else {
            history.push(`/search/keyword=${keyword}`)
        }
    }

    

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
                <div className="header__right">
                    <form className="searchForm" onSubmit={handleSubmit}>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Tìm kiếm món ăn"
                            onChange={handleChange}
                        />
                        <button className="btn btn-secondary"><i className="fa fa-search"></i></button>
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
