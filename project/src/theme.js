import { createMuiTheme } from '@material-ui/core/styles';
import purple from '@material-ui/core/colors/purple';
import green from '@material-ui/core/colors/green';

export const theme = createMuiTheme({
    spacing:10,
    palette: {
        primary: {
            main: green[400],
        },
        secondary: {
            main: purple[100],
        },
    },
});