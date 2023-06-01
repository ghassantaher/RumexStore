import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatGridListModule } from '@angular/material/grid-list'; 
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
const modules = [
  MatButtonModule,
  MatToolbarModule,
  MatIconModule,
  MatGridListModule,
  MatButtonToggleModule,
  MatListModule,
  MatCardModule,
  // MatFormFieldModule,
  // MatInputModule,
  MatTooltipModule,
  // MatSidenavModule,
  // MatListModule,
  // MatDialogModule,
  // MatSnackBarModule,
  MatExpansionModule,
  // MatGridListModule,
  MatPaginatorModule,
  MatTableModule,
] as any[];

@NgModule({
  declarations: [],
  imports: [CommonModule],
  exports: modules,
})
export class MaterialModule {}
