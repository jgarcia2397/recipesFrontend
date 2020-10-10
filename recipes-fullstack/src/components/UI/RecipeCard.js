import React from 'react';
import { Link } from 'react-router-dom';

import { makeStyles, useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

import applePie from '../../assets/applePie.jpg';

const useStyles = makeStyles(theme => ({
	root: {
		height: '15vh',
		width: '40vw',
		backgroundColor: theme.palette.secondary.main,
		marginBottom: '30px',
		minWidth: '300px',
		[theme.breakpoints.down('md')]: {
			width: '50vw',
		},
		[theme.breakpoints.down('sm')]: {
			width: '60vw',
		},
		[theme.breakpoints.down('xs')]: {
			height: '50vh',
			// width: '40vw',
		},
	},
	mediaContainer: {
		height: '100%',
		width: '30%',
		[theme.breakpoints.down('xs')]: {
			height: '50%',
			width: '100%',
		},
	},
	media: {
		height: '100%',
		width: '100%',
	},
	contentRoot: {
		padding: 0,
		'&:last-child': {
			paddingBottom: 0,
		},
		[theme.breakpoints.down('xs')]: {
			marginTop: '30px',
		},
	},
	contentContainer: {
		width: '70%',
		textAlign: 'center',
		[theme.breakpoints.down('xs')]: {
			width: '100%',
		},
	},
	viewRecipeButton: {
		...theme.typography.button,
		margin: 'auto',
		backgroundColor: theme.palette.secondary.dark,
		'&:hover': {
			backgroundColor: theme.palette.secondary.light,
		},
	},
	cardActionContainer: {
		height: '100%',
	},
}));

const RecipeCard = props => {
	const classes = useStyles();
	const theme = useTheme();

	const matchesXS = useMediaQuery(theme.breakpoints.down('xs'));

	return (
		<Card className={classes.root} elevation={3}>
			<CardActionArea
				classes={{ root: classes.cardActionContainer }}
				component={Link}
				to='recipe-full-details'
			>
				<Grid
					container
					alignItems='center'
					direction={matchesXS ? 'column' : 'row'}
					classes={{ root: classes.cardActionContainer }}
				>
					<Grid item className={classes.mediaContainer}>
						<CardMedia
							src={applePie}
							component='img'
							title='Pie'
							className={classes.media}
						/>
					</Grid>
					<Grid item className={classes.contentContainer}>
						<CardContent classes={{ root: classes.contentRoot }}>
							<Typography variant='h4'>Apple Pie</Typography>
							<Typography variant='body1'>Prep Time: 20 mins</Typography>
							<Typography variant='body1'>Cook Time: 1 hour</Typography>
							<Typography variant='body2'>(Click for more details)</Typography>
						</CardContent>
					</Grid>
				</Grid>
			</CardActionArea>
		</Card>
	);
};

export default RecipeCard;
