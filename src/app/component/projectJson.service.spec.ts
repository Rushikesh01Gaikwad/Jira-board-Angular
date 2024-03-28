import { TestBed } from '@angular/core/testing';

import { ProjectjsonService } from './projectjson.service';

describe('ProjectjsonService', () => {
  let service: ProjectjsonService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProjectjsonService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
