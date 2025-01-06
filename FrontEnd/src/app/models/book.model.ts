import { Recipe } from "./recipe.model";
import { CreateUserDto } from "./user.model";

export interface BookResponse {
  items: Book[];
}

export interface Book {
  id: number;
  dateCreated: Date;
  lastUpdated: Date;
  name: string;
  User: CreateUserDto;
  Recipes: BookRecipe[];
}

export interface BookRecipe{
  id: number;
  dateCreated: Date;
  lastUpdated: Date;
  book: Book;
  recipe: Recipe;
  notes: string;
}

export interface CreateBookRecipeDto{
  recipe: RelationEntityDto;
  notes: string;
}

export interface RelationEntityDto{
  id: number;
}

