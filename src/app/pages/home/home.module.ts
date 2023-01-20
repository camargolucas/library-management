import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { LibraryBooksComponent } from '../library-books/library-books.component';


@NgModule({
  declarations: [ LibraryBooksComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
   
  ]
})
export class HomeModule { }
