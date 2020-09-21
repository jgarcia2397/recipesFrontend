import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

import SearchBar from '../components/UI/SearchBar';
import cooking from '../assets/cooking.jpg';

const styles = theme => ({
	paperContainer: {
		backgroundImage: `url(${cooking})`,
		backgroundPosition: 'center',
		backgroundSize: 'cover',
		backgroundRepeat: 'no-repeat',
		paddingLeft: '400px',
		paddingRight: '400px',
		paddingTop: '600px',
		paddingBottom: '600px',
		[theme.breakpoints.down('lg')]: {
			paddingLeft: '250px',
			paddingRight: '250px',
			paddingTop: '500px',
			paddingBottom: '500px',
		},
		[theme.breakpoints.down('md')]: {
			paddingLeft: '150px',
			paddingRight: '150px',
			paddingTop: '400px',
			paddingBottom: '400px',
		},
		[theme.breakpoints.down('sm')]: {
			paddingLeft: '50px',
			paddingRight: '50px',
			paddingTop: '300px',
			paddingBottom: '300px',
		},
		[theme.breakpoints.down('xs')]: {
			paddingLeft: '50px',
			paddingRight: '50px',
			paddingTop: '250px',
			paddingBottom: '250px',
		},
	},
	cardsContainer: {
		backgroundColor: theme.palette.primary.light,
		paddingLeft: '400px',
		paddingRight: '400px',
		paddingTop: '600px',
		paddingBottom: '600px',
		[theme.breakpoints.down('lg')]: {
			paddingLeft: '250px',
			paddingRight: '250px',
			paddingTop: '500px',
			paddingBottom: '500px',
		},
		[theme.breakpoints.down('md')]: {
			paddingLeft: '150px',
			paddingRight: '150px',
			paddingTop: '400px',
			paddingBottom: '400px',
		},
		[theme.breakpoints.down('sm')]: {
			paddingLeft: '50px',
			paddingRight: '50px',
			paddingTop: '300px',
			paddingBottom: '300px',
		},
		[theme.breakpoints.down('xs')]: {
			paddingLeft: '50px',
			paddingRight: '50px',
			paddingTop: '250px',
			paddingBottom: '250px',
		},
	},
	root: {
		minWidth: 250,
	},
});

// Higher-order component API
class HomePage extends Component {
	render() {
		const { classes } = this.props;
		return (
			<React.Fragment>
				<Paper className={classes.paperContainer}>
					<SearchBar />
				</Paper>
				<Paper className={classes.cardsContainer}>
					<Grid container direction='row' justify='center' spacing={3}>
						<Card className={classes.root}>
							<CardContent>
								<Typography variant='h4'>My Recipes</Typography>
								<Typography variant='body1'>
									View your recipes and add to your menu!
								</Typography>
							</CardContent>
							<CardActions>
								<Button size='small'>View Recipes</Button>
							</CardActions>
						</Card>
						<Card className={classes.root}>
							<CardContent>
								<Typography variant='h4'>My Profile</Typography>
								<Typography variant='body1'>
									Update your profile for others to see!
								</Typography>
							</CardContent>
							<CardActions>
								<Button size='small'>View Profile</Button>
							</CardActions>
						</Card>
					</Grid>
				</Paper>
			</React.Fragment>
		);
	}
}

HomePage.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(HomePage);
