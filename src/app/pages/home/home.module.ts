import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from './home-routing.module';
import { LibraryBooksComponent } from '../library-books/library-books.component';
import { FormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { DialogModule } from 'src/app/components/dialog-order-book/dialog-order-book.module';


@NgModule({
  declarations: [ LibraryBooksComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    FormsModule,
    MatDialogModule,
    DialogModule
   
  ]
})
export class HomeModule { }
