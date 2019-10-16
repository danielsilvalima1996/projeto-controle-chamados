import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubtipoChamadoListComponent } from './subtipo-chamado-list.component';

describe('SubtipoChamadoListComponent', () => {
  let component: SubtipoChamadoListComponent;
  let fixture: ComponentFixture<SubtipoChamadoListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubtipoChamadoListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubtipoChamadoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
