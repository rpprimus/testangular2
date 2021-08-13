import { Component, OnInit } from '@angular/core';

import { Router, ActivatedRoute } from '@angular/router';
import { SharedService } from '../../../shared/services/shared.service';
import { AppMessage } from '../../../shared/config/app-message.enum';
import { Enum } from '../../../shared/config/enum.enum';
import { Common } from '../../utility/common';
import { AuthService } from '../../../shared/services/auth.service';

@Component({
  selector: 'app-store-authenticate',
  templateUrl: './store-authenticate.component.html',
  styleUrls: ['./store-authenticate.component.scss']
})
export class StoreAuthenticateComponent implements OnInit {


  constructor(private router: Router,private sharedService: SharedService,public common:Common,private authService: AuthService

  ) { }

  ngOnInit() {
    let v = this.authService.getRequestedParamter(location.href, 'v');
    let clientSubDomain = this.authService.getRequestedParamter(location.href, 'clientSubDomain') // for signup varification
    let message = '';
      switch (Number(v)) {
        case Enum.Store_Signup_Varification_Success:
          message = AppMessage.U0079;
          break;
        case Enum.Store_Signup_Varification_Expired:
          message = AppMessage.U0080;
          break;
        case Enum.Store_Signup_Varification_AlreadyVarified:
          message = AppMessage.U0081;
          break;
        case Enum.Store_Signup_Varification_NoUser:
          message = AppMessage.U0082;
          break;
  
      }
      if(this.common.isGoToStore){
        this.router.navigate(['/store-dashboard']);
      }
      else{
        this.sharedService.openDialog('s', message, () => {
          let url: any = location.host;
          if (url.includes('www.')) {
            url = url.replace('www.', '');
          }
          if (clientSubDomain != "null") {
            location.href = `http://${clientSubDomain}.${url}/store-login`;
          }
        });
      }
    
 

  }

}
