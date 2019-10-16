import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoChamadoEditComponent } from './tipo-chamado-edit.component';

describe('TipoChamadoEditComponent', () => {
  let component: TipoChamadoEditComponent;
  let fixture: ComponentFixture<TipoChamadoEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TipoChamadoEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TipoChamadoEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
