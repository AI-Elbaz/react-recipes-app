import { useState, useEffect } from "react";
import { useStore } from "react-context-hook";
import { RecipeCard } from ".";

const RecipesList = () => {
  const [recipes, setRecipes] = useState(null);
  const [filters, , ] = useStore('currentFilters');
  const [, setCaloriesRange, ] = useStore('caloriesRange');
  const [calories, setCalories, ] = useStore('currentCalories');
  const [search, , ] = useStore('search');

  const getData = async () => {
    const url = "https://test.kode-t.ru/list.json";
    const res = await fetch(url);
    return await res.json();
  }

  useEffect(() => {
    getData().then(({recipes}) => {
      let c = recipes.map(r => r.caloricity);
      let t = [Math.min(...c), Math.max(...c)];
      setCaloriesRange(t);
      setCalories(t);
      setRecipes(recipes);
    });
  }, []);

  const searchFilter = (data) => {
    if (data && search !== '') {
      return data.filter(r => 
        r.title.toLowerCase().includes(search.toLowerCase()));
    }
    return data;
  }

  return (
    <>
      {recipes &&
        <main className="recipes container">
          {searchFilter(recipes)
            .filter(r => r.caloricity >= calories[0] && r.caloricity <= calories[1])
            .filter(r => filters[r.cuisine.title])
            .map(recipe =>
              <RecipeCard key={recipe.id} recipe={recipe} />
          )}
        </main>
      }
    </>
  );
}

export default RecipesList;