import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GridVirtualScrollColumnRow } from './grid-virtual-scroll-column-row';

describe('GridVirtualScrollColumnRow', () => {
  let component: GridVirtualScrollColumnRow;
  let fixture: ComponentFixture<GridVirtualScrollColumnRow>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GridVirtualScrollColumnRow]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GridVirtualScrollColumnRow);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
