import { Component, OnInit, HostListener } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Common } from '../../../utility/common';

@Component({
  selector: 'app-place-order',
  templateUrl: './place-order.component.html',
  styleUrls: ['./place-order.component.scss']
})
export class PlaceOrderComponent implements OnInit {
  showTopLink: boolean = false;
  verScroll: any;
  isViewStore : boolean = false;
  //activatedStep: string = "";
  constructor(private activatedRoute: ActivatedRoute, public common: Common) { }

  @HostListener('window:scroll', ['$event'])
  onWindowScroll() {

    this.verScroll = window.scrollY;
    if (this.verScroll > 100) {
      this.showTopLink = true;
    }
    else {
      this.showTopLink = false;
    }
  }

  ngOnInit() {

    //Only show browse product page if view store is true else show all
    if (this.common.isViewStore()) {
      this.isViewStore = true;
      this.common.activatedStep = 'placeorder';
    } else {
      this.isViewStore = false;
    }

    let value = this.activatedRoute.snapshot.routeConfig.path; //this.activatedRoute.snapshot.params.v;
    let id = this.activatedRoute.snapshot.params.id;
    if (id) {
      this.common.activatedStep = 'productdetail';
    } else if (value.toLowerCase()) {
      this.common.activatedStep = this.isViewStore ? 'placeorder' : value;
    }

     // Load cart json for each page , No need to load for revieworder page because loading from that file itself.
     if (value && value != 'revieworder') {
      this.common.getCartJson(() =>{
        this.common.addedCartCount = this.common.placeOrderObj.orderDetails.length;
      });
    }

  }

  // onLinkClick(routeData: string) {
  //   this.activatedStep = routeData;
  //   this.router.navigate(['order/' + routeData]);
  // }

  // backward() {
  //   if (this.activatedStep != 'placeorder' && this.activatedStep != 'productdetail') {
  //     switch (this.activatedStep) {
  //       case 'services': this.onLinkClick('placeorder');
  //         break;
  //       case 'orderdetail': if (this.common.storeClientInfo && this.common.storeClientInfo.isServicePageEnable) {
  //         this.onLinkClick('services');
  //       } else {
  //         this.onLinkClick('placeorder');
  //       }
  //         break;
  //       case 'revieworder': this.onLinkClick('orderdetail');
  //         break;
  //     }
  //   }
  // }

  // forward() {
  //   if (this.activatedStep != 'revieworder') {
  //     switch (this.activatedStep) {
  //       case 'productdetail':  //case productdetail is same as place order
  //       case 'placeorder': if (this.common.storeClientInfo && this.common.storeClientInfo.isServicePageEnable) {
  //         this.onLinkClick('services');
  //       } else {
  //         this.onLinkClick('orderdetail');
  //       }
  //         break;
  //       case 'services': this.onLinkClick('orderdetail');
  //         break;
  //       case 'orderdetail': this.onLinkClick('revieworder');
  //         break;
  //     }
  //   }
  // }

  //Scroll to top of the page
 animateToTop(e) {
   this.common.scrollToSection(e);
    // e.preventDefault();
    // var scrollToTop = window.setInterval(function () {
    //   var pos = window.pageYOffset;
    //   if (pos > 0) {
    //     window.scrollTo(0, pos - 20);
    //   } else {
    //     window.clearInterval(scrollToTop);
    //   }
    // }, 5);
 }



}
