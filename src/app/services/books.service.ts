import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { environment } from '../../environments/environment';
import { Books } from '../interface/books';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BooksService {

  API_URL:string = environment.API_URL;

  constructor(private http: HttpClient) { }


  getBooks():Observable<Books[]>{
    return this.http.get<Array<Books>>(`${this.API_URL}/books`);
  }


}
