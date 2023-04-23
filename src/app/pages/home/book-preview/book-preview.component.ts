import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { BookDevolutionComponent } from 'src/app/components/book-devolution/book-devolution.component';
import { Books } from 'src/app/interface/books';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-book-preview',
  templateUrl: './book-preview.component.html',
  styleUrls: ['./book-preview.component.scss']
})
export class BookPreviewComponent implements OnInit {

  constructor(private route: ActivatedRoute, private router: Router, public dialog: MatDialog) { }
  URL_BUCKET = environment.URL_BUCKET;
  book: any;
  ngOnInit(): void {
    this.book = this.route.snapshot.paramMap.get('book');
    if (this.book) {
      this.book = JSON.parse(this.book);
      console.log(this.book)
    }
  }

  openDialog(): void {
    const book: Books = this.book;
    const dialogRef = this.dialog.open(BookDevolutionComponent, {
      data: book
    });

    dialogRef.afterClosed().subscribe(result => {

    });
  }

  devolution(){
    this.openDialog();
  }


  back() {
    this.router.navigate(['home']);
  }

}
