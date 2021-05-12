import React, { Fragment } from "react";
import { Route } from "react-router-dom";

const ChefLayout = (props) => {
    return (
        <Fragment>
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