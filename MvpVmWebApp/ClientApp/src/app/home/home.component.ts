import { Component, OnInit } from '@angular/core';
import { BookService } from '../book/services/book.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})

export class HomeComponent implements OnInit {
  private selectedService: string;

  constructor(private bookService: BookService){

  }
  ngOnInit(): void {
    this.selectedService = this.bookService.selectedService;
  }

  setService() {
    this.bookService.selectedService = this.selectedService;
    alert(`Set [${this.selectedService}] as data access layer`);
  }

}
