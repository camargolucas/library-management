import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from './home-routing.module';
import { LibraryBooksComponent } from '../library-books/library-books.component';
import { FormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { DialogModule } from 'src/app/components/dialog-order-book/dialog-order-book.module';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { BookPreviewComponent } from './book-preview/book-preview.component';

@NgModule({
  declarations: [ LibraryBooksComponent, BookPreviewComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    FormsModule,
    MatDialogModule,
    DialogModule
  ]
})
export class HomeModule { }
