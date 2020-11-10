import { Component, Injector, OnInit } from '@angular/core';
import { BookService } from '../book/services/book.service';
import { IBookData } from '../interfaces/i-book-data';

@Component({
  selector: 'app-counter-component',
  templateUrl: './counter.component.html'
})
export class CounterComponent implements OnInit {
  public currentCount = 0;
  public message:string;
  public iDataService: IBookData

  constructor(
    private injector: Injector, 
    private bookService: BookService){
  }

  ngOnInit(): void {
    let selectedService:any = this.bookService.selectedService;

    this.message = this.injector
      .get<IBookData>(selectedService)
      .getBookList();
    }

  public incrementCounter() {
    this.currentCount++;
  }
}
