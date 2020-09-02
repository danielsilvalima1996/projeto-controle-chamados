import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegrasListComponent } from './regras-list.component';

describe('RegrasListComponent', () => {
  let component: RegrasListComponent;
  let fixture: ComponentFixture<RegrasListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegrasListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegrasListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
