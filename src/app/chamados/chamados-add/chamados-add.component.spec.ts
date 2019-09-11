import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChamadosAddComponent } from './chamados-add.component';

describe('ChamadosAddComponent', () => {
  let component: ChamadosAddComponent;
  let fixture: ComponentFixture<ChamadosAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChamadosAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChamadosAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
