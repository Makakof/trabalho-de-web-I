import { BookRecipe, CreateBookRecipeDto } from './../models/book.model';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Book, BookResponse } from '../models/book.model';
import { Observable } from 'rxjs';
import { RecipeResponse } from '../models/recipe.model';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  private readonly API = environment.URL_BASE + '/books';
  private readonly http = inject(HttpClient);

  list(): Observable<BookResponse> {
    return this.http.get<BookResponse>(this.API);
  }

  createBook(name: string): Observable<Book>{
    return this.http.post<Book>(this.API, {name});
  }

  deleteBook(id: number): Observable<Book>{
    return this.http.delete<Book>(this.API + '/' + id);
  }

  update(id: number, name: string): Observable<Book>{
    return this.http.patch<Book>(this.API + '/' + id, {name});
  }

  listBookRecipes(bookId: number, page:number, limit:number): Observable<RecipeResponse> {
    // Define a quantidade de itens que serão retornados
    const params = new HttpParams().set("limit",limit).set('page', page);
    return this.http.get<RecipeResponse>(this.API + '/' + bookId + '/recipes' ,{params});
  }

  createBookRecipe(bookId: number, createBookRecipeDto: CreateBookRecipeDto): Observable<BookRecipe>{
    return this.http.post<BookRecipe>(this.API + '/' + bookId + '/recipes', createBookRecipeDto);
  }

}
