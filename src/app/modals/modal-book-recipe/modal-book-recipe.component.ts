import { Component, inject } from '@angular/core';
import { Subject } from 'rxjs';
import { BookService } from '../../service/book.service';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Book, BookRecipeDto, BookResponse } from '../../models/book.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-modal-book-recipe',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './modal-book-recipe.component.html',
  styleUrl: './modal-book-recipe.component.scss'
})
export class ModalBookRecipeComponent {

  books: BookResponse = { items: [] };

  id?: number;

  onClose: Subject<boolean> = new Subject();

  recipeId?: number;

  private readonly bookService = inject(BookService)
  readonly bsModalRef = inject(BsModalRef)

  listar(){
    this.bookService.list().subscribe((result) => {
      console.log();

      this.books = result;
    });
  }

  salvar(book: Book) {
    this.bookService.createBookRecipe({book, notes: '', recipe: { id: this.recipeId as number }})
      .subscribe({
        next: () => {
          console.log('Sucesso');
        },
        error: (error) => {
          console.error('Erro ao salvar:', error);
        }
      });
  }
}