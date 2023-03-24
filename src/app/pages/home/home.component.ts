import { Component, OnInit } from '@angular/core';
import { Books } from 'src/app/interface/books';
import { BooksService } from 'src/app/services/books.service';
import { getStorage, ref } from '@firebase/storage'
import { environment } from 'src/environments/environment';
import packageJson from 'package.json';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { GenericDialogComponent } from 'src/app/components/generic-dialog/generic-dialog.component';



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
    this.getMyBooks()

    this.setLoading(true);
    this.bookService.getBooks(this.page, this.limit).subscribe(books => {
      this.setLoading(false)
      this.books = books.filter(book => book.avaible === true);
    }, error => this.setLoading(false));
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(GenericDialogComponent, {
      data: {

      }
    });

    dialogRef.afterClosed().subscribe(result => {      
      
    });
  }

  getMyBooks() {
    this.bookService.getMyBooks().subscribe(books => {
      this.myBooks = books;
    })
  }

  logout() {
    this.openDialog()
    //this.router.navigate([`/login`], { replaceUrl: true })
  }

  navigate(path: string) {
    this.router.navigate([`/home/${path}`], { replaceUrl: true });
  }

}
