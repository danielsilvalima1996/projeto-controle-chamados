import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubtipoChamadoEditComponent } from './subtipo-chamado-edit.component';

describe('SubtipoChamadoEditComponent', () => {
  let component: SubtipoChamadoEditComponent;
  let fixture: ComponentFixture<SubtipoChamadoEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubtipoChamadoEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubtipoChamadoEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
