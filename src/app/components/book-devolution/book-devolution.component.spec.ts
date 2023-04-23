import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookDevolutionComponent } from './book-devolution.component';

describe('BookDevolutionComponent', () => {
  let component: BookDevolutionComponent;
  let fixture: ComponentFixture<BookDevolutionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookDevolutionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BookDevolutionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
