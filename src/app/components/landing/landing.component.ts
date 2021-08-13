import { Component, OnInit } from '@angular/core';
import { Util } from '../../shared/services/util';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {

  constructor(private util:Util) { }

  ngOnInit() {
  }

  //navigate the page url to the existing application of Sparkslink
  navigateToExisting(){
    location.assign(this.util.existingPortal.getValue());
  }

}
