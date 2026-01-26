import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BowGrid } from './bow-grid';

describe('BowGrid', () => {
  let component: BowGrid;
  let fixture: ComponentFixture<BowGrid>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BowGrid]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BowGrid);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
