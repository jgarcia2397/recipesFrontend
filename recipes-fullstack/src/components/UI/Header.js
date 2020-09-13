import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

const header = props => {
    return (
        <AppBar position='fixed'>
            <Toolbar>
                <Typography variant='h4'>
                    Good Food
                </Typography>
                {/* <Button>Home</Button>
                <Button>My Recipes</Button>
                <Button>My Profile</Button>
                <Button>Login</Button> */}
            </Toolbar>
        </AppBar>
    );
};

export default header;