import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoChamadoAddComponent } from './tipo-chamado-add.component';

describe('TipoChamadoAddComponent', () => {
  let component: TipoChamadoAddComponent;
  let fixture: ComponentFixture<TipoChamadoAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TipoChamadoAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TipoChamadoAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
