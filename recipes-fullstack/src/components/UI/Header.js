import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import Button from '@material-ui/core/Button';

const ElevationScroll = props => {
    const { children } = props;
    const trigger = useScrollTrigger({
      disableHysteresis: true,
      threshold: 0
    });
  
    return React.cloneElement(children, {
      elevation: trigger ? 4 : 0,
    });
  }

const header = props => {
    return (
        <ElevationScroll>
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
        </ElevationScroll>
    );
};

export default header;