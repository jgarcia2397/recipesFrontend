import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

import applePie from '../../assets/applePie.jpg';

const useStyles = makeStyles(theme => ({
	root: {
		height: '200px',
		width: '69vh',
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
}));

const RecipeCard = props => {
	const classes = useStyles();

	return (
		<Card className={classes.root}>
			<CardActionArea>
				<Grid container direction='row'>
					<Grid item className={classes.mediaContainer}>
						<CardMedia
							src={applePie}
							component='img'
							title='Pie'
							className={classes.media}
						/>
					</Grid>
					<Grid item className={classes.contentContainer}>
						<CardContent>
							<Typography variant='h4'>Apple Pie</Typography>
							<Typography variant='body1'>Prep Time: 20 mins</Typography>
							<Typography variant='body1'>Cook Time: 1 hour</Typography>
						</CardContent>
					</Grid>
				</Grid>
			</CardActionArea>
			<CardActions>
				<Button
					className={classes.viewRecipeButton}
					style={{ maxWidth: '150px', minWidth: '150px' }}
				>
					View Full Recipe
				</Button>
			</CardActions>
		</Card>
	);
};

export default RecipeCard;
