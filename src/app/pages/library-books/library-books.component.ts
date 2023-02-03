import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Books } from 'src/app/interface/books';
import { BooksService } from 'src/app/services/books.service';
import { environment } from 'src/environments/environment';
import { MatDialog } from '@angular/material/dialog'
import { DialogOrderBook } from 'src/app/components/dialog-order-book/dialog-order-book.component';


@Component({
  selector: 'app-library-books',
  templateUrl: './library-books.component.html',
  styleUrls: ['./library-books.component.scss']
})
export class LibraryBooksComponent implements OnInit {
  books: Array<Books> = [];
  URL_BUCKET = environment.URL_BUCKET;
  page: number = 1;
  limit: number = 2;

  inputText: any;

  loading: boolean = false;


  constructor(private router: Router, private booksService: BooksService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.loadBooks();
  }

  loadBooks() {
    this.setLoading(true);
    this.booksService.getBooks(this.page, this.limit)
      .subscribe(books => {
        this.setLoading(false);
        this.books = books
        this.filteredBooks = books;
      }, error => {
        this.setLoading(false)
        console.error(error);
      });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogOrderBook, {

    });

    dialogRef.afterClosed().subscribe(result => {
      this.loadBooks();
    });
  }


  setLoading(loading: boolean) {
    this.loading = loading;
    console.log(this.loading)
  }


  filteredBooks: Array<Books> = [];
  public filterBooks(event: any) {

    const inputValue = event.target.value
    if (inputValue == '') {
      this.filteredBooks = this.books;
    }

    this.filteredBooks = this.books.filter(book => {
      return book.name.toLowerCase().includes(inputValue.toLowerCase())
        || book.author.toLowerCase().includes(inputValue.toLowerCase())
    })

  }

  back() {
    this.router.navigate(['/home'], { replaceUrl: true });
  }

}

