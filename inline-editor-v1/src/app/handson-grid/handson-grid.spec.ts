import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HandsonGrid } from './handson-grid';

describe('HandsonGrid', () => {
  let component: HandsonGrid;
  let fixture: ComponentFixture<HandsonGrid>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HandsonGrid]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HandsonGrid);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
