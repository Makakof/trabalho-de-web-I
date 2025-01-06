import { Component, inject } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { BookService } from '../../service/book.service';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-modal-create-book',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './modal-create-book.component.html',
  styleUrl: './modal-create-book.component.scss'
})
export class ModalCreateBookComponent {

  private readonly bookService = inject(BookService)
  readonly bsModalRef = inject(BsModalRef)
  private readonly fb = inject(FormBuilder)

  onClose: Subject<Boolean> = new Subject()

  form = this.fb.nonNullable.group({
    name: [''],
  });

  createBook() {
    const { name } = this.form.value;
    this.bookService.createBook(name as string).subscribe(() => {
      this.onClose.next(true);
      this.bsModalRef.hide();
    });
  }
}
