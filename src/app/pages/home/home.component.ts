import { Component, OnInit } from '@angular/core';
import { Books } from 'src/app/interface/books';
import { BooksService } from 'src/app/services/books.service';
import { getStorage, ref } from '@firebase/storage'
import { environment } from 'src/environments/environment';
import packageJson from 'package.json';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { GenericDialogComponent } from 'src/app/components/generic-dialog/generic-dialog.component';
import { BookDevolutionComponent } from 'src/app/components/book-devolution/book-devolution.component';
import { DialogOrderBook } from 'src/app/components/dialog-order-book/dialog-order-book.component';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  URL_BUCKET = environment.URL_BUCKET;
  books: Array<Books> = [];
  version: string = packageJson.version;
  page: number = 1;
  limit: number = 5;
  loading = false;
  myBooks: Array<Books> = [];


  constructor(private bookService: BooksService, private router: Router, public dialog: MatDialog) { }

  setLoading(loading: boolean) {
    this.loading = loading;
  }

  ngOnInit(): void {
    this.getBooks()
  }

  getBooks() {
    this.setLoading(true);
    this.getMyBooks()
    this.getAvaibleBooks()
  }


  openDialog(): void {
    const dialogRef = this.dialog.open(GenericDialogComponent, {
      data: {

      }
    });

    dialogRef.afterClosed().subscribe(result => {

    });
  }

  getAvaibleBooks() {
    this.bookService.getBooks(this.page, this.limit).subscribe(books => {
      this.setLoading(false)
      this.books = books.filter(book => book.avaible === true);
    }, error => this.setLoading(false));
  }

  getMyBooks() {
    this.bookService.getMyBooks().subscribe(books => {
      console.log(books)
      this.myBooks = books;
    })
  }

  orderBook(book:Books){
    const dialogRef = this.dialog.open(DialogOrderBook, {
      data: {
        book: book
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getBooks();
    });
  }

  previewBook(book: Books, ) {

    const dialogRef = this.dialog.open(BookDevolutionComponent, {
      data: book
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getBooks();
    });
  }

  logout() {
    this.openDialog()
    //this.router.navigate([`/login`], { replaceUrl: true })
  }

  navigate(path: string) {
    this.router.navigate([`/home/${path}`], { replaceUrl: true });
  }

}
