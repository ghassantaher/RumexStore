import { Component, OnInit, inject } from '@angular/core';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { SnackBarDemoAcknowledgementSnackComponent } from '../snack-bar-demo-acknowledgement-snack/snack-bar-demo-acknowledgement-snack.component';

@Component({
  selector: 'app-snack-bar-demo-acknowledgement',
  templateUrl: './snack-bar-demo-acknowledgement.component.html',
  styleUrls: ['./snack-bar-demo-acknowledgement.component.scss'],
})
export class SnackBarDemoAcknowledgementComponent implements OnInit {
  horizontalPosition: MatSnackBarHorizontalPosition = 'left';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  constructor(private _snackBar: MatSnackBar) {}
  ngOnInit(): void {
    this._snackBar.openFromComponent(
      SnackBarDemoAcknowledgementSnackComponent,
      {
        duration: 0, horizontalPosition: this.horizontalPosition, verticalPosition:this.verticalPosition
      },
    );
  }
}
