import React, { Fragment } from "react";
import { Route } from "react-router-dom";

const ClerkLayout = (props) => {
    return (
        <Fragment>
            {props.children}
        </Fragment>
    );
};

export const ClerkTemplate = (props) => (
    <Route
        path={props.path}
        {...props.exact}
        render={(propsComponent) => (
            <ClerkLayout>
                <props.component {...propsComponent} />
            </ClerkLayout>
        )}
    />
);