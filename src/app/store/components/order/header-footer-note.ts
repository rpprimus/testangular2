import { Component, OnInit, Input } from "@angular/core";
import { StoreService } from "../../service/store.service";
import { SharedService } from "../../../shared/services/shared.service";
import { Common } from "../../utility/common";

/**
 * @Custom header and footer on place order internal pages
 */
@Component({
  selector: 'app-header-footer-note',
  template:
    `
    <div class="header-txt-sec" *ngIf="data == 'HEADER'">
      <div class="dy-body-txt-color" innerHtml="{{common.headerText}}" ></div>
    </div>
    <div class="footer-txt-sec" *ngIf="data == 'FOOTER'">
      <div class="dy-body-txt-color" innerHtml="{{common.footerText}}" ></div>
    </div>
  
  `
})
export class HeaderFooterNote implements OnInit {
  @Input() data: string;
  // headerText: string = '';
  // footerText: string = '';

  constructor(private storeService: StoreService, private sharedService: SharedService, public common: Common) { }

  ngOnInit() {
    if(!this.common.headerText || !this.common.footerText ){
      this.getHeaderAndFooter();
    }
    // if(!localStorage.getItem('headerText')){
    //   this.getHeaderAndFooter();
    // }
    // else{
    //   this.headerText = localStorage.getItem('headerText');
    //   this.footerText = localStorage.getItem('footerText');
    // }
  }

  getHeaderAndFooter() {
    let param = {
      pathVariable: this.common.storeClientInfo.id
    }
    this.storeService.getHeaderFooter(param).subscribe(response => {
      this.sharedService.onSuccess(response, null, () => {
        if (response.response) {
          let data = response.response;
          // localStorage.setItem('headerText',data.header);
          // localStorage.setItem('footerText',data.footer);
          this.common.headerText = data.header;
          this.common.footerText = data.footer;
        }
      });
    }, error => { this.sharedService.onError(error) });
  }
}