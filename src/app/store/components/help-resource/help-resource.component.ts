import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { SharedService } from '../../../shared/services/shared.service';
import { StoreService } from '../../service/store.service';
import { Common } from '../../utility/common';
import { Util } from '../../../shared/services/util';
import {Location } from '@angular/common';
import { AuthService } from '../../../shared/services/auth.service';

@Component({
  selector: 'app-help-resource',
  templateUrl: './help-resource.component.html',
  styleUrls: ['./help-resource.component.scss']
})
export class HelpResourceComponent implements OnInit {

  displayedColumns: string[] = ['resourceName'];
  dataSource = new MatTableDataSource();
  noRecords: boolean = false;

  constructor(private sharedService: SharedService, private storeService: StoreService, private util:Util,
    public common: Common, private location: Location,private auth:AuthService) { }

  ngOnInit() {
    this.getHelpAndResource();
  }

  getHelpAndResource() {
    let param: any = {
      clientId: this.common.storeClientInfo.id
    }
    this.storeService.getHelpAndResourceList(param).subscribe(response => {
      this.sharedService.onSuccess(response, null, () => {
        this.dataSource.data = response.response;
        this.noRecords = response.response.length > 0 ? false : true;
      });
    }, error => this.sharedService.onError(error));

  }

  downloadFile(id) {
    let param = {
      pathVariable: id
    }
    this.storeService.downloadHelpAndResourceList(param).subscribe((response: any) => {
      if(response.body.type=='application/json'){ //if user is deactivated,then he must be logged out from store
        this.auth.sessionExpired();
      }
      else{
      this.util.downloadFile(response);
      }
    }, error => this.sharedService.onError(error));
  }

  goBack() {
    // window.history.back();
    this.location.back();
    // console.log( 'goBack()...' );
  }

}
