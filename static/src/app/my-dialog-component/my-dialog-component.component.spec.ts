import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyDialogComponentComponent } from './my-dialog-component.component';

describe('MyDialogComponentComponent', () => {
  let component: MyDialogComponentComponent;
  let fixture: ComponentFixture<MyDialogComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyDialogComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyDialogComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
