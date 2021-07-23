import React from 'react';
import PropTypes from 'prop-types';
import {Route, Switch} from "react-router-dom";
import {ConnectedRouter} from "connected-react-router";
import Box from "@material-ui/core/Box"
import {Header} from "./shared/components/Header";
import {routes} from "./routes";
import {Page404} from "./shared/components/Page404";
import {Container, makeStyles} from "@material-ui/core";
import {HomePage} from "./features/feature/pages/HomePage";


export function AppContainer(props) {
    const {history} = props;

    return (
        <ConnectedRouter history={history}>
            <Header/>
            <Container>
                <Switch>
                    {routes.map(route => (
                        <Route key={route.key} path={route.path} exact={route.exact} component={route.component}/>
                    ))}
                    <Route path="*" exact render={() => <Page404/>}/>
                </Switch>
            </Container>
        </ConnectedRouter>
    );
}

AppContainer.propTypes = {
    history: PropTypes.object,
};
