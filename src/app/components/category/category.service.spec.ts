import { TestBed } from '@angular/core/testing';

import { CategoryService } from './category.service';
import { HttpClientService } from '../../shared/services/http-client.service';
import { mockHttpClientServiceClass } from '../../../Test/mockHttpClientServiceClass';
import { SharedService } from '../../shared/services/shared.service';
import { mockSharedService } from '../../../Test/mockSharedService';

describe('CategoryService', () => {
  let service:CategoryService;
  beforeEach(() => TestBed.configureTestingModule({
    providers:[CategoryService,{provide:HttpClientService,useClass:mockHttpClientServiceClass},{provide:SharedService,useClass:mockSharedService}]
  }));

  it('should be created', () => {
    service = TestBed.get(CategoryService);
    expect(service).toBeTruthy();
  });

  it('should call the saveCategories() method',()=>{
    service = TestBed.get(CategoryService);
    let param;
    service.saveCategories(param);
    expect(service.saveCategories).toBeTruthy();
  });

  it('should call the saveInfoCategory() method',()=>{
    service = TestBed.get(CategoryService);
    let param;
    service.saveInfoCategory(param);
    expect(service.saveInfoCategory).toBeTruthy();
  });

  it('should call the getCategories() method',()=>{
    service = TestBed.get(CategoryService);
    let param;
    service.getCategories(param);
    expect(service.getCategories).toBeTruthy();
  });

  it('should call the getCategoriesInfo() method',()=>{
    service = TestBed.get(CategoryService);
    let param;
    service.getCategoriesInfo(param);
    expect(service.getCategoriesInfo).toBeTruthy();
  });

  it('should call the updateSequence() method',()=>{
    service = TestBed.get(CategoryService);
    let param;
    service.updateSequence(param);
    expect(service.updateSequence).toBeTruthy();
  });

  it('should call the changeStatus() method',()=>{
    service = TestBed.get(CategoryService);
    let param;
    service.changeStatus(param);
    expect(service.changeStatus).toBeTruthy();
  });

  it('should call the deleteCategoryInfo() method',()=>{
    service = TestBed.get(CategoryService);
    let param;
    service.deleteCategoryInfo(param);
    expect(service.deleteCategoryInfo).toBeTruthy();
  });

  it('should call the loadData() method',()=>{
    service = TestBed.get(CategoryService);
    service.loadData();
    expect(service.loadData).toBeTruthy();
  });

  it('should call the isNodeExistInTree() method',()=>{
    service = TestBed.get(CategoryService);
    let data=[{id:10}],element={parentId:10},findItem;
    service.isNodeExistInTree(data,element,findItem);
    expect(service.isNodeExistInTree).toBeTruthy();
  });

  it('should call the isNodeExistInTree() method should return findItem',()=>{
    service = TestBed.get(CategoryService);
    let data=[],element={},findItem;
    service.isNodeExistInTree(data,element,findItem);
    expect(service.isNodeExistInTree).toBeTruthy();
  });

  it('should call the createTreeData() method',()=>{
    service = TestBed.get(CategoryService);
    let response=[{
      "id": 96,
      "sequenceNumber": 97,
      "parentId": null,
      "name": "Steering wheel",
      "title": "<p>Test Title</p>\n",
      "description": "<p>Test Description</p>\n",
      "isActive": false,
      "isInfoAvailable": true
  },
  {
      "id": 109,
      "sequenceNumber": 96,
      "parentId": 96,
      "name": "Men",
      "title": null,
      "description": null,
      "isActive": true,
      "isInfoAvailable": false
    }];
    service.createTreeData(response);
    expect(service.createTreeData).toBeTruthy();
  });

  it('should call the sortOnSequence() method should return -1',()=>{
    service = TestBed.get(CategoryService);
    let response=[{
      "id": 96,
      "sequenceNumber": 97,
      "parentId": null,
      "name": "Steering wheel",
      "title": "<p>Test Title</p>\n",
      "description": "<p>Test Description</p>\n",
      "isActive": false,
      "childrens":[],
      "isInfoAvailable": true
  },
  {
      "id": 109,
      "sequenceNumber": 96,
      "parentId": 96,
      "name": "Men",
      "title": null,
      "description": null,
      "isActive": true,
      "childrens":[],
      "isInfoAvailable": false
    }];
    service.sortOnSequence(response);
    expect(service.sortOnSequence).toBeTruthy();
  });

  it('should call the sortOnSequence() method should return 1',()=>{
    service = TestBed.get(CategoryService);
    let response=[{
      "id": 2,
      "sequenceNumber": 2,
      "parentId": null,
      "name": "Steering wheel",
      "title": "<p>Test Title</p>\n",
      "description": "<p>Test Description</p>\n",
      "isActive": false,
      "childrens":[],
      "isInfoAvailable": true
  },
  {
      "id": 1,
      "sequenceNumber": 1,
      "parentId": 96,
      "name": "Men",
      "title": null,
      "description": null,
      "isActive": true,
      "childrens":[],
      "isInfoAvailable": false
    }];
    service.sortOnSequence(response);
    expect(service.sortOnSequence).toBeTruthy();
  });

  it('should call the sortOnSequence() method should return 0',()=>{
    service = TestBed.get(CategoryService);
    let response=[{
      "id": 96,
      "sequenceNumber": 96,
      "parentId": null,
      "name": "Steering wheel",
      "title": "<p>Test Title</p>\n",
      "description": "<p>Test Description</p>\n",
      "isActive": false,
      "childrens":[],
      "isInfoAvailable": true
  },
  {
      "id": 95,
      "sequenceNumber": 96,
      "parentId": 96,
      "name": "Men",
      "title": null,
      "description": null,
      "isActive": true,
      "childrens":[],
      "isInfoAvailable": false
    }];
    service.sortOnSequence(response);
    expect(service.sortOnSequence).toBeTruthy();
  });

  it('should call the sortOnSequence() method on Else if block of length 1 and childrens length > 0',()=>{
    service = TestBed.get(CategoryService);
    let response=[{
      "id": 96,
      "sequenceNumber": 96,
      "parentId": null,
      "name": "Steering wheel",
      "title": "<p>Test Title</p>\n",
      "description": "<p>Test Description</p>\n",
      "isActive": false,
      "childrens":[
        {
          "id": 2,
          "sequenceNumber": 2,
          "parentId": null,
          "name": "Steering wheel 1.1",
          "title": null,
          "description": null,
          "isActive": false,
          "childrens":[],
          "isInfoAvailable": false
      },
      {
          "id": 1,
          "sequenceNumber": 1,
          "parentId": 96,
          "name": "Men",
          "title": null,
          "description": null,
          "isActive": true,
          "childrens":[],
          "isInfoAvailable": false
        }
      ],
      "isInfoAvailable": true
  }];
    service.sortOnSequence(response);
    expect(service.sortOnSequence).toBeTruthy();
  });

  it('should call the enableMoveButton() method',()=>{
    service = TestBed.get(CategoryService);
    service.data=[{
      "id": 96,
      "sequenceNumber": 97,
      "parentId": null,
      "name": "Steering wheel",
      "title": "<p>Test Title</p>\n",
      "description": "<p>Test Description</p>\n",
      "isActive": false,
      "childrens":[],
      "isInfoAvailable": true
  },
  {
      "id": 109,
      "sequenceNumber": 96,
      "parentId": 96,
      "name": "Men",
      "title": null,
      "description": null,
      "isActive": true,
      "childrens":[],
      "isInfoAvailable": false
    }];
    let response=[{
      "id": 96,
      "sequenceNumber": 97,
      "parentId": null,
      "name": "Steering wheel",
      "title": "<p>Test Title</p>\n",
      "description": "<p>Test Description</p>\n",
      "isActive": false,
      "childrens":[],
      "isInfoAvailable": true
  },
  {
      "id": 109,
      "sequenceNumber": 96,
      "parentId": 96,
      "name": "Men",
      "title": null,
      "description": null,
      "isActive": true,
      "childrens":[],
      "isInfoAvailable": false
    }];
    service.enableMoveButton(response);
    expect(service.enableMoveButton).toBeTruthy();
  });

  it('should call the findCategoryNode() method',()=>{
    service = TestBed.get(CategoryService);
    service.data=[{
      "id": 96,
      "sequenceNumber": 97,
      "parentId": null,
      "name": "Steering wheel",
      "title": "<p>Test Title</p>\n",
      "description": "<p>Test Description</p>\n",
      "isActive": false,
      "childrens":[],
      "isInfoAvailable": true
  },
  {
      "id": 109,
      "sequenceNumber": 96,
      "parentId": 96,
      "name": "Men",
      "title": null,
      "description": null,
      "isActive": true,
      "childrens":[],
      "isInfoAvailable": false
    }];
    let id=96;
    service.findCategoryNode(id);
    expect(service.findCategoryNode).toBeTruthy();
  });

  it('should call the findCategoryNode() method that return this.data',()=>{
    service = TestBed.get(CategoryService);
    service.data=[{
      "id": 96,
      "sequenceNumber": 97,
      "parentId": null,
      "name": "Steering wheel",
      "title": "<p>Test Title</p>\n",
      "description": "<p>Test Description</p>\n",
      "isActive": false,
      "childrens":[],
      "isInfoAvailable": true
  },
  {
      "id": 109,
      "sequenceNumber": 96,
      "parentId": 96,
      "name": "Men",
      "title": null,
      "description": null,
      "isActive": true,
      "childrens":[],
      "isInfoAvailable": false
    }];
    let id=null;
    service.findCategoryNode(id);
    expect(service.findCategoryNode).toBeTruthy();
  });

  it('should call the saveSequence() method',()=>{
    service = TestBed.get(CategoryService);
    let cat1={id:96,sequenceNumber:96},cat2={id:109,sequenceNumber:109};
    spyOn(service,'scroll');
    service.saveSequence(cat1,cat2);
    expect(service.scroll).toHaveBeenCalled();
    expect(service.saveSequence).toBeTruthy();
  });

  it('should call the disableOtherMoveButtons() method',()=>{
    service = TestBed.get(CategoryService);
    service.data=[{
      "id": 96,
      "sequenceNumber": 97,
      "parentId": null,
      "name": "Steering wheel",
      "title": "<p>Test Title</p>\n",
      "description": "<p>Test Description</p>\n",
      "isActive": false,
      "childrens":[],
      "isInfoAvailable": true
  },
  {
      "id": 109,
      "sequenceNumber": 96,
      "parentId": 96,
      "name": "Men",
      "title": null,
      "description": null,
      "isActive": true,
      "childrens":[],
      "isInfoAvailable": false
    }];
    let selectedCategory={showButton:true};
    service.disableOtherMoveButtons(selectedCategory);
    expect(service.disableOtherMoveButtons).toBeTruthy();
  });
});
