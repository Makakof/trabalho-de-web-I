import { Component, inject } from '@angular/core';
import { BookService } from '../../service/book.service';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-modal-patch-book',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './modal-patch-book.component.html',
  styleUrl: './modal-patch-book.component.scss'
})
export class ModalPatchBookComponent {
  private readonly bookService = inject(BookService)
  readonly bsModalRef = inject(BsModalRef)
  private readonly fb = inject(FormBuilder)

  onClose: Subject<Boolean> = new Subject()

  form = this.fb.nonNullable.group({
    name: [''],
  });

  id?: number;

  update() {
    const { name } = this.form.value;
    this.bookService.update(this.id as number, name as string).subscribe(() => {
      this.onClose.next(true);
      this.bsModalRef.hide();
    });
  }
}
