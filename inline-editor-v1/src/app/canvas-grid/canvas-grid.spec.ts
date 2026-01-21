import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CanvasGrid } from './canvas-grid';

describe('CanvasGrid', () => {
  let component: CanvasGrid;
  let fixture: ComponentFixture<CanvasGrid>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CanvasGrid]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CanvasGrid);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
