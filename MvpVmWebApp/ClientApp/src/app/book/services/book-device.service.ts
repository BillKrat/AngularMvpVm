import { Injectable } from '@angular/core';
import { IBookData } from '../../interfaces/i-book-data';
import { BookService } from './book.service';

@Injectable({
  providedIn: 'root'
})
export class BookDeviceService extends BookService{

  constructor() { super(); }

  getBookList() {
    return 'Device service';
  }

}
