import React, { Fragment } from "react";
import { Route } from "react-router-dom";

const UserLayout = (props) => {
    return (
        <Fragment>
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