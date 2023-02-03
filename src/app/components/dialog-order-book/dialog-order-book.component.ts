import { Component, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import moment from "moment";

@Component({
    selector: 'dialog-order-book',
    templateUrl: 'dialog-order-book.html',
    styleUrls: ['./dialog-order-book.scss']
  })
  export class DialogOrderBook {
    minDate = moment(new Date()).format('YYYY-MM-DD');
    maxDate = moment(new Date()).add(6, 'month')
    actualDate = moment(new Date()).add(1, 'month');
  
    constructor(
      public dialogRef: MatDialogRef<DialogOrderBook>,
      @Inject(MAT_DIALOG_DATA) public data: string,
    ) {     
    }
   
    incrementDate(){     
      if(this.actualDate.toDate() >= this.maxDate.toDate()) return;   
      this.actualDate.add(1, 'month');
    }
  
    onNoClick(): void {
      this.dialogRef.close();
    }
  }
  