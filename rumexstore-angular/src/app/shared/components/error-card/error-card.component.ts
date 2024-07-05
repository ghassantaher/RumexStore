import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-error-card',
  templateUrl: './error-card.component.html',
  styleUrls: ['./error-card.component.scss'],
})
export class ErrorCardComponent implements OnInit {
  constructor() {}
  @Input() message: string = 'An error was encountered with the requested page';
  @Output() retry = new EventEmitter();
  ngOnInit() {}
}
