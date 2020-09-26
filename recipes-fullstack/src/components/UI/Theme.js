import { createMuiTheme } from '@material-ui/core/styles';

const darkGreen = '#205723';
const green = '#2e7d32';
const lightGreen = '#57975b';
const darkYellow = '#b28704';
const yellow = '#ffc107';
const lightYellow = '#ffcd38';

// const defaultTheme = createMuiTheme();

const theme = createMuiTheme({
    // ...defaultTheme,
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
        h3: {
            fontFamily: 'Montserrat',
            fontWeight: 'bold',
        },
        h4: {
            fontFamily: 'Montserrat'
        },
        body1: {
            fontFamily: 'Raleway'
        },
        body2: {
            fontFamily: 'Raleway',
            fontSize: '0.6rem"'
        },
        button: {
            fontFamily: 'Raleway',
            fontWeight: 'bold',
            color: 'white',
        }
    },
    // overrides: {
    //     MuiTypography: {
    //         h4: {
    //             [defaultTheme.breakpoints.up('lg')]: {
    //                 fontSize: '3.125rem'
    //             }
    //         },
    //         body1: {
    //             [defaultTheme.breakpoints.up('lg')]: {
    //                 fontSize: '2rem'
    //             }
    //         },
    //         button: {
    //             [defaultTheme.breakpoints.up('lg')]: {
    //                 fontSize: '1.875rem'
    //             }
    //         },
    //     },
    // }
});

export default theme;
