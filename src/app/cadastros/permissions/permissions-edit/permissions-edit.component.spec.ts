import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PermissionsEditComponent } from './permissions-edit.component';

describe('PermissionsEditComponent', () => {
  let component: PermissionsEditComponent;
  let fixture: ComponentFixture<PermissionsEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PermissionsEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PermissionsEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
