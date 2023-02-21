import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackBarComponent } from '../components/snack-bar/snack-bar/snack-bar.component';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  private durationTime: number = 3000;

  constructor(private _snackBar: MatSnackBar) { }

  openSnackBar(message: string) {
    this._snackBar.openFromComponent(SnackBarComponent, {
      duration: 2500,
      data: {
        message: message
      }
    });
  }



}
