import { Component, OnInit, Input, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-theme-preview-one',
  templateUrl: './theme-preview-one.component.html',
  styleUrls: ['./theme-preview-one.component.scss']

})
export class ThemePreviewOneComponent implements OnInit {

  constructor() { }
  @Input('data') data = {
    headerColorCode: '#1C57B7',
    bodyTextColorCode: '#616167',
    actionButtonColorCode: '#D11E47',
    logo: ''
  }
  //data: any = {};

  ngOnInit() {
  }
}
