import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChamadosEditComponent } from './chamados-edit.component';

describe('ChamadosEditComponent', () => {
  let component: ChamadosEditComponent;
  let fixture: ComponentFixture<ChamadosEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChamadosEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChamadosEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
