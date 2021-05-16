import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComplexQueriesComponent } from './complex-queries.component';

describe('ComplexQueriesComponent', () => {
  let component: ComplexQueriesComponent;
  let fixture: ComponentFixture<ComplexQueriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComplexQueriesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ComplexQueriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
