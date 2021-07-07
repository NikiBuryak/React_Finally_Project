import React from 'react';
import {Provider} from 'react-redux';

import store from "./services/store";
import history from "./services/history";
import {AppContainer} from "./AppContainer";
import "./shared/styles/main.scss";
//Для передачи контекста
import {ThemeProvider} from "@material-ui/core/styles";
import {theme} from "./theme"
import CssBaseline from "@material-ui/core/CssBaseline"

function App() {
    return (
        <ThemeProvider theme={theme}>
            <Provider store={store}>
                <CssBaseline>
                    <AppContainer
                        history={history}
                    />
                </CssBaseline>
            </Provider>
        </ThemeProvider>
    );
}

export default App;
