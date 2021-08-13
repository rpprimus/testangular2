import { Component, OnInit } from '@angular/core';
import { SharedService } from '../../shared/services/shared.service';
import { Util } from '../../shared/services/util';
import { MatTableDataSource, MAT_LABEL_GLOBAL_OPTIONS } from '@angular/material';
import { DashboardService } from './dashboard.service';
import { Router } from '@angular/router';
import { AuthService } from '../../shared/services/auth.service';
import { Enum } from '../../shared/config/enum.enum';
import { Common } from '../../store/utility/common';
import { FormControl } from '@angular/forms';
import { SocketIoService } from '../../shared/services/socketio.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  providers: [
    { provide: MAT_LABEL_GLOBAL_OPTIONS, useValue: { float: 'never' } }   //this is done to hide the placeholder from the dropdown
  ]

})
export class DashboardComponent implements OnInit {
  selectedValue: string = "";
  clients: any = [];
  data: any = {}
  displayedColumns: string[] = ['OrderNo', 'OrderDate', 'Client'];
  placeDataSource = new MatTableDataSource();
  notReturnedDataSource = new MatTableDataSource();
  shipmentDataSource = new MatTableDataSource();
  noPlaceRecord: boolean = false;
  noReturnedRecord: boolean = false;
  noShipmentRecord: boolean = false;
  url: any;
  hasPermission: boolean = false;  //show the go to store button in case of logged in user is admin or account manager

  filteredOptions: any = [];
  noResult: boolean = false;
  searchClientName = new FormControl();

  ioConnection: any;
  private redisChannelName: any = 'ORDER_STATUS_TYPES';
  private redisTextReceived: any = 'dashboard-refresh';

  constructor(private authService: AuthService, private sharedService: SharedService, private util: Util, private common: Common, private dashboardService: DashboardService, private router: Router, private socketioService: SocketIoService) {
    this.util.currentPageLink = "dashboard";
    if (localStorage.getItem('selectedClientId') != "null" && localStorage.getItem('selectedClientId') != undefined && localStorage.getItem('selectedClientId') != "undefined") {
      this.selectedValue = JSON.parse(localStorage.getItem('selectedClientId'));
      this.searchClientName.setValue(JSON.parse(localStorage.getItem('selectedClientInfo')).name);
      //this.common.getLogo(this.selectedValue);   //change the logo of the selected client
    }
  }

  ngOnInit() {
    this.getClients();
    this.searchClientName.valueChanges.subscribe(value => {
      this.noResult = false;
      if (value != undefined && (value.length === 0 || value === "")) {
        localStorage.setItem('selectedClientInfo', null);  //reset the selected client info
        localStorage.setItem('selectedClientId', null);
        this.common.storeLogo = "";    //restore the original logo
        this.selectedValue = ""  //disable the gotostore button
        this.filteredOptions = this.clients;
        this.getDashboardData();
      } else {
        this.filteredOptions = this._filter(value && value.trim());
        if (this.filteredOptions.length == 0) {
          this.noResult = true;
        }
      }
    });

    this.getDashboardData();
    this.initIoConnection();
    // Workshop team user added for Store Access from Admin.
    this.hasPermission = this.authService.isRoleExists([Enum.CreditCard_Admin,Enum.ADMIN, Enum.MANAGER, Enum.TEAM]);
  }


  //Select client option filteration
  private _filter(value: string) {
    const filterValue = value ? value.toLowerCase() : '';
    return this.clients.filter(option => option.name.toLowerCase().includes(filterValue));
  }

  //Get the value of dashboard and if client selected pass it in params
  getDashboardData() {
    let param = {};
    let request;
    if (localStorage.getItem('selectedClientId') != "null" && localStorage.getItem('selectedClientId') != undefined && localStorage.getItem('selectedClientId') != "undefined") {
      param = {
        clientId: JSON.parse(localStorage.getItem('selectedClientId'))
      }
      request = this.dashboardService.getDashboard(param);
    }
    else {
      request = this.dashboardService.getDashboard();
    }
    request.subscribe(response => {
      this.sharedService.onSuccess(response, null, (value) => {
        if (value) {
          this.data = response.response;
          this.placeDataSource.data = this.data.placeOrders;
          this.notReturnedDataSource.data = this.data.ordersNotReturn;
          this.shipmentDataSource.data = this.data.upcomingShipment;
          this.noPlaceRecord = this.placeDataSource.data.length > 0 ? false : true;
          this.noReturnedRecord = this.notReturnedDataSource.data.length > 0 ? false : true;
          this.noShipmentRecord = this.shipmentDataSource.data.length > 0 ? false : true;
        }
      });

    }, error => { this.sharedService.onError(error) });
  }

