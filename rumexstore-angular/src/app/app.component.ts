import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DemoPopupComponent } from './demo-popup/demo-popup.component';
import { ViewportScroller } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(
    private dialog: MatDialog,
    private viewportScroller: ViewportScroller,
  ) {}
  title = 'rumexstore-angular';
  public isMobile!: boolean;
  ngOnInit() {
    if (window.innerWidth > 576) {
      this.isMobile = false;
    } else {
      this.isMobile = true;
    }
    this.popupDemo();
  }
  onResize(event: any) {
    if (event.target.innerWidth > 576) {
      this.isMobile = false;
    } else {
      this.isMobile = true;
    }
  }
  showText() {
    if (window.innerWidth > 768) {
      return true;
    } else {
      return false;
    }
  }
  isLessThan(width: number): boolean {
    if (window.innerWidth < width) {
      return true;
    } else {
      return false;
    }
  }
  popupDemo() {
    const dialogRef = this.dialog.open(DemoPopupComponent);

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }
  public onClick(elementId: string): void {
    this.viewportScroller.scrollToAnchor(elementId);
  }
}
