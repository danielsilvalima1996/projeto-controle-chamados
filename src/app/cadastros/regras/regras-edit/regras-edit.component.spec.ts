import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegrasEditComponent } from './regras-edit.component';

describe('RegrasEditComponent', () => {
  let component: RegrasEditComponent;
  let fixture: ComponentFixture<RegrasEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegrasEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegrasEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
