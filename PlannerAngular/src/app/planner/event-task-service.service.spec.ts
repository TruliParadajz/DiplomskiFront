import { TestBed } from '@angular/core/testing';

import { EventTaskServiceService } from './event-task-service.service';

describe('EventTaskServiceService', () => {
  let service: EventTaskServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EventTaskServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
