import { createMuiTheme } from '@material-ui/core/styles';

const darkGreen = '#205723';
const green = '#2e7d32';
const lightGreen = '#57975b';
const darkYellow = '#b28704';
const yellow = '#ffc107';
const lightYellow = '#ffcd38';

const theme = createMuiTheme({
	palette: {
        common: {
            green: green,
            yellow: yellow,
        },
		primary: {
            light: lightGreen,
            main: green,
            dark: darkGreen,
        },
		secondary: {
            light: lightYellow,
            main: yellow,
            dark: darkYellow,
        },
    },
    typography: {
        tab: {
            fontFamily: 'Montserrat',
            fontSize: '1rem'
        },
        h4: {
            fontFamily: 'Montserrat'
        },
        body1: {
            fontFamily: 'Raleway'
        },
        button: {
            fontFamily: 'Raleway',
            fontWeight: 'bold'
        }
    }
});

export default theme;
