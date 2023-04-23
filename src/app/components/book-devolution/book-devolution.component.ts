import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Books } from 'src/app/interface/books';
import { User } from 'src/app/interface/user';
import { BooksService } from 'src/app/services/books.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-book-devolution',
  templateUrl: './book-devolution.component.html',
  styleUrls: ['./book-devolution.component.scss']
})
export class BookDevolutionComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<BookDevolutionComponent>,
    @Inject(MAT_DIALOG_DATA) public book: Books, private bookService:BooksService, private userService:UserService) { }

  ngOnInit(): void {
    console.log(this.book)
  }

  onNoClick(){
    this.dialogRef.close();
  }

  devolution(){
    this.bookService.devolutionBook(this.book)
      .subscribe((user:User) =>{
        if(user){
          this.userService.updateUserStorage(user);
          this.onNoClick();
        }        
      }, error => {
        console.error(error)
      })
  }

}
