import { Component, OnInit } from '@angular/core';
import { Books } from 'src/app/interface/books';
import { BooksService } from 'src/app/services/books.service';
import { getStorage, ref } from '@firebase/storage'
import { environment } from 'src/environments/environment';
import packageJson from 'package.json';
import { Router } from '@angular/router';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  URL_BUCKET = environment.URL_BUCKET;
  books: Array<Books> = [];
  version: string = packageJson.version;

  constructor(private bookService: BooksService, private router: Router) { }


  ngOnInit(): void {
    this.bookService.getBooks().subscribe(books => {
      this.books = books;
    });
  }

  navigate(path:string){
      this.router.navigate([`/${path}`]);
  }

}
