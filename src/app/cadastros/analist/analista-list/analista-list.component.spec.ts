import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnalistaListComponent } from './analista-list.component';

describe('AnalistaListComponent', () => {
  let component: AnalistaListComponent;
  let fixture: ComponentFixture<AnalistaListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnalistaListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnalistaListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
