import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Books } from 'src/app/interface/books';
import { BooksService } from 'src/app/services/books.service';
import { environment } from 'src/environments/environment';
import { MatDialog } from '@angular/material/dialog'
import { DialogOrderBook } from 'src/app/components/dialog-order-book/dialog-order-book.component';
import { UtilsService } from 'src/app/services/utils.service';


@Component({
  selector: 'app-library-books',
  templateUrl: './library-books.component.html',
  styleUrls: ['./library-books.component.scss']
})
export class LibraryBooksComponent implements OnInit {
  books: Array<Books> = [];
  filteredBooks: Array<Books> = [];
  URL_BUCKET = environment.URL_BUCKET;
  page: number = 1;
  limit: number = 5;
  inputText: any;
  loading: boolean = false;


  constructor(private router: Router, private booksService: BooksService, public dialog: MatDialog,
    private utilsService:UtilsService) { }

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

  openDialog(book:Books): void {
    const dialogRef = this.dialog.open(DialogOrderBook, {
      data: {
        book: book
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result && result['modifiedCount'] > 0){
        this.loadBooks();
        this.utilsService.openSnackBar("Livro emprestado com sucesso!")
      };
      
    });
  }


  setLoading(loading: boolean) {
    this.loading = loading;
    console.log(this.loading)
  }



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

