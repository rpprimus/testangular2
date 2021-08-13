import { TestBed } from '@angular/core/testing';

import { AppLoadService } from './app-load.service';
import { HttpClient, HttpHandler, HttpClientModule } from '@angular/common/http';
import { Util } from './util';
import { mockUtil } from '../../../Test/mockUtil';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('AppLoadService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers:[{provide:Util,useClass:mockUtil},AppLoadService],
    imports:[HttpClientTestingModule]
  }));

  it('should be created', () => {
    const service: AppLoadService = TestBed.get(AppLoadService);
    expect(service).toBeTruthy();
  });

  it('should be created', () => {
    const service: AppLoadService = TestBed.get(AppLoadService);
    service.getSettings();
    expect(service.getSettings).toBeTruthy();
  });
});
