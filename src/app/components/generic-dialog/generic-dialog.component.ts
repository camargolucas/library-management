import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Route, Router } from '@angular/router';


@Component({
  selector: 'app-generic-dialog',
  templateUrl: './generic-dialog.component.html',
  styleUrls: ['./generic-dialog.component.scss']
})
export class GenericDialogComponent implements OnInit {

  constructor(  public dialogRef: MatDialogRef<GenericDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private route:Router) { }

  ngOnInit(): void {
  }


  onNoClick(){
    this.dialogRef.close();
  }
  logout(){
    this.dialogRef.close();
    localStorage.clear();
    this.route.navigate(['login'], { replaceUrl: true })
  }

}
