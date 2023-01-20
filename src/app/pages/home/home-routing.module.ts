import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LibraryBooksComponent } from '../library-books/library-books.component';
import { HomeComponent } from './home.component';

const routes: Routes = [
  {
    path: '',
    redirectTo:'home'
  },
  {
    path: 'home',
    component: HomeComponent

  },
  {
    path: 'library-books',
    component: LibraryBooksComponent

  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