  getClients() {
    this.dashboardService.getClients().subscribe(response => {
      this.sharedService.onSuccess(response, null, () => {
        if (response.response) {
          this.clients = response.response.results;
          this.filteredOptions = this.clients;
        }
      });
    });
  }

  /**Store the value of selected client in local storage */
  clientSelected(client, event: any) {
    if (client && event.source.selected) {
      localStorage.setItem('selectedClientInfo', JSON.stringify(client));   //to store the value of selected client such that it can be naviagted to store
      localStorage.setItem('selectedClientId', client.id);  //this is maintained so that other pages are not affected
      this.common.getLogo(client.id);   //get the logo of selected client
      this.searchClientName.setValue(client.name);
      this.selectedValue = client.name;
    } else {
      localStorage.setItem('selectedClientInfo', null);
      localStorage.setItem('selectedClientId', null);
      this.common.storeLogo = "";    //restore the original logo
      this.selectedValue = "";
    }
    this.getDashboardData();
  }

  keyPress($event) {
    if ($event.target.textContent) {
      let selectedClient = this.clients.find(x => x.name == $event.target.textContent);
      this.clientSelected(selectedClient, $event);
    }
  }

  onRowClick(id: number, client) {
    let clientInfo: any = {
      id: client.clientId,
      name: client.clientName,
      domainName: client.clientDomainName
    }
    localStorage.setItem('selectedClientInfo', JSON.stringify(clientInfo));   //to store the value of selected client such that it can be naviagted to store
    localStorage.setItem('selectedClientId', client.clientId);
    this.common.getLogo(client.clientId);   //get the logo of selected client
    this.selectedValue = client;
    this.util.currentPageLink = "orders";
    this.router.navigate(['/manageorder/' + id]);
  }

  /**
   * When press Go to store button, this function is called
   * For local env testing we pass store=true&client=${clientInfo.domainName}&gotostore=true  these params in query & access them in authservice.ts
   * gotostore=true -> we add a new query parameter with URL so that we can direct move to store dasboard
   * We need to check token authorization at backend so that if someone (who dont have permissions) try to do with URL it should not work.
   */
  goToStore() {
    let url;
    if (this.selectedValue) {
      let clientInfo = JSON.parse(localStorage.getItem('selectedClientInfo'));
      if (location.host.includes('localhost')) {   //for local testing
        url = `http://${clientInfo.domainName.trim()}.sparkslinkdev.compunnel.com/authstore?token=${localStorage.getItem('accessToken')}&store=true`
      }
      else {
        //url = `http://${clientInfo.domainName.trim()}.${location.host}/authstore?token=${localStorage.getItem('accessToken')}`;
        if (location.host.includes('www.')) {
          var host = location.host.replace('www.', '');
          url = `${this.util.http.getValue()}://${clientInfo.domainName.trim()}.${host}/authstore?token=${localStorage.getItem('accessToken')}`;
        }
        else {
          if (this.util.www.getValue()) {
            url = `${this.util.http.getValue()}://${this.util.www.getValue()}.${clientInfo.domainName.trim()}.${location.host}/authstore?token=${localStorage.getItem('accessToken')}`;
          }
          else {
            url = `${this.util.http.getValue()}://${clientInfo.domainName.trim()}.${location.host}/authstore?token=${localStorage.getItem('accessToken')}`;
          }

        }

      }

      window.open(url, '_blank');
    }
  }

  private initIoConnection(): void {
    this.util.socketChannel.next(this.redisChannelName);
    if (this.socketioService.socketObservale && !this.socketioService.socketObservale.closed) {
      this.socketioService.socketObservale.unsubscribe();
    }
    this.socketioService.socketObservale = this.socketioService.getMessages().subscribe((value: any) => {
      let data;
      if (value.includes('data') && typeof value === 'string') {
        let obj = JSON.parse(value);
        data = obj['data'];
      } else {
        data = value;
      }
      if (data === this.redisTextReceived) {
        this.getDashboardData();
      }
    });
  }
}
