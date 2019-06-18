import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewtestcaseComponent } from './viewtestcase.component';

describe('ViewtestcaseComponent', () => {
  let component: ViewtestcaseComponent;
  let fixture: ComponentFixture<ViewtestcaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewtestcaseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewtestcaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
