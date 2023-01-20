import { Component, OnInit } from '@angular/core';
import { Books } from 'src/app/interface/books';
import { BooksService } from 'src/app/services/books.service';
import { getStorage, ref } from '@firebase/storage'
import { environment } from 'src/environments/environment';
import packageJson from 'package.json';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  URL_BUCKET = environment.URL_BUCKET;
  books: Array<Books> = [];
  version: string = packageJson.version;

  constructor(private bookService: BooksService) { }


  ngOnInit(): void {
    this.bookService.getBooks().subscribe(books => {
      this.books = books;
    });
  }


  firebaseDownload() {
    const storage = getStorage();
    const pathRef = ref(storage, 'books/cristianismo_puro_e_simples.webp')

    const gsReference = ref(storage, 'gs://library-app-f26ca.appspot.com/books/cristianismo_puro_e_simples.webp')
    const httpsReference = ref(storage, 'https://firebasestorage.googleapis.com/v0/b/library-app-f26ca.appspot.com/o/books%2Fcristianismo_puro_e_simples.webp')
  }

}
