import { Component, ViewChild, ChangeDetectionStrategy } from '@angular/core';

@Component({
   selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  solution : number;
  num1 : number = 1;
  num2:number = 2;
  constructor() { }

  ngOnInit() {
    this.add();
  }

  add() {
    this.solution =this.num1 - this.num2;
  }

}


