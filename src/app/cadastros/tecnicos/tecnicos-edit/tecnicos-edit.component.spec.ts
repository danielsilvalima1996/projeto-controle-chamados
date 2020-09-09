import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TecnicosEditComponent } from './tecnicos-edit.component';

describe('TecnicosEditComponent', () => {
  let component: TecnicosEditComponent;
  let fixture: ComponentFixture<TecnicosEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TecnicosEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TecnicosEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
