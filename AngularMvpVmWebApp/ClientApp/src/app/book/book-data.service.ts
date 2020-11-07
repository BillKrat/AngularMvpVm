import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Book } from '../Entities/book';

@Injectable({
  providedIn: 'root'
})
export class BookDataService {

  constructor(private http: HttpClient) { }

  getBookData(){
    var result = this.http.get<any>('assets/data/books.json')
        .toPromise()
        .then(res =><Book[]> res.data)
        .then(data=>data);
        return result;
  }
}
