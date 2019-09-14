import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnalistaAddComponent } from './analista-add.component';

describe('AnalistaAddComponent', () => {
  let component: AnalistaAddComponent;
  let fixture: ComponentFixture<AnalistaAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnalistaAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnalistaAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
