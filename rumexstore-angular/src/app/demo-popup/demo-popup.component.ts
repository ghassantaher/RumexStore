import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-demo-popup',
  templateUrl: './demo-popup.component.html',
  styleUrls: ['./demo-popup.component.scss'],
})
export class DemoPopupComponent implements OnInit {
  public isMobileOrTablet!: boolean;

  constructor(
    public dialogRef: MatDialogRef<DemoPopupComponent, boolean>,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      title: string;
      content: string;
      okText: string;
      cancelText: string;
    },
  ) {}
  ngOnInit(): void {
    if (window.innerWidth > 768) {
      this.isMobileOrTablet = false;
    } else {
      this.isMobileOrTablet = true;
    }
  }
  onResize(event: any) {
    if (event.target.innerWidth > 768) {
      this.isMobileOrTablet = false;
    } else {
      this.isMobileOrTablet = true;
    }
  }
}
