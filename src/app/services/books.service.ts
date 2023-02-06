import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http'
import { environment } from '../../environments/environment';
import { Books } from '../interface/books';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BooksService {

  private API_URL: string = environment.API_URL;

  constructor(private http: HttpClient) { }

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
    return this.http.put(`${this.API_URL}/books/updateAvaibleBook`, book);
  }

  getMyBooks(){
    return this.http.get<Array<Books>>(`${this.API_URL}/books/myBooks`);
  }

}
