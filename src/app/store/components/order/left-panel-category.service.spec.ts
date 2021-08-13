import { TestBed } from '@angular/core/testing';

import { LeftPanelCategoryService } from './left-panel-category.service';
import { StoreService } from '../../service/store.service';
import { mockStoreService } from '../../../../Test/mockStoreService';
import { Common } from '../../utility/common';
import { mockCommon } from '../../../../Test/mockCommon';
import { Util } from '../../../shared/services/util';

describe('LeftPanelCategoryService', () => {
  let service:LeftPanelCategoryService;
  beforeEach(() => TestBed.configureTestingModule({
    providers:[Util,LeftPanelCategoryService,
    {provide:StoreService,useClass:mockStoreService},
    {provide:Common,useClass:mockCommon},]
    
  }));

  it('should be created', () => {
    service = TestBed.get(LeftPanelCategoryService);
    expect(service).toBeTruthy();
  });

  it('should call the getCategories() method',()=>{
    service = TestBed.get(LeftPanelCategoryService);
    service.getCategories();
    expect(service.getCategories).toBeTruthy();
  });
});
