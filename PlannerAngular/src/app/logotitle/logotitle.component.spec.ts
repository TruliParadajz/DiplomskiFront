import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LogotitleComponent } from './logotitle.component';

describe('LogotitleComponent', () => {
  let component: LogotitleComponent;
  let fixture: ComponentFixture<LogotitleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LogotitleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LogotitleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
