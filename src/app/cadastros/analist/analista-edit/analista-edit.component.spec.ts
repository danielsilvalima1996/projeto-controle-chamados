import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnalistaEditComponent } from './analista-edit.component';

describe('AnalistaEditComponent', () => {
  let component: AnalistaEditComponent;
  let fixture: ComponentFixture<AnalistaEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnalistaEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnalistaEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
