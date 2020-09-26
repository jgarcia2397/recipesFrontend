import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
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
		width: '70vh',
		backgroundColor: theme.palette.secondary.main,
		marginBottom: '30px',
	},
	mediaContainer: {
		height: '100%',
		width: '30%',
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
	},
	contentContainer: {
		width: '70%',
		textAlign: 'center',
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

	return (
		<Card className={classes.root}>
			<CardActionArea classes={{ root: classes.cardActionContainer }}>
				<Grid
					container
					alignItems='center'
					direction='row'
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
						</CardContent>
					</Grid>
				</Grid>
			</CardActionArea>
		</Card>
	);
};

export default RecipeCard;
