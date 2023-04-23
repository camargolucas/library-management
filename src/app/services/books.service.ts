import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http'
import { environment } from '../../environments/environment';
import { Books } from '../interface/books';
import { Observable } from 'rxjs';
import { User } from '../interface/user';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class BooksService {

  private API_URL: string = environment.API_URL;

  constructor(private http: HttpClient, private userService: UserService) { }

  params(page: number, limit: number) {
    let param = new HttpParams();

    param = param.append('page', page)

    param = param.append('limit', limit)

    return param;
  }

  getBooks(page: number, limit: number): Observable<Books[]> {
    const params = this.params(page, limit);


    return this.http.get<Array<Books>>(`${this.API_URL}/books`, { params });
  }

  updateAvaibleBook(book: Books) {
    const user = this.userService.getUser();
    const body = { book, user };

    return this.http.put<User>(`${this.API_URL}/books/updateAvaibleBook`, body);
  }

  devolutionBook(book: Books) {
    const user = this.userService.getUser();
    const body = { book, user };

    return this.http.put<User>(`${this.API_URL}/books/devolutionBook`, body);
  }
  // books/devolutionBook'

  myBooksQueryParam(user: User) {
    let query = new HttpParams()
    if (user && user._id) {
      query = query.append('_id', user._id)
    }
    return query;
  }

  getMyBooks() {
    const user = this.userService.getUser();
    const params = this.myBooksQueryParam(user);
    return this.http.get<Array<Books>>(`${this.API_URL}/books/myBooks`, { params });
  }

}
