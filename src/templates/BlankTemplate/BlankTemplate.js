import React, { Fragment } from "react";
import { Route } from "react-router-dom";

const BlankLayout = (props) => {
    return (
        <Fragment>
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