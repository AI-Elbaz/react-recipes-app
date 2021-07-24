import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Header, RecipesList, Recipe } from './components/index';
import { withStore } from 'react-context-hook';
import './style/index.css';

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Switch>
          <Route exact path="/">
            <RecipesList />
          </Route>
          <Route exact path="/recipe/:id">
            <Recipe />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

const initialState = {
  filters: {
    'Caribbean': true,
    'Greek': true,
    'French': true,
    'Indian': true,
    'Chinese': true,
  },
  currentFilters: {
    'Caribbean': true,
    'Greek': true,
    'French': true,
    'Indian': true,
    'Chinese': true,
  },
  caloriesRange: [],
  currentCalories: [],
  search: '',
};

export default withStore(App, initialState);