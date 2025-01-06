import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { RecipesService } from '../service/recipes.service';
import { CreateRecipeDto} from '../models/recipe.model';

@Component({
  selector: 'app-create-recipe',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './create-recipe.component.html',
  styleUrl: './create-recipe.component.scss'
})
export class CreateRecipeComponent {
  private readonly fb = inject(FormBuilder);
  private readonly recipesService = inject(RecipesService);

  recipe = this.initForm();

  fileImage = new FormData();

  onChange(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.fileImage.append('file', file, file.name);
    }
  }

  createRecipe() {
    this.recipesService
      .createRecipe({
        name: this.recipe.value.name,
        preparationTime: this.recipe.value.preparationTime,
        portion: this.recipe.value.portion,
        calories: this.recipe.value.calories,
        description: this.recipe.value.description,
        category: { id: this.recipe.value.categoryId },
      } as CreateRecipeDto)
      .subscribe({
        next: (resp) => {
          if (this.ingredientes.length) {
            (this.ingredientes.controls as FormGroup[]).forEach(
              (grupo: FormGroup) => {
                //FOI AQUI QUE EU MEXI
                const id = grupo.get('id')?.value;
                const dateCreated = grupo.get('dateCreated')?.value;
                const lastUpdated = grupo.get('lastUpdated')?.value;
                const name = grupo.get('name')?.value;
                const amount = +grupo.get('amount')?.value;
                const type = grupo.get('type')?.value;
                this.recipesService
                  .createIngrediente(resp.id, { id, dateCreated, lastUpdated, name, amount, type })
                  .subscribe();
              }
            );

            if (this.instructions.length) {
              (this.instructions.controls as FormGroup[]).forEach(
                (grupo: FormGroup) => {
                  //MEXI AQUI TAMBÉM, MESMO MOTIVO QUE O DE CIMA
                  const id = grupo.get('id')?.value;
                  const dateCreated = grupo.get('dateCreated')?.value;
                  const lastUpdated = grupo.get('lastUpdated')?.value;
                  const step = grupo.get('step')?.value;
                  this.recipesService
                    .createInstruction(resp.id, {id, dateCreated, lastUpdated, step })
                    .subscribe();
                }
              );
            }

            this.recipesService
              .createImage(resp.id, this.fileImage)
              .subscribe();
          }

          this.recipe = this.initForm();
        },
        error: () => {
            // this.recipesService.deleteRecipe(8).subscribe();
            // this.recipesService.createIngrediente(12, {name: 'costelinha', amount: 2, type: 'kg'}).subscribe();
        }
      });
  }

  initForm(){

      return this.fb.nonNullable.group({
        name: '',
        preparationTime: 0,
        portion: 0,
        calories: 0,
        description: '',
        categoryId: 0,
        ingredientes: this.fb.array([]),
        instructions: this.fb.array([])
      });
    }

  get ingredientes(): FormArray {
    return this.recipe.controls['ingredientes'] as FormArray;
  }

  addIngrediente() {
    const ingredientesForm = this.fb.nonNullable.group({
      name: '',
      amount: 0,
      type: '',
    });

    this.ingredientes.push(ingredientesForm);
  }

  removeIngrediente(index: number) {
    this.ingredientes.removeAt(index);
  }

  get instructions(): FormArray {
    return this.recipe.controls['instructions'] as FormArray;
  }

  addInstructions() {
    const instructionsForm = this.fb.nonNullable.group({ step: '' });

    this.instructions.push(instructionsForm);
  }

  removeInstructions(index: number) {
    this.instructions.removeAt(index);
  }
}
