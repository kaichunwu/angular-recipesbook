import {Recipe} from '../recipe.model';
import {Ingredient} from '../../shared/ingredient.model';
import * as RecipeActions from './recipe.actions';
import * as fromApp from '../../store/app.reducers';

export interface FeatureState extends fromApp.AppState {
  recipes: State;
}

export interface State {
  recipes: Recipe[];
}

export const initialState: State = {
  recipes: [
    new Recipe('A Test Recipe',
      'This is simply a test',
      'https://mommakesdinner.com/wp-content/uploads/2014/05/Butter-Cake-Recipe-with-free-printable-.jpg',
      [
        new Ingredient('Meat', 1),
        new Ingredient('French Fries', 20)
      ]),
    new Recipe('Another Test Recipe',
      'This is simply a test',
      // tslint:disable-next-line:max-line-length
      'https://media2.s-nbcnews.com/j/newscms/2018_35/1363730/rachel-hollis-chicken-fingers-today-main-180828_b9b2a726ec8654e3f9f7435ce26588fb.today-inline-large2x.jpg',
      [
        new Ingredient('Buns', 2),
        new Ingredient('Meat', 1)
      ]),
    new Recipe('Third Test Recipe',
      'This is simply a test',
      'https://mommakesdinner.com/wp-content/uploads/2014/05/Butter-Cake-Recipe-with-free-printable-.jpg',
      [
        new Ingredient('Meat', 1),
        new Ingredient('French Fries', 20)
      ])
  ]
};

export function recipeReducer(state = initialState, action: RecipeActions.RecipeActions) {
  switch (action.type) {
    case 'SET_RECIPES':
      return {
        ...state,
        recipes: [...action.payload]
      };
    case 'ADD_RECIPE':
      return {
        ...state,
        recipes: [...state.recipes, action.payload]
      };
    case 'UPDATE_RECIPE': {
      const updateRecipe = action.payload.updateRecipe;
      const recipes = [...state.recipes];
      recipes[action.payload.index] = updateRecipe;
      return {
        ...state,
        recipes
      };
    }
    case 'DELETE_RECIPE': {
      const oldRecipes = [...state.recipes];
      oldRecipes.splice(action.payload, 1);
      return {
        ...state,
        recipes: oldRecipes
      };
    }
    default: return state;
  }
}
