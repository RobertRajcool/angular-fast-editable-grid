import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FastGrid } from './fast-grid';

describe('FastGrid', () => {
  let component: FastGrid;
  let fixture: ComponentFixture<FastGrid>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FastGrid]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FastGrid);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
