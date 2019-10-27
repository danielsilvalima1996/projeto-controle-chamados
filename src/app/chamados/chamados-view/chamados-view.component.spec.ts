import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChamadosViewComponent } from './chamados-view.component';

describe('ChamadosViewComponent', () => {
  let component: ChamadosViewComponent;
  let fixture: ComponentFixture<ChamadosViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChamadosViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChamadosViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
