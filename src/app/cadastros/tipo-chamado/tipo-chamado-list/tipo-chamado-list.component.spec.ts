import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoChamadoListComponent } from './tipo-chamado-list.component';

describe('TipoChamadoListComponent', () => {
  let component: TipoChamadoListComponent;
  let fixture: ComponentFixture<TipoChamadoListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TipoChamadoListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TipoChamadoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
