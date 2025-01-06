import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { BookService } from './../service/book.service';
import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { BookResponse } from '../models/book.model';
import { BsModalService } from 'ngx-bootstrap/modal';
import { ModalDeleteComponent } from '../modals/modal-delete/modal-delete.component';
import { ModalCreateBookComponent } from '../modals/modal-create-book/modal-create-book.component';
import { take } from 'rxjs';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ModalPatchBookComponent } from '../modals/modal-patch-book/modal-patch-book.component';
import { BookRecipeComponent } from "../book-recipe/book-recipe.component";
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, BsDropdownModule, BookRecipeComponent, RouterLink, RouterOutlet],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
  providers: [BsModalService]
})
export class SidebarComponent implements OnInit {
  private readonly bookService = inject(BookService);
  private readonly fb = inject(FormBuilder);
  private readonly modalService = inject(BsModalService);

  form = this.fb.nonNullable.group({
    name: [''],
  });

  books: BookResponse = { items: [] };

  errorMessage!: string;

  id!: number;

  passarId(bookId: number){
    console.log(bookId);

    this.id = bookId;
  }

  ngOnInit(): void {
    this.listar();
  }

  listar(){
    this.bookService.list().subscribe((result) => {
      this.books = result;
    });
  }

  createBook(){

    const modal = this.modalService.show(ModalCreateBookComponent);
    modal.content?.onClose.pipe(take(1)).subscribe((resp) => {
      if(resp){
        this.listar();
      }
    });
  }

  confirmDelete(bookId: number) {
    const modal = this.modalService.show(ModalDeleteComponent, {
      initialState: { id: bookId }
    });
    modal.content?.onClose.pipe(take(1)).subscribe((resp) => {
      if(resp){
        this.listar();
      }
    });
  }

  update(bookId: number){
    const modal = this.modalService.show(ModalPatchBookComponent,{
      initialState: { id: bookId }
    });
    modal.content?.onClose.pipe(take(1)).subscribe((resp) => {
      if(resp){
        this.listar();
      }
    });
  }
}
