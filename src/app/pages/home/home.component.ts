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
  page:number = 1;
  limit:number=5;

  loading = false;

  constructor(private bookService: BooksService, private router: Router) { }

  setLoading(loading:boolean){
    this.loading = loading;
  }

  ngOnInit(): void {
    this.setLoading(true);
    this.bookService.getBooks(this.page, this.limit).subscribe(books => {
      this.setLoading(false)
      this.books = books;
    }, error => this.setLoading(false));
  }

  navigate(path:string){
      this.router.navigate([`/${path}`], { replaceUrl: true });
  }

}
