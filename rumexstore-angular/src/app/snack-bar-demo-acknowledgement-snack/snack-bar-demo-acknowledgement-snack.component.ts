import { Component, inject } from '@angular/core';
import { MatSnackBarRef } from '@angular/material/snack-bar';

@Component({
  selector: 'app-snack-bar-demo-acknowledgement-snack',
  templateUrl: './snack-bar-demo-acknowledgement-snack.component.html',
  styleUrls: ['./snack-bar-demo-acknowledgement-snack.component.scss'],
})
export class SnackBarDemoAcknowledgementSnackComponent {
  snackBarRef = inject(MatSnackBarRef);
}
