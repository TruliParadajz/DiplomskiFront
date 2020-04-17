import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventtasksettingsComponent } from './eventtasksettings.component';

describe('EventtasksettingsComponent', () => {
  let component: EventtasksettingsComponent;
  let fixture: ComponentFixture<EventtasksettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventtasksettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventtasksettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
