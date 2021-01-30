import { createMuiTheme } from '@material-ui/core/styles';

const darkGreen = '#005005';
const green = '#2e7d32';
const lightGreen = '#60ad5e';
const darkPurple = '#4e004d';
const purple = '#7d3e79';
const lightPurple = '#ae5ca8';
const pastelPurple = '#b19cd9';
const black = '#000000';
const white = '#ffffff';
const ivory = '#fffff0';

const theme = createMuiTheme({
	palette: {
        common: {
            green: green,
            purple: purple,
            pastelPurple: pastelPurple,
            white: white,
            ivory: ivory,
        },
		primary: {
            light: lightGreen,
            main: green,
            dark: darkGreen,
        },
		secondary: {
            light: lightPurple,
            main: purple,
            dark: darkPurple,
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
        h5: {
            fontFamily: 'Montserrat'
        },
        body1: {
            fontFamily: 'Raleway'
        },
        body2: {
            fontFamily: 'Raleway',
            fontSize: '0.75rem',
            fontWeight: 'bold',
        },
        button: {
            fontFamily: 'Raleway',
            fontWeight: 'bold',
            color: 'white',
        }
    },
    divider: {
        main: black,
    },
});

export default theme;
