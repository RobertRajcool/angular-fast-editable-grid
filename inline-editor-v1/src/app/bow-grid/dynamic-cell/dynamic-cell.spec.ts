import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicCell } from './dynamic-cell';

describe('DynamicCell', () => {
  let component: DynamicCell;
  let fixture: ComponentFixture<DynamicCell>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DynamicCell]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DynamicCell);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
