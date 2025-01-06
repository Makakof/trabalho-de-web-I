import { BookService } from './../service/book.service';
import { Component, inject, OnInit } from '@angular/core';
import { RecipesService } from '../service/recipes.service';
import { Recipe } from '../models/recipe.model';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ModalBookRecipeComponent } from '../modals/modal-book-recipe/modal-book-recipe.component';
import { BsModalService } from 'ngx-bootstrap/modal';
import { take } from 'rxjs';
import { BookResponse } from '../models/book.model';

@Component({
  selector: 'app-view-recipe',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './view-recipe.component.html',
  styleUrl: './view-recipe.component.scss',
  providers: [BsModalService]
})
export class ViewRecipeComponent implements OnInit{
  private readonly recipeService = inject(RecipesService);

  private readonly modalService = inject(BsModalService);

  id!: number;
  recipe!: Recipe;


  constructor(private route: ActivatedRoute){}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const idParam = params.get('id');
      if (idParam) {
        this.id = parseInt(idParam, 10);
        this.findData(this.id);
      }
    });
  }

  findData(id: number): void{
    this.recipeService.getRecipeById(id).subscribe((result) => {
      if(result != null)
        this.recipe = result;
    });
  }

  getStars(score: number): Array<number> {
    return Array(score).fill(0);
  }

  favoritarRecipe(idRecipe: number): void{
    const modal = this.modalService.show(ModalBookRecipeComponent);
    modal.content?.listar();
    modal.content!.recipeId = idRecipe;
  }



}
