import {Injectable} from '@angular/core';
import {HttpClient, HttpParams, HttpRequest} from '@angular/common/http';
// tslint:disable-next-line:import-blacklist
import 'rxjs/Rx';

import {RecipeService} from '../recipes/recipe.service';
import {Recipe} from '../recipes/recipe.model';

@Injectable()
export class DataStorageService {
  constructor(private httpClient: HttpClient, private recipeService: RecipeService) {}

  storeRecipes() {
    const req = new HttpRequest('PUT',
      'https://axial-sunup-222821.firebaseio.com/recipes.json',
      this.recipeService.getRecipes(),
      {
        reportProgress: true
      });
    return this.httpClient.request(req);
    // return this.httpClient.put('https://axial-sunup-222821.firebaseio.com/recipes.json',
    //   this.recipeService.getRecipes(),
    //   {
    //     params: new HttpParams().set('auth', token)
    //   });
  }

  getRecipes() {
    return this.httpClient.get<Recipe[]>('https://axial-sunup-222821.firebaseio.com/recipes.json')
      .map(
        (recipes) => {
          for (const recipe of recipes) {
            if (!recipe.ingredients) {
              recipe.ingredients = [];
            }
          }
          return recipes;
        }
      )
      .subscribe(
      (recipes: Recipe[]) => {
        this.recipeService.setRecipes(recipes);
      }
    );
  }
}
