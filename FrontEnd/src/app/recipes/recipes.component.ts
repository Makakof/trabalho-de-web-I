import { Component, inject, OnInit } from '@angular/core';
import { RecipesService } from '../service/recipes.service';
import { RecipeResponse } from '../models/recipe.model';
import { CommonModule } from '@angular/common';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { RouterLink, RouterModule } from '@angular/router';

@Component({
  selector: 'app-recipes',
  standalone: true,
  imports: [CommonModule, PaginationModule, RouterModule, RouterLink],
  templateUrl: './recipes.component.html',
  styleUrl: './recipes.component.scss'
})

export class RecipesComponent implements OnInit{

  private readonly recipeService = inject(RecipesService);
  recipes!: RecipeResponse;
  currentPage: number = 1;

  ngOnInit(): void {
    this.recipeService.list(1,8).subscribe((result) => {
      this.recipes = result;
      this.currentPage = this.recipes.meta.currentPage
    });
  }

  getStars(score: number): Array<number> {
    return Array(score).fill(0);
  }

  pageChanged(event:any) {
    this.recipeService.list(event.page, event.itemsPerPage).subscribe((result) => {
      this.recipes = result;
      this.currentPage = this.recipes.meta.currentPage
    });
  }
}
