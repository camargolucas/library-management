import { Component, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import moment from "moment";
import { Books } from "src/app/interface/books";
import { BooksService } from "src/app/services/books.service";

@Component({
  selector: 'dialog-order-book',
  templateUrl: 'dialog-order-book.html',
  styleUrls: ['./dialog-order-book.scss']
})
export class DialogOrderBook {
  actualDate = moment(new Date()).add(3, 'month');
  book: Books
  saving: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<DialogOrderBook>,
    @Inject(MAT_DIALOG_DATA) public data: any, private bookService: BooksService
  ) {
    this.book = data['book'];
  }

  setSaving(saving: boolean) {
    this.saving = saving;
  }

  loanBook() {
    this.setSaving(true);
    this.bookService.updateAvaibleBook(this.book).subscribe(
      ret => {
        this.setSaving(false);
        this.dialogRef.close(ret);
      },
      error => {
        this.setSaving(false);
        console.error(error);
      }
    );
  }


  onNoClick(): void {
    this.dialogRef.close();
  }
}
