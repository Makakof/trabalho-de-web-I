import { Component, inject } from '@angular/core';
import { RecipesService } from '../service/recipes.service';
import { RecipeResponse } from '../models/recipe.model';
import { PaginationModule } from 'ngx-bootstrap/pagination';

@Component({
  selector: 'app-my-recipes',
  standalone: true,
  imports: [PaginationModule],
  templateUrl: './my-recipes.component.html',
  styleUrl: './my-recipes.component.scss'
})
export class MyRecipesComponent {
  private readonly recipeService = inject(RecipesService);
  recipes!: RecipeResponse;
  currentPage: number = 1;

  ngOnInit(): void {
    this.recipeService.listMineRecipes(1,10).subscribe((result) => {
      this.recipes = result;
      this.currentPage = this.recipes.meta.currentPage
    });
  }

  pageChanged(event:any) {
    this.recipeService.list(event.page, event.itemsPerPage).subscribe((result) => {
      this.recipes = result;
      this.currentPage = this.recipes.meta.currentPage
    });
  }

  getStars(score: number): Array<number> {
    return Array(score).fill(0);
  }
}
