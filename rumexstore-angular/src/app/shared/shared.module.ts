import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WordWrapPipe } from './pipes/word-wrap.pipe';
import { MatSpinnerOverlayComponent } from './components/mat-spinner-overlay/mat-spinner-overlay.component';
import { MaterialModule } from '../material.module';
import { ErrorCardComponent } from './components/error-card/error-card.component';

@NgModule({
  declarations: [WordWrapPipe, MatSpinnerOverlayComponent, ErrorCardComponent],
  imports: [CommonModule, MaterialModule],
  exports: [WordWrapPipe,MatSpinnerOverlayComponent, ErrorCardComponent],
})
export class SharedModule {}
