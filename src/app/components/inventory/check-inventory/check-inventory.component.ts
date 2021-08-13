import { Component, OnInit } from '@angular/core';
import { SharedService } from '../../../shared/services/shared.service';
import { Enum } from '../../../shared/config/enum.enum';
import { Util } from '../../../shared/services/util';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-check-inventory',
  templateUrl: './check-inventory.component.html',
  styleUrls: ['./check-inventory.component.scss']
})
export class CheckInventoryComponent implements OnInit {
  productId: string = "";
  currentInvRecord: number = 0;
  totalInvRecords: number = 0;
  enum = Enum;
  id:number = 0;

  constructor(private util: Util,private sharedService : SharedService,
    private _activatedRoute: ActivatedRoute ,private router: Router) { 
      this.util.currentPageLink = "inventory"; 
    }

  ngOnInit() {
    this.id = this._activatedRoute.snapshot.params['id'] ? this._activatedRoute.snapshot.params['id'] : 0;
    this.getInventorySequence();
  }

  getProductId(data) {
    if (data) {
      this.productId = data;
    }
  }

  //Get the current sequence of data 
  getInventorySequence() {
    this.sharedService.getSequence(this.enum.inventory, localStorage.getItem('selectedClientId'), (value) => {
      this.totalInvRecords = value.length;
      this.currentInvRecord = value.find(x => x.id == this.id)['sequence'];
    });
  }

  getRecord(type, event) {
    if(event){
        event.preventDefault();
    }
    let id;
    switch (type) {
        case "first": id = this.sharedService.retrieveSequenceMap(1);
            break;
        case "pre": id = this.sharedService.retrieveSequenceMap(this.currentInvRecord - 1);
            break;
        case "next": id = this.sharedService.retrieveSequenceMap(this.currentInvRecord + 1);
            break;
        case "last": id = this.sharedService.retrieveSequenceMap(this.totalInvRecords);
            break;
    }
    //to reload the same url
    this.router.navigateByUrl('/', { skipLocationChange: true })
        .then(() => this.router.navigate(['/inventory/detail/' + id]));

}

}
