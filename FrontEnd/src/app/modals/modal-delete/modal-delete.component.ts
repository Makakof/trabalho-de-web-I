import { BookService } from '../../service/book.service';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Component, inject } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-modal-delete',
  standalone: true,
  imports: [],
  templateUrl: './modal-delete.component.html',
  styleUrl: './modal-delete.component.scss'
})
export class ModalDeleteComponent {

  id?: number;

  onClose: Subject<boolean> = new Subject();

  private readonly bookService = inject(BookService)
  readonly bsModalRef = inject(BsModalRef)

  deleteBook() {
    this.bookService.deleteBook(this.id as number).subscribe(() => {
      this.onClose.next(true);
      this.bsModalRef.hide();
    });
  }
}
