import { Component, OnInit } from '@angular/core';
import { Book } from 'src/app/Entities/book';
import { BookDataService } from '../book-data.service';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css'],
  providers:[BookDataService]
})
export class BookListComponent implements OnInit {
  books: Book[];

  constructor(
    private bookDataService: BookDataService, 
  ) { }

  ngOnInit() {
    
    this.bookDataService
      .getBookData()
      .then( books => {
        console.log("bookList", books);
        this.books = books;  
      });
  }
}
