import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-dynamic-display-field',
  templateUrl: './dynamic-display-field.component.html',
  styleUrls: ['./dynamic-display-field.component.scss']
})
export class DynamicDisplayFieldComponent implements OnInit {

  constructor() { }
  @Input() value = "";
  @Input() type = "";
  file: any;
  ngOnInit() {

    if (this.type == 'UPLOAD') {
      if (this.value) {
        let val = this.value.split('^^^'); //display the name of the uploaded image resource in the custom input feild
        this.file = { fileName: val[0], filePath: val[1] };
      }
    }
  }

}
