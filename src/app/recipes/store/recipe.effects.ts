import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {HttpClient, HttpRequest} from '@angular/common/http';
import {Store} from '@ngrx/store';
import {switchMap, map, withLatestFrom} from 'rxjs/operators';

import * as RecipeActions from '../store/recipe.actions';
import {Recipe} from '../recipe.model';
import * as fromRecipe from './recipe.reducers';

@Injectable()
export class RecipeEffects {
  @Effect()
  recipeFetch = this.actions$.pipe(
    ofType(RecipeActions.FETCH_RECIPES),
    switchMap((action: RecipeActions.FetchRecipes) => {
      return this.httpClient.get<Recipe[]>('https://axial-sunup-222821.firebaseio.com/recipes.json');
    }),
    map(
      (recipes) => {
        for (const recipe of recipes) {
          if (!recipe.ingredients) {
            recipe.ingredients = [];
          }
        }
        return {
          type: RecipeActions.SET_RECIPES,
          payload: recipes
        };
      }
    )
  );

  @Effect({dispatch: false})
  recipeStore = this.actions$.pipe(
    ofType(RecipeActions.STORE_RECIPES),
    withLatestFrom(this.store.select('recipes')),
    switchMap(([action, state]) => {
      const req = new HttpRequest('PUT',
        'https://axial-sunup-222821.firebaseio.com/recipes.json',
        state.recipes,
        {
          reportProgress: true
        });
      return this.httpClient.request(req);
    })
  );

  constructor(private httpClient: HttpClient, private actions$: Actions, private store: Store<fromRecipe.FeatureState>) {}
}
