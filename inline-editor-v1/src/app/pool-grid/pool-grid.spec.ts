import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PoolGrid } from './pool-grid';

describe('PoolGrid', () => {
  let component: PoolGrid;
  let fixture: ComponentFixture<PoolGrid>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PoolGrid]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PoolGrid);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
