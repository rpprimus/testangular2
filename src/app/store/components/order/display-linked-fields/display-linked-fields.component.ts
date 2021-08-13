import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-display-linked-fields',
  templateUrl: './display-linked-fields.component.html',
  styleUrls: ['./display-linked-fields.component.scss']
})
export class DisplayLinkedFieldsComponent {

  @Input() field: any;
  @Input() obj: string = "";
  @Input() type: any = "";

}
