import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { CreateRecipeDto, Image, Ingrediente, Instruction, Rating, Recipe, RecipeResponse } from '../models/recipe.model';

@Injectable({
  providedIn: 'root'
})

export class RecipesService {
  private readonly API = environment.URL_BASE + '/recipes';
  private readonly http = inject(HttpClient);

  id?: number;

  list(page:number, limit:number): Observable<RecipeResponse> {
    // Define a quantidade de itens que serão retornados
    const params = new HttpParams().set("limit",limit).set('page', page);
    return this.http.get<RecipeResponse>(this.API,{params});
  }

  listMineRecipes(page:number, limit:number): Observable<RecipeResponse> {
    // Define a quantidade de itens que serão retornados
    const params = new HttpParams().set("limit",limit).set('page', page);
    return this.http.get<RecipeResponse>(this.API + '/mine',{params});
  }

  getRecipeById(id: number): Observable<Recipe> {
    const url = `${this.API}/${id}`;
    return this.http.get<Recipe>(url);
  }

  createRecipe(recipe: CreateRecipeDto): Observable<Recipe>{
    return this.http.post<Recipe>(this.API, recipe);
  }

  deleteRecipe(recipeId: number): Observable<Recipe>{
    return this.http.delete<Recipe>(this.API + '/' + recipeId);
  }

  publishRecipe(recipeId: number): Observable<Recipe>{
    return this.http.patch<Recipe>(this.API + '/' + recipeId + '/publish', {});
  }

  createIngrediente(RecipeId: number, ingredientes: Ingrediente): Observable<Ingrediente>{
    return this.http.post<Ingrediente>(this.API + '/' + RecipeId + '/ingredients', ingredientes);
  }

  createRating(RecipeId: number, rating: Rating): Observable<Rating>{
    return this.http.post<Rating>(this.API + '/' + RecipeId + '/rating', rating);
  }

  createImage(RecipeId: number, fileImage: FormData): Observable<Image>{
    return this.http.post<Image>(this.API + '/' + RecipeId + '/image', fileImage);
  }

  deleteImage(RecipeId: number): Observable<Image>{
    return this.http.delete<Image>(this.API + '/' + RecipeId + '/image');
  }

  createInstruction(RecipeId: number, instruction: Instruction): Observable<Instruction>{
    return this.http.post<Instruction>(this.API + '/' + RecipeId + '/instructions', instruction);
  }

  deleteIngrediente(RecipeId: number, ingredienteId: number): Observable<Ingrediente>{
    return this.http.delete<Ingrediente>(this.API + '/' + RecipeId + '/ingredients/' + ingredienteId);
  }

  deleteInstruction(RecipeId: number, instructionId: number): Observable<Instruction>{
    return this.http.delete<Instruction>(this.API + '/' + RecipeId + '/instructions/' + instructionId);
  }

}
