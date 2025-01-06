import { Component, inject, Input } from '@angular/core';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { RecipeResponse } from '../models/recipe.model';
import { BookService } from '../service/book.service';

@Component({
  selector: 'app-book-recipe',
  standalone: true,
  imports: [PaginationModule],
  templateUrl: './book-recipe.component.html',
  styleUrl: './book-recipe.component.scss'
})
export class BookRecipeComponent {
  private readonly bookService = inject(BookService);
  recipes!: RecipeResponse;
  currentPage: number = 1;

  @Input() bookId: number = 0;

  ngOnInit(): void {
    this.bookService.listBookRecipes(this.bookId, 1,10).subscribe((result) => {
      this.recipes = result;
      this.currentPage = this.recipes.meta.currentPage
    });
  }

  pageChanged(event:any) {
    this.bookService.listBookRecipes(this.bookId, event.page, event.itemsPerPage).subscribe((result) => {
      this.recipes = result;
      this.currentPage = this.recipes.meta.currentPage
    });
  }

  getStars(score: number): Array<number> {
    return Array(score).fill(0);
  }
}
