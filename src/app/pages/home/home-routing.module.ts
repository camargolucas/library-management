import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LibraryBooksComponent } from '../library-books/library-books.component';
import { HomeComponent } from './home.component';
import { BookPreviewComponent } from './book-preview/book-preview.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent

  },
  {
    path: 'library-books',
    component: LibraryBooksComponent
  },
  {
    path: 'preview-book/:book',
    component: BookPreviewComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
