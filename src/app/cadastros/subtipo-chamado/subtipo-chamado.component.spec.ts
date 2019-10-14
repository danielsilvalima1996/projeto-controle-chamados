import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubtipoChamadoComponent } from './subtipo-chamado.component';

describe('SubtipoChamadoComponent', () => {
  let component: SubtipoChamadoComponent;
  let fixture: ComponentFixture<SubtipoChamadoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubtipoChamadoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubtipoChamadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
