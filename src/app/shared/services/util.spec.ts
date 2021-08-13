import { Util } from "./util";
import { FormGroup, FormControl } from "@angular/forms";

describe('Util',()=>{
    it('create an instance', () => {
        const util = new Util();
        expect(util).toBeTruthy();
      });

    it('should call baseURL() method', () => {
        const util = new Util();
        expect(util.baseURL).toBeTruthy();
      });

    it('should call notifyChild() method', () => {
        const util = new Util();
        let data={};
        util.notifyChild(data);
        expect(util.notifyChild).toBeTruthy();
      });

    it('should call attachParams() method', () => {
        const util = new Util();
        let url="www.abc.in/123",urlParams={pathVariable:"1"};
        util.attachParams(url,urlParams);
        expect(util.attachParams).toBeTruthy();
      });

    it('should call mergeObject() method', () => {
        const util = new Util();
        util.mergeObject();
        expect(util.mergeObject).toBeTruthy();
      });

    it('should call markFormGroupTouched() method', () => {
        const util = new Util();
        let profileForm = new FormGroup({
            firstName: new FormControl(''),
            lastName: new FormControl(''),
          });
        util.markFormGroupTouched(profileForm);
        expect(util.markFormGroupTouched).toBeTruthy();
      });

    it('should call getRequestedParam() method', () => {
        const util = new Util();
        let url="http://www.abc.in/",paramName:"";
        util.getRequestedParam(url,paramName);
        expect(util.getRequestedParam).toBeTruthy();
      });

    it('should call downloadFile() method', () => {
        const util = new Util();
        let response={headers:{get(param:any){return "=abc.xls"}},body:"vjygvjgvifiyg"};
        spyOn(window.URL,'createObjectURL')
        util.downloadFile(response);
        expect(util.downloadFile).toBeTruthy();
      });

    it('should call createFileType() method when fileType=pdf', () => {
        const util = new Util();
        let e="pdf"
        util.createFileType(e);
        expect(util.createFileType).toBeTruthy();
      });

    it('should call createFileType() method when fileType=jpg', () => {
        const util = new Util();
        let e="jpg"
        util.createFileType(e);
        expect(util.createFileType).toBeTruthy();
      });

    it('should call createFileType() method when fileType=txt', () => {
        const util = new Util();
        let e="txt"
        util.createFileType(e);
        expect(util.createFileType).toBeTruthy();
      });

    it('should call createFileType() method when fileType=ppt', () => {
        const util = new Util();
        let e="ppt"
        util.createFileType(e);
        expect(util.createFileType).toBeTruthy();
      });

    it('should call createFileType() method when fileType=doc', () => {
        const util = new Util();
        let e="doc"
        util.createFileType(e);
        expect(util.createFileType).toBeTruthy();
      });

    it('should call createFileType() method when fileType=docx', () => {
        const util = new Util();
        let e="docx"
        util.createFileType(e);
        expect(util.createFileType).toBeTruthy();
      });

    it('should call createFileType() method when fileType=xlsx', () => {
        const util = new Util();
        let e="xlsx"
        util.createFileType(e);
        expect(util.createFileType).toBeTruthy();
      });

    it('should call checkExtension() method if block', () => {
        const util = new Util();
        let fileName="abc.xls",type="xls"
        util.checkExtension(fileName,type);
        expect(util.checkExtension).toBeTruthy();
      });

    it('should call checkExtension() method else block', () => {
        const util = new Util();
        let fileName="abc.xyz",type="xyz"
        util.checkExtension(fileName,type);
        expect(util.checkExtension).toBeTruthy();
      });

    it('should call checkSizeValidation() method', () => {
        const util = new Util();
        let event={size:4567644}
        util.checkSizeValidation(event);
        expect(util.checkSizeValidation).toBeTruthy();
      });

    it('should call trimParamValues() method', () => {
        const util = new Util();
        let params={a:1,c:1}
        util.trimParamValues(params);
        expect(util.trimParamValues).toBeTruthy();
      });

    it('should call formatDate() method', () => {
        const util = new Util();
        let value= new Date();
        util.formatDate(value);
        expect(util.formatDate).toBeTruthy();
      });

    it('should call displayFormattedDate() method', () => {
        const util = new Util();
        let value= "10-10-2020";
        util.displayFormattedDate(value);
        expect(util.displayFormattedDate).toBeTruthy();
      });

    it('should call convertUTCDateToLocalDate() method if block', () => {
        const util = new Util();
        let value= "10-10-2020 05:30:00";
        util.convertUTCDateToLocalDate(value);
        expect(util.convertUTCDateToLocalDate).toBeTruthy();
      });

    it('should call convertUTCDateToLocalDate() method else block', () => {
        const util = new Util();
        let value="10/9/2020";
        util.convertUTCDateToLocalDate(value);
        expect(util.convertUTCDateToLocalDate).toBeTruthy();
      });

    it('should call validateCkEditor() method', () => {
        const util = new Util();
        let required= "Test",fun = function fn(params:any) {};
        util.validateCkEditor(required,fun);
        expect(util.validateCkEditor).toBeTruthy();
      });

    it('should call validateCkEditorOnDemand() method', () => {
        const util = new Util();
        let required= "Test",charLength=10,fun = function fn(params:any) {};
        util.validateCkEditorOnDemand(required,charLength,fun);
        expect(util.validateCkEditorOnDemand).toBeTruthy();
      });

    it('should call checkImageType() method when width=height', () => {
        const util = new Util();
        let width=10,height=10;;
        util.checkImageType(width,height);
        expect(util.checkImageType).toBeTruthy();
      });

    it('should call checkImageType() method when width>height', () => {
        const util = new Util();
        let width=15,height=10;;
        util.checkImageType(width,height);
        expect(util.checkImageType).toBeTruthy();
      });

    it('should call checkImageType() method when width<height', () => {
        const util = new Util();
        let width=15,height=20;;
        util.checkImageType(width,height);
        expect(util.checkImageType).toBeTruthy();
      });

    it('should call checkXLSExtension() method if block', () => {
        const util = new Util();
        let fileName="abc.xlsx";
        util.checkXLSExtension(fileName);
        expect(util.checkXLSExtension).toBeTruthy();
      });

    it('should call checkXLSExtension() method else block', () => {
        const util = new Util();
        let fileName="abc.xls";
        util.checkXLSExtension(fileName);
        expect(util.checkXLSExtension).toBeTruthy();
      });
});