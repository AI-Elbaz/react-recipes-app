import { Link } from "react-router-dom";
import { Card, CardMedia, CardContent, Chip, makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
  chips: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    margin: 16,
    display: 'flex',
    gap: 8,
    '& > *': {
      color: 'var(--base0)',
      backgroundColor: '#fff',
    }
  }
});

const RecipeCard = ({recipe}) => {
  const styles = useStyles();

  return (
    <Link to={"/recipe/" + recipe.id}>
      <Card className="recipe-card" elevation={2}>
          <div className="recipe-card__image-container">
            <CardMedia
              className="recipe-card__image"
              image={recipe.thumbnail}
            />
            <div className={styles.chips}>
              <Chip label={recipe.cookTime / 60 + ' min'} />
              <Chip label={recipe.caloricity + ' KCal'} />
              <Chip label={recipe.cuisine.title} />
            </div>
          </div>
          <CardContent style={{padding: 24}}>
            <h3>{recipe.title}</h3>
            <p className="body">{recipe.description}</p>
          </CardContent>
      </Card>
    </Link>
  );
}
 
export default RecipeCard;