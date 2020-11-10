import { Injectable } from '@angular/core';
import { IBookData } from '../../interfaces/i-book-data';

@Injectable({
  providedIn: 'root'
})
export class BookService implements IBookData{

  constructor() { }

  public selectedService: string = "Default";

  getBookList() {
    return 'Main service';
  }
}
