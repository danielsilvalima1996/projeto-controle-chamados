import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubtipoChamadoAddComponent } from './subtipo-chamado-add.component';

describe('SubtipoChamadoAddComponent', () => {
  let component: SubtipoChamadoAddComponent;
  let fixture: ComponentFixture<SubtipoChamadoAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubtipoChamadoAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubtipoChamadoAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
