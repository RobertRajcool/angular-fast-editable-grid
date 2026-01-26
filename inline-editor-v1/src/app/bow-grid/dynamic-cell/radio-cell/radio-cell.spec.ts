import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RadioCell } from './radio-cell';

describe('RadioCell', () => {
  let component: RadioCell;
  let fixture: ComponentFixture<RadioCell>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RadioCell]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RadioCell);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
