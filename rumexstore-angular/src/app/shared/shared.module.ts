import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WordWrapPipe } from './pipes/word-wrap.pipe';
import { MatSpinnerOverlayComponent } from './components/mat-spinner-overlay/mat-spinner-overlay.component';
import { MaterialModule } from '../material.module';

@NgModule({
  declarations: [WordWrapPipe, MatSpinnerOverlayComponent],
  imports: [CommonModule, MaterialModule],
  exports: [WordWrapPipe,MatSpinnerOverlayComponent],
})
export class SharedModule {}
