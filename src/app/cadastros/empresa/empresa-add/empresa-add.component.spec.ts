import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpresaAddComponent } from './empresa-add.component';

describe('EmpresaAddComponent', () => {
  let component: EmpresaAddComponent;
  let fixture: ComponentFixture<EmpresaAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmpresaAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmpresaAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
