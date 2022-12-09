import { TestBed } from '@angular/core/testing';

import { PlaceCrudService } from './place-crud.service';

describe('PlaceCrudService', () => {
  let service: PlaceCrudService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PlaceCrudService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
