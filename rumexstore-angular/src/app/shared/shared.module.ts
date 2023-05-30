import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WordWrapPipe } from './pipes/word-wrap.pipe';

@NgModule({
  declarations: [
    WordWrapPipe
  ],
  imports: [
    CommonModule
  ],
  exports:[WordWrapPipe]
})
export class SharedModule { }
