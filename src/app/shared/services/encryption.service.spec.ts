import { TestBed } from '@angular/core/testing';

import { EncryptionService } from './encryption.service';

describe('EncryptionService', () => {
  let service:EncryptionService;
  beforeEach(() => TestBed.configureTestingModule({
    providers:[EncryptionService]
  }));

  it('should be created', () => {
    service = TestBed.get(EncryptionService);
    expect(service).toBeTruthy();
  });

  it('should call the encryptData() method',()=>{
    service = TestBed.get(EncryptionService);
    let data="",key=1;;
    service.encryptData(data,key);
    expect(service.encryptData).toBeTruthy();
  });

  it('should call the decryptData() method',()=>{
    service = TestBed.get(EncryptionService);
    let data=[{}],key=1;
    service.decryptData(data,key);
    expect(service.decryptData).toBeTruthy();
  });
});
