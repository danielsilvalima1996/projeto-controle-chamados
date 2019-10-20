import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PermissionsAddComponent } from './permissions-add.component';

describe('PermissionsAddComponent', () => {
  let component: PermissionsAddComponent;
  let fixture: ComponentFixture<PermissionsAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PermissionsAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PermissionsAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
