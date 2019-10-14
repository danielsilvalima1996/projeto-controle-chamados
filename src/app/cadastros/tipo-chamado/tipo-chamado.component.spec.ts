import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoChamadoComponent } from './tipo-chamado.component';

describe('TipoChamadoComponent', () => {
  let component: TipoChamadoComponent;
  let fixture: ComponentFixture<TipoChamadoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TipoChamadoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TipoChamadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
