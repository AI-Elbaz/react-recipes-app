import { useParams } from "react-router";
import { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core";
import { MyChip, ImageViewer } from ".";

import {
  LanguageOutlined,
  SentimentSatisfiedOutlined,
  WatchLaterOutlined,
  WhatshotOutlined
} from "@material-ui/icons";

const useStyle = makeStyles({
  root: {
    gap: 32,
    display: 'flex',
  }
});

const Recipe = () => {
  const { id } = useParams();
  const styles = useStyle();
  const [recipe, setRecipe] = useState(null);
  const [color, setColor] = useState(null);

  const getData = async () => {
    const url = `https://test.kode-t.ru/detail_${id}.json`;
    const res = await fetch(url);
    return await res.json();
  }

  useEffect(() => {
    getData().then(res => {
      setRecipe(res.recipe);
      setColor({
        'easy': 'var(--green)',
        'medium': 'var(--orange)',
        'hard': 'var(--red)',
      }[res.recipe.difficulty]);
    });
  }, [id]);

  return (
    <>
      {recipe &&
        <main className="recipe-page container">
          <section className="content">
            <header>
              <h2>{recipe.title}</h2>
              <p className="body">{recipe.description}</p>
              <div className={styles.root}>
                <MyChip label={recipe.difficulty} icon={<SentimentSatisfiedOutlined />} color={color} />
                <MyChip label={recipe.cookTime / 60 + ' min'} icon={<WatchLaterOutlined />} />
                <MyChip label={recipe.caloricity + ' KCal'} icon={<WhatshotOutlined />} />
                <MyChip label={recipe.cuisine.title} icon={<LanguageOutlined />} />
              </div>
            </header>
            <main>
              <section>
                <h3>Ingredients</h3>
                <ul>
                  {recipe.ingredients.map(v => <Li key={v} value={v} />)}
                </ul>
              </section>
              <section>
                <h3>Instructions</h3>
                <ul>
                  {recipe.instructions.map((v, i) => <Li key={v} number={i + 1} value={v} />)}
                </ul>
              </section>
            </main>
          </section>
          
          <section className="images">
            <ImageViewer thumbnail={recipe.thumbnail} images={recipe.images} />
          </section>
        </main>
      }
    </>
  );
}

const Li = ({value, number}) => {
  const style = {
    root: {
      display: 'flex',
      alignItems: 'flex-start',
      gap: 8,
    },
    number: {
      fontSize: 10,
      display: 'block',
      fontWeight: '700',
      lineHeight: '1em',
      padding: '4px 6px',
      textAlign: 'center',
      borderRadius: '50%',
      border: '1px solid #ddd'
    }
  };

  return (
    <li className="my-li body" style={style.root}>
      <span style={number && style.number}>{number || '•'}</span>
      <span>{value}</span>
    </li>
  );
}
 
export default Recipe;