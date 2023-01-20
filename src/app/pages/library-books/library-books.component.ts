import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Books } from 'src/app/interface/books';
import { BooksService } from 'src/app/services/books.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-library-books',
  templateUrl: './library-books.component.html',
  styleUrls: ['./library-books.component.scss']
})
export class LibraryBooksComponent implements OnInit {
  books:Array<Books> = [];
  URL_BUCKET = environment.URL_BUCKET;
  constructor(private router:Router, private booksService:BooksService) { }



  ngOnInit(): void {
    this.booksService.getBooks()
      .subscribe(books => this.books = books, error => console.error(error));
  }

  back(){
    this.router.navigate(['/home']);
  }

}
