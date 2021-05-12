import React, { Fragment } from "react";
import { Route } from "react-router-dom";

const AuthLayout = (props) => {
    return (
        <Fragment>
            {props.children}
        </Fragment>
    );
};

export const AuthTemplate = (props) => (
    <Route
        path={props.path}
        {...props.exact}
        render={(propsComponent) => (
            <AuthLayout>
                <props.component {...propsComponent} />
            </AuthLayout>
        )}
    />
);